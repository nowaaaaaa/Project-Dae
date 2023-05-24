import React from "react";
import "./Baseline.css";

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

  const handleAddRange = (itemIndex: number) => {
    const updatedBaseline = [...baseline];
    updatedBaseline[itemIndex].versions.ranges.push(["", ""]);
    setBaseline(updatedBaseline);
  };

  const handleAddBaselineItem = () => {
    setBaseline((prevState) => [
      ...prevState,
      { name: "", versions: { versions: [""], ranges: [["", ""]] } },
    ]);
  };

  return (
    <div className="BaselineMap">
      {baseline.map((item, itemIndex) => (
        <div key={itemIndex} className="BaselineItem">
          <div className="NameHolder">
            <input
              className="NameInput"
              type="text"
              value={item.name}
              onChange={(event) => handleChangeName(itemIndex, event)}
              placeholder="Enter name"
            />
          </div>
          <div className="VersionsHolder">
            <ul className="Versions">
              {item.versions.versions.map((version, versionIndex) => (
                <li key={versionIndex}>
                  <input
                    type="text"
                    value={version}
                    onChange={(event) =>
                      handleChangeVersion(itemIndex, versionIndex, event)
                    }
                    placeholder="Enter version"
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleAddVersion(itemIndex)}
            className="Button"
          >
            Add Version
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
                    placeholder="Enter range start"
                  />
                  <input
                    className="RangeEnd"
                    type="text"
                    value={rangeArray[1]}
                    onChange={(event) =>
                      handleChangeRangeEnd(itemIndex, rangeIndex, event)
                    }
                    placeholder="Enter range end"
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAddRange(itemIndex)}
              className="Button"
            >
              Add Range
            </button>
          </div>
        </div>
      ))}
      <button onClick={handleAddBaselineItem} className="AddBsln">
        Add Baseline Item
      </button>
    </div>
  );
};
