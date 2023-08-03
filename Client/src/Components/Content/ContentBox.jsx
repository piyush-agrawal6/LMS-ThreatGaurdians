import React from "react";
import "./ContentBox.css";

const ContentBox = () => {
  return (
    <div className="contentDiv">
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
        </div>
        <div>
          <button>Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default ContentBox;
