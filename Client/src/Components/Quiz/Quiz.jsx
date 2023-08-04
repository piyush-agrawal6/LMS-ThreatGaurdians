import React from "react";
import "./Quiz.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz } from "../../Redux/quiz/action";

const Quiz = ({ data }) => {
  const {
    user: { userType },
  } = useSelector((store) => store.auth.data);
  const dispatch = useDispatch();
  const deleteQuizFunc = (id) => {
    dispatch(deleteQuiz(id));
  };
  return (
    <div className="quizDiv">
      <div>
        <img src={data.thumbnail} alt="thumbnail" />
      </div>
      <div>
        <div>
          <p>{data.title}</p>
          <p>{data.subject}</p>
          <p>Class {data.class}</p>
          <p className="quizTime">{data.totalTime} mins</p>
        </div>
        <div>
          <p className="quizPoint">Questions : {data.noOfQuestions}</p>
          <p className="quizPoint">Points : {data.totalPoint}</p>
          {userType == "admin" || "tutor" ? (
            <button className="deleteQuiz" onClick={() => deleteQuizFunc(data._id)}>
              Delete Quiz
            </button>
          ) : (
            <button className="startQuiz">Start Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
