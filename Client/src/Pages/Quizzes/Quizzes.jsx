import React, { useEffect, useState } from "react";
import "./Quizzes.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Quiz from "../../Components/Quiz/Quiz";
import { Button, Drawer, Space, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz, getQuizData } from "../../Redux/quiz/action";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((store) => store.auth.data);
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { quiz, load } = useSelector((store) => store.quiz);

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
    if (formData.noOfQuestions == "") {
      return messageApi.open({
        type: "info",
        content: "Please enter the no.of questions value above",
        duration: 3,
      });
    }
    if (formData.noOfQuestions <= allQuestions.length) {
      return messageApi.open({
        type: "info",
        content: "You already added required no.of questions",
        duration: 3,
      });
    }
    setAllQuestions([...allQuestions, question]);
    setQuestion(questionData);
  };

  const removeQuestion = (i) => {
    setAllQuestions(allQuestions.filter((elem, index) => index != i));
  };

  const submitQuiz = () => {
    for (let keys in formData) {
      if (formData[keys] == "") {
        return messageApi.open({
          type: "info",
          content: "Enter all the required fields",
          duration: 3,
        });
      }
    }
    if (allQuestions.length === 0) {
      return messageApi.open({
        type: "info",
        content: "No questions were entered",
        duration: 3,
      });
    }
    if (formData.noOfQuestions > allQuestions.length) {
      return messageApi.open({
        type: "info",
        content: `You only added ${allQuestions.length} out of ${formData.noOfQuestions} questions`,
        duration: 3,
      });
    }
    if (formData.noOfQuestions < allQuestions.length) {
      return messageApi.open({
        type: "info",
        content: `You have added more than ${formData.noOfQuestions} questions, Please remove some questions`,
        duration: 3,
      });
    }

    let obj = {
      ...formData,
      questionData: allQuestions,
      totalPoint: +formData.pointPerQuestion * +formData.noOfQuestions,
      totalTime: formData.totalTime,
      creator: user.name,
    };

    console.log(obj);
    setLoading(true);
    dispatch(createQuiz(obj)).then((res) => {
      if (res.msg == "Error") {
        setLoading(false);
        messageApi.open({
          type: "info",
          content: "Error",
          duration: 3,
        });
      } else {
        setLoading(false);
        setAllQuestions([]);
        setFormData(initialFormData);
        setQuestion(questionData);
        onClose();
        return messageApi.open({
          type: "info",
          content: "Quiz Created",
          duration: 3,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getQuizData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="quizzes">
        {contextHolder}
        <Header Title={"Quizzes"} Address={"Quizzes"} />
        <div className="quizData">
          {quiz?.map((data, i) => {
            return <Quiz data={data} key={i} />;
          })}
        </div>
        {user?.userType !== "Student" ? (
          <div onClick={showDrawer}>
            <AddIcon />
          </div>
        ) : (
          ""
        )}
        <Drawer
          title="Create Quiz"
          width={520}
          closable={false}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
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
          <button className="Review" onClick={showChildrenDrawer}>
            Review Questions
          </button>
          <br></br>
          <button className="Submit" onClick={() => submitQuiz()}>
            Submit Quiz
          </button>

          <Drawer
            title="Quiz Questions"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            <p>Number of questions required : {formData.noOfQuestions || 0} </p>
            {allQuestions.length == 0 ? (
              <p>No questions added yet.</p>
            ) : (
              allQuestions?.map((ques, i) => {
                return (
                  <div key={i} className="questionDiv">
                    <h4>
                      {i + 1} .{ques.question}
                    </h4>
                    <p>1. {ques.option1}</p>
                    <p>2. {ques.option2}</p>
                    <p>3. {ques.option3}</p>
                    <p>4. {ques.option4}</p>
                    <button onClick={() => removeQuestion(i)}>Remove</button>
                  </div>
                );
              })
            )}
          </Drawer>
          {loading ? (
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
        </Drawer>
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

export default Quizzes;
