import { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./DepSearch.css";
import TextField from "@mui/material/TextField";

interface Dependency {
  name: string;
  version: string;
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
  const [searchVersion, setVersion] = useState("");

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
            <TextField
              label="Set Version"
              onChange={(e) => setVersion(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            />
            <button
              className="SrcBtn"
              onClick={() => {
                fetch(
                  `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps?dep=${searchDep}&version=${searchVersion}`
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setFile(data);
                  });
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
                  <p>{image.name}</p>
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
