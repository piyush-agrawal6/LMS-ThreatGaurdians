import React from "react";
import "./ContentBox.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContent } from "../../Redux/content/action";

const ContentBox = ({ data }) => {
  const { user } = useSelector((store) => store.auth.data);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteContent(id));
  };
  return (
    <div className="contentDiv">
      <div>
        <img src={data.thumbnailUrl} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          <p>Class {data.class}</p>
        </div>
        <div>
          {user.userType == "admin" || "tutor" ? (
            <div className="contentOption">
              <p>{data.type}</p>
              <button>Check</button>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
            </div>
          ) : (
            <div className="contentOption">
              <p>{data.type}</p>
              <button>Check</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentBox;
