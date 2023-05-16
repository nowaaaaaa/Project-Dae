import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import baseline from "../../assets/baseline.json";
import "../Home/App.css";
import "./Edit.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Dependency {
  name: string;
  version: string;
  number?: number;
}

interface BaselineItem {
  name: string;
  versions: Version[];
}

interface Version {
  versions: string[];
  ranges: string[][];
}

const a: BaselineItem = {
  name: "bal",
  versions: [
    {
      versions: ["1.0.0", "1.0.1"],
      ranges: [
        ["1.0.0", "1.0.1"],
        ["1.0.0", "1.0.1"],
      ],
    },
  ],
};

//const baseLine = baseline as Dependency[];

const test = ["bal", "bal", "bal"];

const DisplayDep: React.FC<{ dep: Dependency }> = ({ dep }) => {
  const [e, setE] = useState<boolean>(true);
  const handleInput = (e: boolean) => {
    setE(!e);
  };

  return (
    <>
      <div className="depHolder">
        <div
          className="editHolder"
          onClick={() => {
            handleInput(e);
          }}
        >
          <EditIcon className="edit" />
        </div>
        <form action="" className="depForm">
          <input type="text" className="input" value={dep.name} disabled={e} />
          <input
            type="text"
            className="input"
            value={dep.version}
            disabled={e}
          />
        </form>
        <div className="deleteHolder">
          <DeleteIcon className="delete" />
        </div>
      </div>
    </>
  );
};

const DisplayFile: React.FC<{ file: Dependency[] }> = ({ file }) => {
  return (
    <div className="foundDeps">
      {file.map((dep) => {
        return <DisplayDep dep={dep} />;
      })}
    </div>
  );
};

export function Edit() {
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);

  const Fetch = (item: any) => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/putBaseline",
      {
        method: "POST",
        body: JSON.stringify({ item }),
      }
    );
  };

  const AddItem: React.FC = () => {
    return (
      <div
        className="addItem"
        onClick={() => {
          setBaseLine([
            ...baseLine,
            {
              name: "Add Name",
              versions: [
                {
                  versions: ["Version"],
                  ranges: [["Range Start", "Range End"]],
                },
              ],
            },
          ]);
          console.log(baseLine);
        }}
      >
        <AddIcon className="add" fontSize="large" />
      </div>
    );
  };

  const DisplayBaseline: React.FC<{ baseline: BaselineItem[] }> = ({
    baseline,
  }) => {
    return (
      <div className="baselineHolder">
        {baseline.map((item) => {
          return (
            <div className="baselineItem">
              <h1>{item.name}</h1>
              <div className="baselineVersions">
                {item.versions.map((version) => {
                  return (
                    <>
                      <div>
                        {version.versions.map((v) => {
                          return <input type="text" placeholder={v} />;
                        })}
                      </div>
                      <div>
                        {version.ranges.map((r) => {
                          return r.map((v) => {
                            return <input type="text" placeholder={v} />;
                          });
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
        <AddItem />
      </div>
    );
  };

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <DisplayBaseline baseline={baseLine} />
        </div>
      </div>
    </>
  );
}
export default Edit;
