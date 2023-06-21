import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
        var classname = "side-item";
        if (sideItem.Link === window.location.pathname) {
          classname += "-active";
        }
        return (
          <div
            className={classname}
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
          name: "Edit Filters",
          icon: <BorderColorIcon fontSize="large" />,
          Link: "/edit",
        },
        {
          name: "Search Images",
          icon: <ImageSearchIcon fontSize="large" />,
          Link: "/oldPage",
        },
      ]}
    />
  );
}
