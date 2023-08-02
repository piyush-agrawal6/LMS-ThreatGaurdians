import React from "react";
import "./Admin.css";
import { Table, Tooltip } from "antd";

import Navbar from "../../Components/Sidebar/Navbar";
import { BiHome } from "react-icons/bi";
const Admin = () => {

  return (
    <Navbar>
      <div className="admin">
        <div className="head-title">
          <div className="head-left">Default</div>
          <div className="head-right">
            <BiHome /> <p>/ Dashboard</p> <span>/ Default</span>
          </div>
        </div>
        <div className="adminData">
          
        </div>
      </div>
    </Navbar>
  );
};

export default Admin;
