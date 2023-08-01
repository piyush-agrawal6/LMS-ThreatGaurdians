import React from "react";

// Icons import
import { CiSettings, CiMedicalCase, CiShoppingCart } from "react-icons/ci";
import { PiPaintBucketThin } from "react-icons/pi";
import { MdOutlineTune } from "react-icons/md";

//CSS imports
import { Tooltip } from "antd";
import "./float.css";

const FloatDiv = () => {
  return (
    <div className="float">
      <Tooltip placement="leftTop" color="#7366ff" title="Check layouts">
        <PiPaintBucketThin />
      </Tooltip>
      <Tooltip placement="leftTop" color="#7366ff" title="Quick option">
        <CiSettings />
      </Tooltip>
      <Tooltip placement="leftTop" color="#7366ff" title="Support">
        <CiMedicalCase />
      </Tooltip>
      <Tooltip placement="leftTop" color="#7366ff" title="Document">
        <CiSettings />
      </Tooltip>
      <Tooltip placement="leftTop" color="#7366ff" title="Check features">
        <MdOutlineTune />
      </Tooltip>
      <Tooltip placement="leftTop" color="#7366ff" title="Buy now">
        <CiShoppingCart />
      </Tooltip>
    </div>
  );
};

export default FloatDiv;
