import React from "react";

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
    <div>
      {baseline.map((item, itemIndex) => (
        <div key={itemIndex}>
          <input
            type="text"
            value={item.name}
            onChange={(event) => handleChangeName(itemIndex, event)}
            placeholder="Enter name"
          />
          <ul>
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
          <button onClick={() => handleAddVersion(itemIndex)}>
            Add Version
          </button>

          <ul>
            {item.versions.ranges.map((rangeArray, rangeIndex) => (
              <li key={rangeIndex}>
                <input
                  type="text"
                  value={rangeArray[0]}
                  onChange={(event) =>
                    handleChangeRangeStart(itemIndex, rangeIndex, event)
                  }
                  placeholder="Enter range start"
                />
                <input
                  type="text"
                  value={rangeArray[1]}
                  onChange={(event) =>
                    handleChangeRangeEnd(itemIndex, rangeIndex, event)
                  }
                  placeholder="Enter range end"
                />
                {rangeIndex === item.versions.ranges.length - 1 && (
                  <button onClick={() => handleAddRange(itemIndex)}>
                    Add Range
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleAddBaselineItem}>Add Baseline Item</button>
    </div>
  );
};
