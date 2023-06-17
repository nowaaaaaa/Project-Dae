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
  const [currentFilter, setFilter] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isFetching = false;
  
    const handleKeyDown = (e) => {
      if (e.key === "s" && e.ctrlKey && !isFetching && currentFilter !== "") {
        e.preventDefault();
        isFetching = true;
        setLoading(true);
        fetch(`http://localhost:5000/api/sbomTest/filters/patchFilter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: currentFilter,
            versions: baseLine,
          }),
        }).then(() => {
          setLoading(false);
          isFetching = false;
        });
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFilter, baseLine]);

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
              onChange={(e) => {
                setFilter(e.value);
                fetch(
                  `http://localhost:5000/api/sbomTest/filters/getFilter/${e.value}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    setBaseLine(data);
                    console.log(data);
                  });
              }}
            />
            <input
              type="text"
              placeholder="Enter New Filter Name"
              onChange={(e) => setAddItem(e.target.value)}
            />
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
          {currentFilter !== "" && (
            <>
              <Baseline baseline={baseLine} setBaseline={setBaseLine} />
              <div className="ButtonHolder">
                <button
                  className="SaveButton"
                  onClick={() => {
                    setLoading(true); //Loading aanzetten
                    console.log(baseLine);
                    fetch(
                      `http://localhost:5000/api/sbomTest/filters/patchFilter`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: currentFilter,
                          versions: baseLine,
                        }),
                      }
                    ).then(() => setLoading(false)); //Loading uitzetten als de fetch klaar is
                  }}
                >
                  Save
                  {loading && (
                    <div className="loader">
                      <CircularProgress size={"1rem"} />
                      {/*Loading icoontje als Loading aan staat, nog niet super goede plek maar dat komt wel*/}
                    </div>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Edit;
