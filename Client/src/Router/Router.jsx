import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Router;
