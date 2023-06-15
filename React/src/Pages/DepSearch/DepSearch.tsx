import { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./DepSearch.css";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";

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
  const [searchDep, setDep] = useState("");
  const [searchStartVersion, setStartVersion] = useState("");
  const [searchEndVersion, setEndVersion] = useState("");

  const handleClick = () => {
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

  const copy_to_clipboard = () => {
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

          const longestName = Math.max(...dependencies.map((dep: Dependency) => dep.name.length));
          const longestVersion = Math.max(...dependencies.map((dep: Dependency) => dep.version.length));

          const packages = dependencies
            .map(
              (dep: Dependency) =>
                `${dep.name.padEnd(longestName + 4)}${dep.version.padEnd(longestVersion + 4)}${dep.purl}`
            )
            .join(',\n\t');

          return `name: ${name}\n\t${packages}\n`;
        })
        .join('\n\n');
  
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = formattedData;
        document.body.appendChild(tempTextArea);
  
        // Select the text and copy it to the clipboard
        tempTextArea.select();
        document.execCommand('copy');
  
        // Clean up the temporary textarea
        document.body.removeChild(tempTextArea);
      });
  };  

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <div className="textFields">
            <Tooltip title="Enter dependency name">
              <TextField
                label="Dependency Name"
                onChange={(e) => {
                  {
                    setDep(e.target.value);
                  }
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              />
            </Tooltip>
            <Tooltip title='Leave "Version Range End" empty for all versions greater than or equal to "Version Range Start"'>
              <TextField
                label="Version Range Start"
                onChange={(e) => {
                  {
                    setStartVersion(e.target.value);
                  }
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
              />
            </Tooltip>
            <Tooltip title='Leave "Version Range Start" empty for all versions smaller than or equal to "Version Range End"'>
              <TextField
                label="Version Range End"
                onChange={(e) => {
                  {
                    setEndVersion(e.target.value);
                  }
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
              />
            </Tooltip>
            <button
              className="SrcBtn"
              onClick={() => {
                {
                  handleClick();
                }
              }}
            >
              Search Images
            </button>
            <button
              className="CopyBtn"
              onClick={() => {
                {
                  copy_to_clipboard();
                }
              }}
            >
              Copy to clipboard
            </button>
          </div>
          <div className="Images">
            <h1 className="topText">
              Images containing dependency "{searchDep}":
            </h1>
            {file.map((image) => {
              if (image.dependencies.length === 0) {
                return <></>;
              }
              return (
                <div className="img">
                  <p>
                    <b>{image.name}:</b>
                  </p>
                  {image.dependencies.map((dep) => {
                    return (
                      <div className="DepInfo">
                        {dep.name}
                        <br />
                        {dep.version}
                        <br />
                        {dep.purl}
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
