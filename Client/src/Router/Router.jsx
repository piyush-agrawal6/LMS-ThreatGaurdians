import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Admin from "../Pages/Admin/Admin";
import Tutor from "../Pages/Tutor/Tutor";
import Student from "../Pages/Student/Student";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </div>
  );
};

export default Router;
