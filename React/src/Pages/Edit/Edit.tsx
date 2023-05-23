import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./Edit.css";
import { Baseline } from "../../Components/DisplayBaseline/Baseline";
import CircularProgress from "@mui/material/CircularProgress";

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: [string, string][];
}

export function Edit() {
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getBaseline"
    )
      .then((res) => res.json())
      .then((data) => {
        setBaseLine(data[0]["baseLine"]);
      });
  }, []);

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="main">
          <Baseline baseline={baseLine} setBaseline={setBaseLine} />
          <div>
            <button
              onClick={() => {
                fetch(
                  `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/putBaseline`,
                  {
                    method: "PUT",
                    body: JSON.stringify({ baseLine }),
                  }
                ).then(() => setLoading(false));
                setLoading(true);
              }}
            >
              Save
            </button>
            {loading && (
              <div className="loader">
                <CircularProgress></CircularProgress>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Edit;
