import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: string[][];
}

const NameChange: React.FC<{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}> = ({ name, setName }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };
  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} />
    </div>
  );
};

// const VersionChange: React.FC<{
//   version: string[];
//   setVersion: React.Dispatch<React.SetStateAction<string[]>>;
// }> = ({ version, setVersion }) => {
//   const handleVersionChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     versionIndex: number
//   ) => {
//     const newVersion = [...version];
//     newVersion[versionIndex] = e.target.value;
//     setVersion(newVersion);
//   };

//   return (
//     <div>
//       {version.map((version, versionIndex) => {
//         return (
//           <input
//             key={versionIndex}
//             type="text"
//             value={version}
//             onChange={(e) => handleVersionChange(e, versionIndex)}
//           />
//         );
//       })}
//       <span onClick={() => setVersion((prevVersion) => [...prevVersion, "v1"])}>
//         <AddIcon />
//       </span>
//     </div>
//   );
// };

// const RangeChange: React.FC<{
//   ranges: string[][];
//   setRanges: React.Dispatch<React.SetStateAction<string[][]>>;
// }> = ({ ranges, setRanges }) => {
//   const handleRangeChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     rangeIndex: number,
//     elementIndex: number
//   ) => {
//     const newRanges = [...ranges];
//     newRanges[rangeIndex][elementIndex] = e.target.value;
//     setRanges(newRanges);
//   };

//   return (
//     <div>
//       {ranges.map((range, rangeIndex) => {
//         return (
//           <div key={rangeIndex}>
//             <input
//               type="text"
//               value={range[0]}
//               onChange={(e) => handleRangeChange(e, rangeIndex, 0)}
//             />
//             <input
//               type="text"
//               value={range[1]}
//               onChange={(e) => handleRangeChange(e, rangeIndex, 1)}
//             />
//           </div>
//         );
//       })}
//       <span
//         onClick={() =>
//           setRanges((prevRange) => [...prevRange, ["Range Start", "Range End"]])
//         }
//       >
//         <AddIcon />
//       </span>
//     </div>
//   );
// };

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

export const DisplayBaseline: React.FC<{
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
                  (baseline[index] = {
                    name: name,
                    versions: { versions: version, ranges: ranges },
                  }),
                    console.log(baseline);
                }}
              />
            </div>
          </div>
        );
      })}
      <AddItem baseline={baseline} setBaseline={setBaseline} />
    </div>
  );
};
