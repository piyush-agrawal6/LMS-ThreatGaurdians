import React, { useEffect } from "react";
import "./Doubts.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Doubts = () => {
  const dispatch = useDispatch();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="doubts">
        <Header Title={"Doubts"} Address={"Doubts"} />
        <div className="doubtsData"></div>
      </div>
    </Navbar>
  );
};

export default Doubts;
