import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
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
