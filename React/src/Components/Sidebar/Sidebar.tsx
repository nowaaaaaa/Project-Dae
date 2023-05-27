import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "./Sidebar.css";
import React from "react";

interface SideItem {
  name: string;
  icon: JSX.Element;
  Link: string;
}

const Side: React.FC<{ item: SideItem[] }> = ({ item }) => {
  return (
    <div className="sidebar">
      <div className="sideSpacer" />
      {item.map((sideItem, i) => {
        return (
          <div
            className="side-item"
            key={i}
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
        },
        {
          name: "Search Dependencies",
          icon: <ImageSearchIcon fontSize="large" />,
          Link: "/dependencies",
        },
      ]}
    />
  );
}
