import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./Edit.css";
import { Baseline } from "../../Components/DisplayBaseline/Baseline";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";

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
  const [filterItems, setFilterItems] = useState<String[]>([]);
  const [addItem, setAddItem] = useState<String>("");
  const [currentFilter, setFilter] = useState<String>("A");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/sbomTest/filters/getNames")
      .then((res) => res.json())
      .then((data) => {
        setFilterItems(data);
      });
  }, []);

  return (
    <>
      <div className="screen">
        <Sidebar />
        <div className="mainEdit">
          <div className="FilterItems">
            <Select
              className="FilterSelect"
              options={filterItems.map((item) => {
                {
                  return { value: item, label: item };
                }
              })}
            />
            <input type="text" onChange={(e) => setAddItem(e.target.value)} />
            <span
              className="AddIcon"
              onClick={() => {
                if (filterItems.includes(addItem) === false && addItem !== "") {
                  fetch(
                    `http://localhost:5000/api/sbomTest/filters/postFilter`,
                    {
                      method: "POST",
                      body: JSON.stringify({ name: addItem }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                    })
                    .catch((err) => console.log(err));

                  setFilterItems([...filterItems, addItem]);
                }
              }}
            >
              <AddIcon />
            </span>
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
