import { useEffect, useState } from "react";
import "./App.css";
import baseline from "../../assets/baseline.json";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Tooltip from "@mui/material/Tooltip";
import Switch from '@mui/material/Switch';

interface Dependency {
  name: string;
  version: string;
}

interface Image {
  name: string;
  dependencies: Dependency[];
}

const baseLine = baseline as Dependency[];

const DisplayDep: React.FC<{ dep: Dependency }> = ({ dep }) => {
  return (
    <div className="dep">
      <p className="info">{dep.name}</p>
      <p className="info">{dep.version}</p>
    </div>
  );
};

const DisplayFile: React.FC<{ file: Dependency[], useBase:boolean }> = ({ file, useBase}) => {
  return (
    <div className="foundDeps">
      {file.map((dep) => {
        if (!useBase) {
          return <DisplayDep dep={dep} />;
        }
        //check if the dependency is in the baseline
        const found = baseLine.find((baseDep) => {
          return baseDep.name === dep.name;
        });
        if (found) {
          //if it is, check if the version is the same
          if (found.version === dep.version) {
            return <DisplayDep dep={dep} />;
          }
        }
      })}
    </div>
  );
};

const DisplayOne: React.FC<{ file: String }> = ({ file }) => {
  const [deps, setDeps] = useState<Dependency[]>([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/SBOMs/${file}/dependencies`)
      .then((response) => response.json())
      .then((data) => setDeps(data));
  }, []);
  return (
    <div>
      {deps.map((dep) => {
        return <DisplayDep dep={dep} />;
      })}
      ;
    </div>
  );
};

const DisplayAll: React.FC<{ files: String[] }> = ({ files }) => {
  return (
    <div>
      {files.map((file) => {
        return (
          <>
            <h1>{file}</h1>
            <DisplayOne file={file} />
          </>
        );
      })}
      ;
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
            <Tooltip title="Search Dependencies">
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
            </Tooltip>
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
            {/* {<input type="checkbox" name="checkiewhackie" id="useBase" onClick={() => setUseBase(!useBase)} />} */}
            <Switch defaultChecked={useBase} color="secondary" onChange={() => setUseBase(!useBase)}/>

          </div>
          <div className="accHolder">
          {file.map((image) => {
            return (
              <>
                <Accordion className="acc" sx={{ bgcolor: "#d3d3d3"}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div>
                      <h1 className="image-name">{image.name}</h1>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DisplayFile file={image.dependencies} useBase={useBase} />
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
