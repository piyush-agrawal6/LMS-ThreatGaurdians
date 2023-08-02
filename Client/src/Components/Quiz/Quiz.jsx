import React from "react";
import "./Quiz.css";

const Quiz = () => {
  return (
    <div className="quizDiv">
      <div>
        <img
          src="https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png"
          alt=""
        />
      </div>
      <div>
        <div>
          <p>Heading</p>
          <p>Subject</p>
          <p className="quizTime">Time : 1 Hour</p>
        </div>
        <div>
          <p className="quizPoint">Points : 100</p>
          <button>Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
