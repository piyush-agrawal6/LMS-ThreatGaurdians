import React from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

const Menu = ({ Icon, Title }) => {
  return (
    <li >
      <Link href="/">
        {Icon}
        <span className="text">{Title}</span>
      </Link>
    </li>
  );
};

export default Menu;
