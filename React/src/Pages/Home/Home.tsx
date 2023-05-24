import { useEffect, useState } from "react";
import "./Home.css";
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

export function Home() {
  const [file, setFile] = useState<Image[]>([]);
  const [searchImage, setSearchImage] = useState("");
  const [searchDep, setSearchDep] = useState("");

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps"
    )
      .then((response) => response.json())
      .then((data) => {
        setFile(data);
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
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <TextField
              label="Search Dependencies"
              onChange={(e) => setSearchDep(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            />
          </div>
          <div className="Spacer"></div>
          <AllImages file={file} search={searchImage} depSearch={searchDep} />
        </div>
      </div>
    </>
  );
}

export default Home;
