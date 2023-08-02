import React, { useState } from "react";
import "./Quizzes.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Quiz from "../../Components/Quiz/Quiz";
import { Drawer } from "antd";

const Quizzes = () => {
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const initialFormData = {
    title: "",
    thumbnail: "",
    class: "",
    subject: "",
    noOfQuestions: "",
    pointPerQuestion: "",
    negativeMarking: "No",
    negativeMarkingPerQuestion: "No",
    totalTime: "",
  };

  const questionData = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [question, setQuestion] = useState(questionData);
  const [allQuestions, setAllQuestions] = useState([]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const addQuestion = (e) => {
    e.preventDefault();
    setAllQuestions([...allQuestions, question]);
    setQuestion(questionData);
  };

  const removeQuestion = (i) => {
    setAllQuestions(allQuestions.filter((elem, index) => index != i));
  };

  const submitQuiz = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return alert("Please fill all the required fields");
      }
    }
    if (allQuestions.length === 0) {
      return alert("No questions added");
    }
    if (formData.noOfQuestions != allQuestions.length) {
      return alert(
        `You only added ${allQuestions.length} out of ${formData.noOfQuestions} questions`
      );
    }

    let obj = {
      ...formData,
      questions: allQuestions,
      totalPoint: +formData.pointPerQuestion * +formData.noOfQuestions,
      totalTime: (+formData.totalTime / 60).toFixed(2),
    };

    console.log(obj);
  };
  return (
    <Navbar>
      <div className="quizzes">
        <Header Title={"Quizzes"} Address={"Quizzes"} />
        <div className="quizData">
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
        </div>
        <div onClick={showDrawer}>
          <AddIcon />
        </div>

        <Drawer
          title="Create Quiz"
          width={520}
          closable={false}
          onClose={onClose}
          open={open}
        >
          <form>
            <input
              placeholder="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Quiz Thumbnail"
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={(e) => handleFormChange(e)}
            />
            <select name="class" onChange={(e) => handleFormChange(e)}>
              <option value="">Choose Class</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <select name="subject" onChange={(e) => handleFormChange(e)}>
              <option value="">Choose Subject</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Political science">Political science</option>
              <option value="History">History</option>
            </select>
            <input
              placeholder="No.of Questions"
              type="number"
              name="noOfQuestions"
              value={formData.noOfQuestions}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Points per question"
              type="number"
              name="pointPerQuestion"
              value={formData.pointPerQuestion}
              onChange={(e) => handleFormChange(e)}
            />
            <input
              placeholder="Total points"
              value={`Total Points : ${
                formData.noOfQuestions * formData.pointPerQuestion
              }`}
              name="totalPoints"
              onChange={(e) => handleFormChange(e)}
            />
            <select
              name="negativeMarking"
              onChange={(e) => handleFormChange(e)}
            >
              <option value="">Negative Marking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {formData.negativeMarking === "Yes" ? (
              <input
                placeholder="Negative marking per question"
                type="number"
                name="negativeMarkingPerQuestion"
                value={formData.negativeMarkingPerQuestion}
                onChange={(e) => handleFormChange(e)}
              />
            ) : (
              ""
            )}
            <input
              placeholder="Total time in Minutes"
              type="number"
              name="totalTime"
              value={formData.totalTime}
              onChange={(e) => handleFormChange(e)}
            />
          </form>
          <form onSubmit={(e) => addQuestion(e)}>
            <label>Question</label>
            <input
              required
              placeholder="Enter question"
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleQuestionChange(e)}
            />
            <label>Options</label>
            <input
              required
              placeholder="Enter Option 1"
              type="text"
              name="option1"
              value={question.option1}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 2"
              type="text"
              name="option2"
              value={question.option2}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 3"
              type="text"
              name="option3"
              value={question.option3}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              required
              placeholder="Enter Option 4"
              type="text"
              name="option4"
              value={question.option4}
              onChange={(e) => handleQuestionChange(e)}
            />
            <input
              type="Submit"
              value="Add Question"
              onChange={() => console.log("Question added")}
            />
          </form>
          <button onClick={showChildrenDrawer}>Review Questions</button>
          <br></br>
          <button onClick={() => submitQuiz()}>Submit Quiz</button>

          <Drawer
            title="Quiz Questions"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            {allQuestions?.map((ques, i) => {
              return (
                <div key={i}>
                  <h4>
                    {i + 1} .{ques.question}
                  </h4>
                  <p>1.{ques.option1}</p>
                  <p>2.{ques.option2}</p>
                  <p>3.{ques.option3}</p>
                  <p>4.{ques.option4}</p>
                  <p onClick={() => removeQuestion(i)}>Remove</p>
                </div>
              );
            })}
          </Drawer>
        </Drawer>
      </div>
    </Navbar>
  );
};

export default Quizzes;
