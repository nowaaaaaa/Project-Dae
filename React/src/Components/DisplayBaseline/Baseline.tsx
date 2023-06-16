import React from "react";
import "./Baseline.css";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: [string, string][];
}

export const Baseline: React.FC<{
  baseline: BaselineItem[];
  setBaseline: React.Dispatch<React.SetStateAction<BaselineItem[]>>;
}> = ({ baseline, setBaseline }) => {
  const handleChangeName = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[index].name = event.target.value;
    setBaseline(updatedBaseline);
  };

  const handleChangeVersion = (
    itemIndex: number,
    versionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.versions[versionIndex] =
      event.target.value;
    setBaseline(updatedBaseline);
  };

  const handleChangeRangeStart = (
    itemIndex: number,
    rangeIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.ranges[rangeIndex][0] =
      event.target.value;
    setBaseline(updatedBaseline);
  };

  const handleChangeRangeEnd = (
    itemIndex: number,
    rangeIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.ranges[rangeIndex][1] =
      event.target.value;
    setBaseline(updatedBaseline);
  };

  const handleAddVersion = (itemIndex: number) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.versions.push("");
    setBaseline(updatedBaseline);
  };

  const handleRemoveVersion = (itemIndex: number, versionIndex: number) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.versions.splice(versionIndex, 1);
    setBaseline(updatedBaseline);
  };

  const handleAddRange = (itemIndex: number) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.ranges.push(["", ""]);
    setBaseline(updatedBaseline);
  };

  const handleRemoveRange = (itemIndex: number, rangeIndex: number) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.ranges.splice(rangeIndex, 1);
    setBaseline(updatedBaseline);
  };

  const handleAddBaselineItem = () => {
    setBaseline((prevState) => [
      ...prevState,
      { name: "", versions: { versions: [], ranges: [] } },
    ]);
  };

  const handleRemoveBaselineItem = (itemIndex: number) => {
    const updatedBaseline = [...baseline];
    updatedBaseline.splice(itemIndex, 1);
    setBaseline(updatedBaseline);
  };

  return (
    <div className="BaselineMap">
      {baseline.map((item, itemIndex) => (
        <div key={itemIndex} className="BaselineItem">
          <Tooltip title="Remove Dependency" arrow placement="right">
            <span
              className="DeleteBaselineItem"
              onClick={() => {
                handleRemoveBaselineItem(itemIndex);
              }}
            >
              <DeleteIcon className="Clear" />
            </span>
          </Tooltip>
          <div className="NameHolder">
            <input
              className="NameInput"
              type="text"
              value={item.name}
              onChange={(event) => handleChangeName(itemIndex, event)}
              placeholder="Dependency Name"
            />
          </div>
          <div className="VersionsHolder">
            <ul className="Versions">
              {item.versions.versions.map((version, versionIndex) => (
                <li key={versionIndex} className="versionsList">
                  <input
                    type="text"
                    value={version}
                    onChange={(event) =>
                      handleChangeVersion(itemIndex, versionIndex, event)
                    }
                    placeholder="Enter Specific Version"
                  />
                  <Tooltip title="Remove Version" arrow placement="right">
                    <span
                      className="ClearHolder"
                      onClick={() => {
                        handleRemoveVersion(itemIndex, versionIndex);
                      }}
                    >
                      <ClearIcon className="Clear" />
                    </span>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleAddVersion(itemIndex)}
            className="Button"
          >
            Add Specific Version
          </button>
          <div className="RangesHolder">
            <ul className="Ranges">
              {item.versions.ranges.map((rangeArray, rangeIndex) => (
                <li key={rangeIndex} className="RangeLi">
                  <input
                    className="RangeStart"
                    type="text"
                    value={rangeArray[0]}
                    onChange={(event) =>
                      handleChangeRangeStart(itemIndex, rangeIndex, event)
                    }
                    placeholder="Range Start"
                  />
                  <input
                    className="RangeEnd"
                    type="text"
                    value={rangeArray[1]}
                    onChange={(event) =>
                      handleChangeRangeEnd(itemIndex, rangeIndex, event)
                    }
                    placeholder="Range End"
                  />
                  <Tooltip title="Remove Version Range" arrow placement="right">
                    <span
                      className="ClearHolder"
                      onClick={() => {
                        handleRemoveRange(itemIndex, rangeIndex);
                      }}
                    >
                      <ClearIcon className="Clear" />
                    </span>
                  </Tooltip>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAddRange(itemIndex)}
              className="Button"
            >
              Add Version Range
            </button>
          </div>
        </div>
      ))}
      <Tooltip title="Add Dependency" color="red">
        <button onClick={handleAddBaselineItem} className="AddBsln">
          <AddIcon fontSize="large" />
        </button>
      </Tooltip>
    </div>
  );
};
