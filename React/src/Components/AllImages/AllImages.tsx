import React, { useState } from "react";
import "../../Pages/Home/App.css";
import baseline from "../../assets/baseline.json";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";

const baseLine = baseline as Dependency[];

interface Dependency {
  name: string;
  version: string;
}

interface Image {
  name: string;
  dependencies: Dependency[];
}

export const AllImages: React.FC<{
  file: Image[];
  search: string;
  depSearch: string;
}> = ({ file, search, depSearch }) => {
  return (
    <div className="AllImages">
      {file.map((image) => {
        if (search === "" || image.name.includes(search)) {
          return <SingleImage image={image} depSearch={depSearch} />;
        }
      })}
    </div>
  );
};

const DisplayDep: React.FC<{ dep: Dependency }> = ({ dep }) => {
  return (
    <div className="DepHolder">
      <p className="">{dep.name}</p>
      <p className="version">{dep.version}</p>
    </div>
  );
};

const SingleImage: React.FC<{
  image: Image;
  depSearch: string;
}> = ({ image, depSearch: allDepSearch }) => {
  const [imageDepSearch, setSearch] = useState<string>("");
  const [useBase, setBase] = useState<boolean>(true);
  return (
    <div className="SingleImage">
      <div className="HeaderHolder">
        <div className="HeaderItem">
          <h1 className="ImageHeader">{image.name}</h1>
        </div>
        <div className="HeaderItem">
          <TextField
            className="SearchDep"
            label="Search Dependencies"
            onChange={(e) => setSearch(e.target.value)}
            sx={{ height: "50px" }}
          />
        </div>
        <div className="HeaderItem">
          <Tooltip title="Filter Baseline" className="Switch">
            <Switch
              color="secondary"
              className="Switch"
              defaultChecked={useBase}
              onChange={() => setBase(!useBase)}
            />
          </Tooltip>
        </div>
      </div>
      <div className="DepMap">
        {image.dependencies.map((dep) => {
          if (!useBase) {
            if (imageDepSearch !== "" && dep.name.includes(imageDepSearch)) {
              return <DisplayDep dep={dep} />;
            } else if (imageDepSearch === "") {
              if (allDepSearch === "" || dep.name.includes(allDepSearch)) {
                return <DisplayDep dep={dep} />;
              }
            }
          } else {
            if (
              baseLine.some(
                (baseDep) =>
                  baseDep.name === dep.name && baseDep.version === dep.version
              )
            ) {
              if (imageDepSearch !== "" && dep.name.includes(imageDepSearch)) {
                return <DisplayDep dep={dep} />;
              } else if (imageDepSearch === "") {
                if (allDepSearch === "" || dep.name.includes(allDepSearch)) {
                  return <DisplayDep dep={dep} />;
                }
              }
            }
          }
        })}
      </div>
    </div>
  );
};
