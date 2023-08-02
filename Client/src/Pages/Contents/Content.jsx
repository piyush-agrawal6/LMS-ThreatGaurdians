import React from "react";
import "./Content.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
const Content = () => {
  return (
    <Navbar>
      <div className="content">
        <Header Title={"Contents"} Address={"Contents"} />
      </div>
      <div className="contentData"></div>
    </Navbar>
  );
};

export default Content;
