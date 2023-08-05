import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTutorData, tutorRegister } from "../../Redux/tutor/action";

//component imports
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import AddIcon from "../../Components/AddIcon/AddIcon";
import TutorRow from "../../Components/Table/TutorRow";

//css imports
import { Button, Drawer, Space, Spin, message } from "antd";
import "./Tutor.css";

const Tutor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { tutors, load } = useSelector((store) => store.tutor);

  //loading state
  const [loading, setLoading] = useState(false);

  //alert api antd
  const [messageApi, contextHolder] = message.useMessage();

  //drawer states
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //form states
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    subject: "",
  };
  const [FormData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (FormData.subject == "") {
      return messageApi.open({
        type: "info",
        content: "Please select Subject",
        duration: 3,
      });
    }
    setLoading(true);
    dispatch(tutorRegister(FormData))
      .then((res) => {
        console.log(res);
        if (res.msg === "User already registered") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User already registered",
            duration: 3,
          });
        } else if (res.msg === "Tutor Registration failed") {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "Tutor Registration failed",
            duration: 3,
          });
        } else {
          setLoading(false);
          setFormData(initialFormData);
          onClose();
          messageApi.open({
            type: "success",
            content: "Tutor Registered Successfully",
            duration: 3,
          });
          messageApi.open({
            type: "success",
            content: "Password sent over mail.",
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getTutorData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="admin">
        <Header Title={"Tutor Data"} Address={"Tutor"} />
        <div className="adminData">
          <section className="tableBody">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Access</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tutors?.map((data, i) => {
                  return <TutorRow data={data} key={i} />;
                })}
              </tbody>
            </table>
          </section>
        </div>
        <div onClick={showDrawer}>
          <AddIcon />
        </div>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          {contextHolder}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              required
              name="name"
              type="text"
              value={FormData.name}
              placeholder="Enter Name"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              required
              name="email"
              type="email"
              value={FormData.email}
              placeholder="Enter Email"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              required
              name="password"
              type="password"
              value={FormData.password}
              placeholder="Enter Password"
              onChange={(e) => handleInputChange(e)}
            />
            <select name="subject" onChange={(e) => handleInputChange(e)}>
              <option value="">Choose Subject</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Political science">Political science</option>
              <option value="History">History</option>
            </select>
            <input type="submit" value="Add Tutor" />
          </form>
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

export default Tutor;
