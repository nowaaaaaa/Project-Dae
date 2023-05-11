import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "../../Pages/Home/App.css";
import React from "react";

interface SideItem {
  name: string;
  icon: JSX.Element;
  Link: string;
}

const Side: React.FC<{ item: SideItem[] }> = ({ item }) => {
  var cl = "";
  if (window.location.pathname === "/edit") {
    cl = "side-item-selected";
  } else {
    cl = "side-item";
  }

  return (
    <div className="sidebar">
      {item.map((sideItem) => {
        return (
          <div
            className="side-item"
            onClick={() => window.location.replace(sideItem.Link)}
          >
            {sideItem.icon}
            <h1 className="head">{sideItem.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export function Sidebar() {
  return (
    <Side
      item={[
        {
          name: "Home",
          icon: <HomeOutlinedIcon fontSize="large" />,
          Link: "/",
        },
        {
          name: "Edit Baseline",
          icon: <ImageSearchIcon fontSize="large" />,
          Link: "/edit",
        }
      ]}
    />
  );
}
