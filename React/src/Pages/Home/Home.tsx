import { useEffect, useState } from "react";
import "./App.css";
import tomcat from "../../assets/tomcatDeps.json";
import baseline from "../../assets/baseline.json";
import { Sidebar } from "../../Components/Sidebar/Sidebar";

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

const Images: React.FC<{ deps: string[] }> = ({ deps }) => {
  return (
    <div className="images">
      {deps.map((dep) => {
        return (
          <div className="image">
            <h1 className="imtxt">{dep}</h1>
          </div>
        );
      })}
    </div>
  );
};

export function Home() {
  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <Images
            deps={[
              "tomcat",
              "java",
              "python",
              "nodejs",
              "ruby",
              "php",
              "nginx",
              "apache",
              "mysql",
              "postgres",
              "mariadb",
              "mongo",
              "redis",
              "memcached",
              "rabbitmq",
              "cassandra",
              "couchdb",
              "elas",
              "kafka",
              "zookeeper",
              "hadoop",
              "spark",
              "tomcat",
              "java",
              "python",
              "nodejs",
              "ruby",
              "php",
              "nginx",
              "apache",
              "mysql",
              "postgres",
              "mariadb",
              "mongo",
              "redis",
              "memcached",
              "rabbitmq",
              "cassandra",
              "couchdb",
              "elas",
              "kafka",
              "zookeeper",
              "hadoop",
              "spark",
            ]}
          />
          <DisplayFile file={tomcatDeps} />
        </div>
      </div>
    </>
  );
}

export default Home;
