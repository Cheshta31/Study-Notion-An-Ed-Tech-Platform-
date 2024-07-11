import React from "react";
import * as reactIcons from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function SidebarLink({ link }) {
  const Icon = reactIcons[link.icon];

  return (
    <NavLink
      className="flex items-center gap-2 px-6 py-2"
      style={({ isActive }) => {
        return {
          background: isActive ? "#3D2A01" : "",
          color: isActive ? "#FFD60A" : "#838894",
          borderLeft: isActive ? "2px solid #FFD60A" : "",
        };
      }}
      to={link.path}
    >
      <Icon />
      {link.name}
    </NavLink>
  );
}

export default SidebarLink;
