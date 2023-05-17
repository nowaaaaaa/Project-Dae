import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import baseline from "../../assets/baseline.json";
import "../Home/App.css";
import "./Edit.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { BaselineComponent } from "../../Components/Old/Test";

interface Dependency {
  name: string;
  version: string;
  number?: number;
}

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: string[][];
}

const a: BaselineItem = {
  name: "bal",
  versions: {
    versions: ["1.0.0", "1.0.1"],
    ranges: [
      ["1.0.0", "1.0.1"],
      ["1.0.0", "1.0.1"],
    ],
  },
};

//const baseLine = baseline as Dependency[];

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

const baselineItems: BaselineItem[] = [
  {
    name: "Item 1",
    versions: {
      versions: ["Version 1", "Version 2"],
      ranges: [["Range 1"], ["Range 2"]],
    },
  },
  {
    name: "Item 2",
    versions: {
      versions: ["Version 3"],
      ranges: [["Range 3"]],
    },
  },
];

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
              versions: {
                versions: [],
                ranges: [],
              },
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
        {baseline.map((item, index) => {
          const [name, setName] = useState<string>(item.name);
          const [version, setVersion] = useState<string[]>(
            item.versions.versions.map((version) => version)
          );
          const [ranges, setRanges] = useState<string[][]>(
            item.versions.ranges.map((range) => range)
          );

          const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newName = e.target.value;
            setName(newName);
          };

          const handleVersionChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            versionIndex: number
          ) => {
            const newVersion = [...version];
            newVersion[versionIndex] = e.target.value;
            setVersion(newVersion);
          };

          const handleRangeChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            rangeIndex: number,
            elementIndex: number
          ) => {
            const newRanges = [...ranges];
            newRanges[rangeIndex][elementIndex] = e.target.value;
            setRanges(newRanges);
          };

          return (
            <div key={index}>
              <div>
                <input type="text" value={name} onChange={handleNameChange} />
              </div>
              <div>
                {version.map((version, versionIndex) => {
                  return (
                    <input
                      key={versionIndex}
                      type="text"
                      value={version}
                      onChange={(e) => handleVersionChange(e, versionIndex)}
                    />
                  );
                })}
                <span
                  onClick={() =>
                    setVersion((prevVersion) => [...prevVersion, "v1"])
                  }
                >
                  <AddIcon />
                </span>
              </div>
              <div>
                {ranges.map((range, rangeIndex) => {
                  return (
                    <div key={rangeIndex}>
                      <input
                        type="text"
                        value={range[0]}
                        onChange={(e) => handleRangeChange(e, rangeIndex, 0)}
                      />
                      <input
                        type="text"
                        value={range[1]}
                        onChange={(e) => handleRangeChange(e, rangeIndex, 1)}
                      />
                    </div>
                  );
                })}
                <span
                  onClick={() =>
                    setRanges((prevRange) => [
                      ...prevRange,
                      ["Range Start", "Range End"],
                    ])
                  }
                >
                  <AddIcon />
                </span>
              </div>
              <div>
                <SaveIcon
                  onClick={() => {
                    (baseLine[index] = {
                      name: name,
                      versions: { versions: version, ranges: ranges },
                    }),
                      console.log(baseLine);
                  }}
                />
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
