import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./Edit.css";
import { Baseline } from "../../Components/DisplayBaseline/Baseline";

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

  useEffect(() => {
    fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/getBaseline"
    )
      .then((res) => res.json())
      .then((data) => {
        setBaseLine(data);
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
                  `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/putBaseline?secret=DylanDarryl`,
                  {
                    method: "PUT",
                    body: JSON.stringify({ baseLine }),
                  }
                );
                console.log(baseLine);
              }}
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
