import { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./DepSearch.css";

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

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <input
            type="text"
            placeholder="Write"
            onChange={(e) => setDep(e.target.value)}
          />
          <button
            onClick={() => {
              fetch(
                `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps?dep=${searchDep}`
              )
                .then((response) => response.json())
                .then((data) => {
                  setFile(data);
                });
            }}
          >
            Click
          </button>
          <div>
            {file.map((image) => {
              return (
                <div>
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
