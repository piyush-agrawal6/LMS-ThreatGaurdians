import React from "react";
import { FaPlus } from "react-icons/fa";
import "./AddIcon.css";
import { Tooltip } from "antd";

const AddIcon = () => {
  return (
    <Tooltip placement="leftTop" color="#7366ff" title="Add New">
      <div className="addAdmin">
        <FaPlus />
      </div>
    </Tooltip>
  );
};

export default AddIcon;
