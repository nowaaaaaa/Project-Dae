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
  const [searchName, setSearchName] = useState("");
  const [searchDep, setDep] = useState("");
  const [searchStartVersion, setStartVersion] = useState("");
  const [searchEndVersion, setEndVersion] = useState("");

  const handleClick = () => {
    if (searchStartVersion === "") {
      setStartVersion("any");
    }
    if (searchEndVersion === "") {
      setEndVersion("any");
    }
    if (searchDep === "") {
      setDep("any");
    }

    fetch(
      `http://localhost:5000/api/sbomTest/deps/dependencies/${searchDep}/${searchStartVersion}/${searchEndVersion}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFile(data);
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
                  setDep(e.target.value);

                  // fetch(
                  //   `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getRange?name=${searchName}&dep=${e.target.value}&versionStart=${searchStartVersion}&versionEnd=${searchEndVersion}`
                  // )
                  //   .then((response) => response.json())
                  //   .then((data) => {
                  //     setFile(data);
                  //   });
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
                  setStartVersion(e.target.value);

                  // fetch(
                  //   `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getRange?name=${searchName}&dep=${searchDep}&versionStart=${e.target.value}&versionEnd=${searchEndVersion}`
                  // )
                  //   .then((response) => response.json())
                  //   .then((data) => {
                  //     setFile(data);
                  //   });
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
                  setEndVersion(e.target.value);

                  // fetch(
                  //   `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getRange?name=${searchName}&dep=${searchDep}&versionStart=${searchStartVersion}&versionEnd=${e.target.value}`
                  // )
                  //   .then((response) => response.json())
                  //   .then((data) => {
                  //     setFile(data);
                  //   });
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
