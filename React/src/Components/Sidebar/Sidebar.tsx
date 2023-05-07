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
          name: "Edit Baseline",
          icon: <ImageSearchIcon fontSize="large" />,
          Link: "/edit",
        },
        {
          name: "Home",
          icon: <HomeOutlinedIcon fontSize="large" />,
          Link: "/",
        },
      ]}
    />
  );
}