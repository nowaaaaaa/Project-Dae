import { useEffect, useState } from "react";
import "./App.css";
import tomcat from "../../assets/tomcatDeps.json";
import baseline from "../../assets/baseline.json";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { Buffer } from "buffer";

interface Dependency {
  name: string;
  version: string;
}

const baseLine = baseline as Dependency[];

const tomcatDeps = tomcat as Dependency[];

const DisplayDep: React.FC<{ dep: Dependency }> = ({ dep }) => {
  return (
    <div className="dep">
      <p className="info">{dep.name}</p>
      <p className="info">{dep.version}</p>
    </div>
  );
};

const DisplayFile: React.FC<{ file: Dependency[] }> = ({ file }) => {
  return (
    <div className="foundDeps">
      {file.map((dep) => {
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

export function Home() {
  const [file, setFile] = useState<Dependency[]>([]);
  const Images: React.FC<{ deps: string[] }> = ({ deps }) => {
    const changeDep = (dep: string) => {
      fetch(
        `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/FetchDeps`,
        {
          method: "GET",
          headers: {
            dep: dep,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFile(data);
        });
    };
    return (
      <div className="images">
        {deps.map((dep) => {
          return (
            <div className="image">
              <h1 className="imtxt" onClick={() => changeDep(dep)}>
                {dep}
              </h1>
            </div>
          );
        })}
      </div>
    );
  };

  const [Img, setImg] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/get",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setImg(data);
      });
  }, []);

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <Images deps={Img} />
          <DisplayFile file={file} />
        </div>
      </div>
    </>
  );
}

export default Home;
