import React from "react";
import "./DoubtBox.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContent } from "../../Redux/content/action";
import { useNavigate } from "react-router-dom";
import { deleteDoubt, resolveDoubt } from "../../Redux/doubt/action";

const DoubtBox = ({ data }) => {
  const { user } = useSelector((store) => store.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    dispatch(deleteDoubt(id));
  };
  const handleClick = (id) => {
    return navigate(`/doubt/${id}`);
  };
  const handleResolve = (id) => {
    dispatch(resolveDoubt(id));
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
          <p>Resolved : {data.resolved == "Yes" ? "Yes" : "No"}</p>
        </div>
        <div>
          {user?.userType == "Admin" || user?.userType == "Tutor" ? (
            <div className="contentOption">
              <button onClick={() => handleClick(data._id)}>Check</button>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
            </div>
          ) : (
            <div className="contentOption">
              <p>{data.type}</p>
              <button onClick={() => handleClick(data._id)}>Check</button>
              {data?.resolved == "No" ? (
                <button onClick={() => handleResolve(data._id)}>
                  Resolved?
                </button>
              ) : (
                <button onClick={() => handleDelete(data._id)}>Delete</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoubtBox;
