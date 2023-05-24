import React, { useState, useEffect } from "react";
import "../../Pages/Home/App.css";
import TextField from "@mui/material/TextField";
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

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: [string, string][];
}

export const AllImages: React.FC<{
  file: Image[];
  search: string;
  depSearch: string;
}> = ({ file, search, depSearch }) => {
  return (
    <div className="AllImages">
      {file.map((image) => {
        if (
          (search === "" || image.name.includes(search)) &&
          image.dependencies.some((dep) => dep.name.includes(depSearch))
        ) {
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
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getBaseline"
    )
      .then((res) => res.json())
      .then((data) => {
        setBaseLine(data[0]["baseLine"]);
      });
  }, []);

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
              //Check for search within the image
              return <DisplayDep dep={dep} />;
            } else if (imageDepSearch === "") {
              if (allDepSearch === "" || dep.name.includes(allDepSearch)) {
                //Check for page search
                return <DisplayDep dep={dep} />;
              }
            }
          } else {
            if (
              baseLine.some(
                //Check of dependency in baseline zit. Versie en naam wordt gecheckt. Ranges moeten hier nog bij, miss is een functie overzichtelijker.
                (baseDep) =>
                  baseDep.name === dep.name &&
                  baseDep.versions.versions.some(
                    (version) => version === dep.version
                  )
              )
            ) {
              if (imageDepSearch !== "" && dep.name.includes(imageDepSearch)) {
                //Check for search within the image
                return <DisplayDep dep={dep} />;
              } else if (imageDepSearch === "") {
                if (allDepSearch === "" || dep.name.includes(allDepSearch)) {
                  //Check for page search
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
