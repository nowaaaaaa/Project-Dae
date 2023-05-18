import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "../Home/App.css";
import "./Edit.css";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { DisplayBaseline } from "../../Components/DisplayBaseline/DisplayBaseline";

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: string[][];
}

export function Edit() {
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getBaseline"
    )
      .then((res) => res.json())
      .then((data) => {
        setBaseLine(data);
      });
  }, []);

  const Fetch = (item: any) => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/postBaseline",
      {
        method: "POST",
        body: JSON.stringify({ item }),
      }
    );
  };

  const AddItem: React.FC<{
    baseline: BaselineItem[];
    setBaseline: React.Dispatch<React.SetStateAction<BaselineItem[]>>;
  }> = ({ baseline, setBaseline }) => {
    return (
      <div
        className="addItem"
        onClick={() =>
          setBaseline([
            ...baseline,
            {
              name: "Add Name",
              versions: {
                versions: [],
                ranges: [],
              },
            },
          ])
        }
      >
        <AddIcon className="add" fontSize="large" />
      </div>
    );
  };

  const DisplayBaseline: React.FC<{
    baseline: BaselineItem[];
    setBaseline: React.Dispatch<React.SetStateAction<BaselineItem[]>>;
  }> = ({ baseline, setBaseline }) => {
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

          const handleRangeChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            rangeIndex: number,
            elementIndex: number
          ) => {
            const newRanges = [...ranges];
            newRanges[rangeIndex][elementIndex] = e.target.value;
            setRanges(newRanges);
          };

          const handleVersionChange = (
            e: React.ChangeEvent<HTMLInputElement>,
            versionIndex: number
          ) => {
            const newVersion = [...version];
            newVersion[versionIndex] = e.target.value;
            setVersion(newVersion);
          };

          const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newName = e.target.value;
            setName(newName);
          };

          return (
            <div key={index}>
              {/* Dependency Name Field */}
              <div>
                <input type="text" value={name} onChange={handleNameChange} />
              </div>
              {/* End Name Field */}
              {/* Version Field */}
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
              {/* End Version Field */}
              {/* Range Field */}
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
              {/* End Range Field */}
              {/* Save Button */}
              <div>
                <SaveIcon
                  onClick={() => {
                    (baseline[index] = {
                      name: name,
                      versions: { versions: version, ranges: ranges },
                    }),
                      console.log(baseline);
                  }}
                />
              </div>
              {/* End Save Button */}
            </div>
          );
        })}
        <AddItem baseline={baseline} setBaseline={setBaseline} />
      </div>
    );
  };

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <DisplayBaseline baseline={baseLine} setBaseline={setBaseLine} />
          <div>
            <button
              onClick={() =>
                fetch(
                  `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/putBaseline?secret=DylanDarryl`,
                  {
                    method: "PUT",
                    body: JSON.stringify({ baseLine }),
                  }
                )
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Edit;
