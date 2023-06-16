import { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./DepSearch.css";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";
import Select from "react-select";

interface Dependency {
  name: string;
  version: string;
  purl: string;
}

interface DependencyItem {
  dependencies: Dependency[];
  name: string;
}

interface Image {
  name: string;
  dependencies: Dependency[];
}

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: [string, string][];
}

export function DepSearch() {
  const [file, setFile] = useState<Image[]>([]);
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);
  const [searchDep, setDep] = useState("");
  const [searchStartVersion, setStartVersion] = useState("");
  const [searchEndVersion, setEndVersion] = useState("");
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [filterItems, setFilterItems] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sbomTest/filters/getNames")
      .then((res) => res.json())
      .then((data) => {
        setFilterItems(data);
      });
  }, []);

  const setFileWithDependencies = (
    searchDepText: string,
    searchStartVersionText: string,
    searchEndVersionText: string
  ) => {
    fetch(
      `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFile((prevFile) => [...prevFile, ...data]);
      });
  };

  const setFileWithBaseline = () => {
    fetch(`http://localhost:5000/api/sbomTest/useFilter/${currentFilter}`)
      .then((response) => response.json())
      .then((data) => {
        setFile((prevFile) => [...prevFile, ...data]);
      });
  };

  const copyToClipboard = () => {
    const formattedData = file
      .filter((item) => item.dependencies.length > 0)
      .map((item) => {
        const { name, dependencies } = item;

        const longestName = Math.max(
          ...dependencies.map((dep) => dep.name.length)
        );
        const longestVersion = Math.max(
          ...dependencies.map((dep) => dep.version.length)
        );

        const packages = dependencies
          .map(
            (dep) =>
              `${dep.name.padEnd(longestName + 4)}${dep.version.padEnd(
                longestVersion + 4
              )}${dep.purl}`
          )
          .join(",\n\t");

        return `name: ${name}\n\t${packages}\n`;
      })
      .join("\n");

    navigator.clipboard
      .writeText(formattedData)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy to clipboard:");
      });
  };

  const clearFilter = () => {
    setCurrentFilter("");
  };

  const handleFilterChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setCurrentFilter(selectedOption.value);
    fetch(
      `http://localhost:5000/api/sbomTest/filters/getFilter/${selectedOption.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBaseLine(data);
      });
  };

  const selectOptions = filterItems.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <div className="textFields">
            <button className="SrcBtn" onClick={clearFilter}>
              Clear Filter
            </button>
            <Select
              className="FilterSelect"
              options={selectOptions}
              value={
                currentFilter
                  ? { value: currentFilter, label: currentFilter }
                  : null
              }
              onChange={handleFilterChange}
              placeholder="Select a Filter"
            />
            <Tooltip title="Enter dependency name">
              <TextField
                label="Dependency Name"
                onChange={(e) => setDep(e.target.value)}
                sx={{
                  backgroundColor: currentFilter ? "#f0f0f0" : "white",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
                disabled={currentFilter !== ""}
              />
            </Tooltip>
            <Tooltip title='Leave "Version Range End" empty for all versions greater than or equal to "Version Range Start"'>
              <TextField
                label="Version Range Start"
                onChange={(e) => setStartVersion(e.target.value)}
                sx={{
                  backgroundColor: currentFilter ? "#f0f0f0" : "white",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
                disabled={currentFilter !== ""}
              />
            </Tooltip>
            <Tooltip title='Leave "Version Range Start" empty for all versions smaller than or equal to "Version Range End"'>
              <TextField
                label="Version Range End"
                onChange={(e) => setEndVersion(e.target.value)}
                sx={{
                  backgroundColor: currentFilter ? "#f0f0f0" : "white",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
                disabled={currentFilter !== ""}
              />
            </Tooltip>
            <button
              className="SrcBtn"
              onClick={() => {
                setFile([]);
                if (!currentFilter) {
                  setFileWithDependencies(
                    searchDep || "any",
                    searchStartVersion || "any",
                    searchEndVersion || "any"
                  );
                } else {
                  setFileWithBaseline();
                }
              }}
            >
              Search Images
            </button>
            <button className="CopyBtn" onClick={copyToClipboard}>
              Copy to Clipboard
            </button>
          </div>
          <div className="Images">
            {file.map((image) => {
              if (image.dependencies.length === 0) {
                return null;
              }
              return (
                <div className="img">
                  <p>
                    <b className="ImageName">{image.name}:</b>
                  </p>
                  {image.dependencies.map((dep) => {
                    return (
                      <div className="DepInfo">
                        <b>{dep.name}</b>
                        <span className="Version">{dep.version}</span>
                        <span className="Version">{dep.purl}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DepSearch;
