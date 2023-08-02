import React from "react";
import "./Header.css";
import { BiHome } from "react-icons/bi";

const Header = ({ Title, Address }) => {
  return (
    <div className="head-title">
      <div className="head-left">{Title}</div>
      <div className="head-right">
        <BiHome /> <p>/ Dashboard</p> <span>/ {Address}</span>
      </div>
    </div>
  );
};

export default Header;
