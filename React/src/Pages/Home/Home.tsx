import React, { useEffect, useState } from "react";
import "./App.css";
import baseline from "../../assets/baseline.json";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";

interface Dependency {
  name: string;
  version: string;
}

interface Image {
  name: string;
  dependencies: Dependency[];
}

const baseLine = baseline as Dependency[];

const AllImages: React.FC<{ file: Image[] }> = ({ file }) => {
  return (
    <div className="AllImages">
      {file.map((image) => {
        return <SingleImage image={image} />;
      })}
    </div>
  );
};

const SingleImage: React.FC<{ image: Image }> = ({ image }) => {
  const [search, setSearch] = useState<string>("");
  const [useBase, setBase] = useState<boolean>(true);
  return (
    <div className="SingleImage">
      <div className="HeaderHolder">
        <h1 className="ImageHeader">{image.name}</h1>
        <TextField
          autoComplete="d"
          label="Search Dependencies"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ height: "50px" }}
        />
        <Tooltip title="Filter Baseline">
          <Switch
            color="secondary"
            className="Switch"
            defaultChecked={useBase}
            onChange={() => setBase(!useBase)}
          />
        </Tooltip>
      </div>
      <div className="DepMap">
        {image.dependencies.map((dep) => {
          if (!useBase) {
            if (search == "" || dep.name.includes(search)) {
              return (
                <div className="DepHolder">
                  <p className="">{dep.name}</p>
                  <p className="version">{dep.version}</p>
                </div>
              );
            }
          } else {
            if (
              baseLine.some(
                (baseDep) =>
                  baseDep.name === dep.name && baseDep.version === dep.version
              ) &&
              (search === "" || dep.name.includes(search))
            ) {
              return (
                <div className="DepHolder">
                  <p className="">{dep.name}</p>
                  <p className="version">{dep.version}</p>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export function Home() {
  const [file, setFile] = useState<Image[]>([]);
  const [search, setSearch] = useState("");
  const [useBase, setUseBase] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFile(data);
      });
  }, []);

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <h1 className="image-name">Your Images:</h1>
          <div className="textFields">
            {/* <Tooltip title="Search Dependencies">
              <span
                onClick={() => {
                  fetch(
                    `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps?dep=${search}`
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      setFile(data);
                    });
                }}
              >
                <FindInPageIcon fontSize="large" className="icon" />
              </span>
            </Tooltip> */}
            <TextField
              label="Search Images"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Tooltip title="Search Images">
              <span
                onClick={() => {
                  fetch(
                    `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getDeps?name=${search}`
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      setFile(data);
                    });
                }}
              >
                <ImageSearchIcon fontSize="large" className="icon" />
              </span>
            </Tooltip>
          </div>
          <AllImages file={file} />
        </div>
      </div>
    </>
  );
}

export default Home;
