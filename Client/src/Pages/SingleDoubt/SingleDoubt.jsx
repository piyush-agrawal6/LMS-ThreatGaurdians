import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addResponse, getSingleDoubtData } from "../../Redux/doubt/action";

// component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";

//css imports
import { Space, Spin } from "antd";
import "./SingleDoubt.css";

const SingleDoubt = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { singleDoubt, load } = useSelector((store) => store.doubt);

  //form states
  const [desc, setDesc] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addResponse(singleDoubt?._id, desc));
  };

  useEffect(() => {
    dispatch(getSingleDoubtData(params.id));
    setDesc("");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Doubt Details"} Address={"Doubt"} />
        <div className="singleContentData">
          <div className="fileContainer">
            {singleDoubt?.fileType == "jpg" ||
            singleDoubt?.fileType == "jpeg" ? (
              <img src={singleDoubt.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleDoubt.fileUrl} />
              </video>
            )}
          </div>
        </div>

        <div className="doubtResponses">
          <p>Topic : {singleDoubt?.title}</p>
          <p>Class : {singleDoubt?.class}</p>
          <p>Subject : {singleDoubt?.subject}</p>
          <p>Description : {singleDoubt?.description}</p>
          <p>Resolved : {singleDoubt?.resolved == "Yes" ? "Yes" : "No"}</p>
        </div>
        <div className="doubtResponses">
          <h3>Responses</h3>
        </div>
        {singleDoubt?.response?.map((data, i) => {
          return (
            <div key={i} className="doubtResponses">
              <p>Response no. : {i + 1}</p>
              <p>Description : {data}</p>
            </div>
          );
        })}

        <div className="doubtResponses">
          <p>Add New Response</p>
          <form className="responseForm" onSubmit={(e) => handleSubmit(e)}>
            <input
              name="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
            />
            <input type="submit" />
          </form>
        </div>
        {load ? (
          <Space
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.2)",
              top: "0",
              left: "0",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Spin size="large"></Spin>
          </Space>
        ) : null}
      </div>
    </Navbar>
  );
};

export default SingleDoubt;
