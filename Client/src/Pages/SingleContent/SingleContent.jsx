import React, { useEffect, useState } from "react";
import "./SingleContent.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleContentData } from "../../Redux/content/action";

const SingleContent = () => {
  const dispatch = useDispatch();
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { singleContent } = useSelector((store) => store.content);

  const params = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSingleContentData(params.id));
  }, []);

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="singleContent">
        <Header Title={"Content"} Address={"Contents"} />
        <div className="singleContentData">
          <div className="fileContainer">
            {singleContent?.fileType == "jpg" ||
            singleContent?.fileType == "jpeg" ? (
              <img src={singleContent.fileUrl} alt="" />
            ) : (
              <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                controls
                controlsList="nodownload"
              >
                <source src={singleContent.fileUrl} />
              </video>
            )}
          </div>
        </div>

        <div className="singleContentDetails">
          <p>Topic : {singleContent?.title}</p>
          <p>Class : {singleContent?.class}</p>
          <p>Subject : {singleContent?.subject}</p>
          <p>Content Type : {singleContent?.type}</p>
          <p>Tutor : {singleContent?.type}</p>
        </div>
      </div>
    </Navbar>
  );
};

export default SingleContent;
