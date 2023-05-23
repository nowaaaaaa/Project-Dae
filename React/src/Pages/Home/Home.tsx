import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import TextField from "@mui/material/TextField";
import { AllImages } from "../../Components/AllImages/AllImages";

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

export function Home() {
  const [file, setFile] = useState<Image[]>([]);
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);
  const [searchImage, setSearchImage] = useState("");
  const [searchDep, setSearchDep] = useState("");

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps"
    )
      .then((response) => response.json())
      .then((data) => {
        setFile(data);
      }),
      fetch(
        "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getBaseline"
      )
        .then((res) => res.json())
        .then((data) => {
          setBaseLine(data[0]["baseLine"]);
        });
  }, []);

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <div className="textFields">
            <TextField
              label="Search Images"
              onChange={(e) => setSearchImage(e.target.value)}
            />
            <TextField
              label="Search Dependencies"
              onChange={(e) => setSearchDep(e.target.value)}
            />
          </div>
          <AllImages file={file} search={searchImage} depSearch={searchDep} />
        </div>
      </div>
    </>
  );
}

export default Home;
