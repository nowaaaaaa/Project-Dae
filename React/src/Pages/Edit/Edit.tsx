import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./Edit.css";
import { Baseline } from "../../Components/DisplayBaseline/Baseline";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";

interface BaselineItem {
  name: string;
  versions: Version;
}

interface Version {
  versions: string[];
  ranges: [string, string][];
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export function Edit() {
  const [baseLine, setBaseLine] = useState<BaselineItem[]>([]);
  const [filterItems, setFilterItems] = useState<String[]>([
    "a",
    "basdsdgdfgdfgasddsdf",
  ]);
  const [currentFilter, setFilter] = useState<String>("A");
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
          <div className="FilterItems">
            <Select
              className="FilterSelect"
              options={filterItems.map((item) => {
                {
                  return { value: item, label: item };
                }
              })}
            />
          </div>
          <Baseline baseline={baseLine} setBaseline={setBaseLine} />
          <div className="ButtonHolder">
            <button
              className="SaveButton"
              onClick={() => {
                setLoading(true); //Loading aanzetten
                fetch(
                  `https://eu-central-1.aws.data.mongodb-api.com/app/data-xmrsh/endpoint/putBaseline`,
                  {
                    method: "PUT",
                    body: JSON.stringify({ baseLine }),
                  }
                ).then(() => setLoading(false)); //Loading uitzetten als de fetch klaar is
              }}
            >
              Save
            </button>
            {loading && (
              <div className="loader">
                <CircularProgress size={"1rem"} />
                {/*Loading icoontje als Loading aan staat, nog niet super goede plek maar dat komt wel*/}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Edit;
