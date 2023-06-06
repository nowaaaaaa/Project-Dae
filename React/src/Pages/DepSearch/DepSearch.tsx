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
  const [searchDep, setDep] = useState("");
  const [searchStartVersion, setStartVersion] = useState("");
  const [searchEndVersion, setEndVersion] = useState("");
  const [DefiniteDep, setDefiniteDep] = useState("");

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <div className="textFields">
            <TextField
              label="Search Dependeny"
              onChange={(e) => setDep(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <Tooltip title="Only fill the Start Version to search for versions lower than the input">
              <TextField
                label="Set Start Version"
                onChange={(e) => setStartVersion(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
              />
            </Tooltip>
            <TextField
              label="Set End Version"
              onChange={(e) => setEndVersion(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            />
            <button
              className="SrcBtn"
              onClick={() => {
                {
                  fetch(
                    `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getRange&dep=${searchDep}&versionStart=${searchStartVersion}&versionEnd=${searchEndVersion}`
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setFile(data);
                    });
                  setDefiniteDep(searchDep);
                }
              }}
            >
              Search Images
            </button>
          </div>
          <div className="Images">
            <h1 className="topText">Images with dependency "{searchDep}":</h1>
            {file.map((image) => {
              return (
                <div className="img">
                  <p>{image.name}:</p>
                  {image.dependencies.map((dep) => {
                    if (dep.name !== DefiniteDep) return <></>;
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
