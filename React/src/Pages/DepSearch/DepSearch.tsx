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
  // const [searchName, setSearchName] = useState("");
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);
  const [searchDep, setDep] = useState("");
  const [searchStartVersion, setStartVersion] = useState("");
  const [searchEndVersion, setEndVersion] = useState("");
  const [currentFilter, setCurrentFilter] = useState<String>("");
  const [filterItems, setFilterItems] = useState<String[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sbomTest/filters/getNames")
      .then((res) => res.json())
      .then((data) => {
        setFilterItems(data);
      });
  }, []);

  const handle_single_dependency = () => {
    const searchDepText = searchDep || "any";
    const searchStartVersionText = searchStartVersion || "any";
    const searchEndVersionText = searchEndVersion || "any";

    fetch(
      `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFile(data);
      });
  };

  const handle_filters = () => {
    setFile([]);
    baseLine.forEach((item: BaselineItem) => {
      const { name, versions } = item;
      const { versions: versionList, ranges } = versions;

      versionList.forEach((version: string) => {
        const searchDepText = name;
        const searchStartVersionText = version || "any";
        const searchEndVersionText = version || "any";

        fetch(
          `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
        )
          .then((response) => response.json())
          .then((data) => {
            setFile((prevFile) => [...prevFile, ...data]);
          });
      });

      ranges.forEach((range: [string, string]) => {
        const [startVersion, endVersion] = range;
        const searchDepText = name;
        const searchStartVersionText = startVersion || "any";
        const searchEndVersionText = endVersion || "any";

        fetch(
          `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
        )
          .then((response) => response.json())
          .then((data) => {
            setFile((prevFile) => [...prevFile, ...data]);
          });
      });
    });

    // console.log(file);
  };

  const copy_to_clipboard = () => {
    const tempTextArea = document.createElement("textarea");
    if (currentFilter === "") {
      const searchDepText = searchDep || "any";
      const searchStartVersionText = searchStartVersion || "any";
      const searchEndVersionText = searchEndVersion || "any";

      fetch(
        `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
      )
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data
            .filter((item: DependencyItem) => item.dependencies.length > 0)
            .map((item: DependencyItem) => {
              const { name, dependencies } = item;

              const longestName = Math.max(
                ...dependencies.map((dep: Dependency) => dep.name.length)
              );
              const longestVersion = Math.max(
                ...dependencies.map((dep: Dependency) => dep.version.length)
              );

              const packages = dependencies
                .map(
                  (dep: Dependency) =>
                    `${dep.name.padEnd(longestName + 4)}${dep.version.padEnd(
                      longestVersion + 4
                    )}${dep.purl}`
                )
                .join(",\n\t");

              return `name: ${name}\n\t${packages}\n`;
            })
            .join("\n\n");

          tempTextArea.value += formattedData;
          document.body.appendChild(tempTextArea);

          // Select the text and copy it to the clipboard
          tempTextArea.select();
          document.execCommand("copy");

          // Clean up the temporary textarea
          document.body.removeChild(tempTextArea);
        });
    } else {
      baseLine.forEach((item: BaselineItem) => {
        const { name, versions } = item;
        const { versions: versionList, ranges } = versions;

        versionList.forEach((version: string) => {
          const searchDepText = name;
          const searchStartVersionText = version || "any";
          const searchEndVersionText = version || "any";

          fetch(
            `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
          )
            .then((response) => response.json())
            .then((data) => {
              const formattedData = data
                .filter((item: DependencyItem) => item.dependencies.length > 0)
                .map((item: DependencyItem) => {
                  const { name, dependencies } = item;
                  
                  const longestName = Math.max(
                    ...dependencies.map((dep: Dependency) => dep.name.length)
                  );
                  const longestVersion = Math.max(
                    ...dependencies.map((dep: Dependency) => dep.version.length)
                  );

                  const packages = dependencies
                    .map(
                      (dep: Dependency) =>
                        `${dep.name.padEnd(longestName + 4)}${dep.version.padEnd(
                          longestVersion + 4
                        )}${dep.purl}`
                    )
                    .join(",\n\t");

                  return `name: ${name}\n\t${packages}\n`;
                })
                .join("\n\n");

              tempTextArea.value += formattedData;
              document.body.appendChild(tempTextArea);

              tempTextArea.select();
              // document.execCommand("copy");

              // // Clean up the temporary textarea
              // document.body.removeChild(tempTextArea);
            });
        });

        ranges.forEach((range: [string, string]) => {
          const [startVersion, endVersion] = range;
          const searchDepText = name;
          const searchStartVersionText = startVersion || "any";
          const searchEndVersionText = endVersion || "any";

          fetch(
            `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDepText}/${searchStartVersionText}/${searchEndVersionText}`
          )
            .then((response) => response.json())
            .then((data) => {
              const formattedData = data
                .filter((item: DependencyItem) => item.dependencies.length > 0)
                .map((item: DependencyItem) => {
                  const { name, dependencies } = item;

                  const longestName = Math.max(
                    ...dependencies.map((dep: Dependency) => dep.name.length)
                  );
                  const longestVersion = Math.max(
                    ...dependencies.map((dep: Dependency) => dep.version.length)
                  );

                  const packages = dependencies
                    .map(
                      (dep: Dependency) =>
                        `${dep.name.padEnd(longestName + 4)}${dep.version.padEnd(
                          longestVersion + 4
                        )}${dep.purl}`
                    )
                    .join(",\n\t");

                  return `name: ${name}\n\t${packages}\n`;
                })
                .join("\n\n");

              tempTextArea.value += formattedData;
              document.body.appendChild(tempTextArea);

              tempTextArea.select();
            });
        });

      });
      document.execCommand("copy");

      // Clean up the temporary textarea
      document.body.removeChild(tempTextArea);
    }
  };

  const clearFilter = () => {
    setCurrentFilter("");
  };

  const handleFilterChange = (selectedOption: { value: string; label: string }) => {
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
    label: item
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
              value={currentFilter ? { value: currentFilter, label: currentFilter } : null}
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
                if (!currentFilter) {
                  handle_single_dependency();
                }
                else
                {
                  handle_filters();
                }
              }}
            >
              Search Images
            </button>
            <button
              className="SrcBtn"
              onClick={() => {
                {
                  copy_to_clipboard();
                }
              }}
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="Images">
            {/* <h1 className="topText">
              Images containing dependency "{searchDep}":
            </h1> */}
            {file.map((image) => {
              if (image.dependencies.length === 0) {
                return <></>;
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
