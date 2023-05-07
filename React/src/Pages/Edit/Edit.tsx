import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import baseline from "../../assets/baseline.json";
import "../Home/App.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Dependency {
  name: string;
  version: string;
  number?: number;
}

const baseLine = baseline as Dependency[];

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
  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <DisplayFile file={baseLine} />
        </div>
      </div>
    </>
  );
}
export default Edit;
