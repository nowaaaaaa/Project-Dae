import React, { useState } from "react";

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: string[][];
}

interface BaselineProps {
  baselineItems: BaselineItem[];
}

const BaselineComponent: React.FC<BaselineProps> = ({ baselineItems }) => {
  const [items, setItems] = useState<BaselineItem[]>(baselineItems);

  const handleVersionChange = (
    index: number,
    versionIndex: number,
    newValue: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index].versions.versions[versionIndex] = newValue;
    setItems(updatedItems);
  };

  const handleRangeChange = (
    index: number,
    rangeIndex: number,
    subRangeIndex: number,
    newValue: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index].versions.ranges[rangeIndex][subRangeIndex] = newValue;
    setItems(updatedItems);
  };

  const handleAddVersion = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].versions.versions.push("");
    setItems(updatedItems);
  };

  const handleAddRange = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].versions.ranges.push([""]);
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <div>
            <h4>Versions:</h4>
            <ul>
              {item.versions.versions.map((version, versionIndex) => (
                <li key={versionIndex}>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) =>
                      handleVersionChange(index, versionIndex, e.target.value)
                    }
                  />
                </li>
              ))}
              <li>
                <button onClick={() => handleAddVersion(index)}>
                  Add Version
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4>Ranges:</h4>
            <ul>
              {item.versions.ranges.map((range, rangeIndex) => (
                <li key={rangeIndex}>
                  <ul>
                    {range.map((subRange, subRangeIndex) => (
                      <li key={subRangeIndex}>
                        <input
                          type="text"
                          value={subRange}
                          onChange={(e) =>
                            handleRangeChange(
                              index,
                              rangeIndex,
                              subRangeIndex,
                              e.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                    <li>
                      <button onClick={() => handleAddRange(index)}>
                        Add Range
                      </button>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BaselineComponent;
