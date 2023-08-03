import React, { useEffect, useRef, useState } from "react";
import "./Content.css";
import Navbar from "../../Components/Sidebar/Navbar";
import Header from "../../Components/Header/Header";
import ContentBox from "../../Components/Content/ContentBox";
import AddIcon from "../../Components/AddIcon/AddIcon";
import { Button, Drawer, Space } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Content = () => {
  const [open, setOpen] = useState(false);
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    type: "",
  });
  const handleFormChange = () => {};

  const UploadRef = useRef();
  const WidgetRef = useRef();

  useEffect(() => {
    UploadRef.current = window.cloudinary;
    WidgetRef.current = UploadRef.current.createUploadWidget(
      {
        cloudName: "diverse",
        uploadPreset: "diverse",
        maxFiles: 1,
        clientAllowedFormats: ["pdf", "jpg", "jpeg", "mp4"],
        maxFileSize: 52445000,
      },
      function (err, result) {
        console.log(result.info);
      }
    );
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="content">
        <Header Title={"Contents"} Address={"Contents"} />
        <div className="contentData">
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
          <ContentBox />
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
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
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
            <select name="type" onChange={(e) => handleFormChange(e)}>
              <option value="">Choose Content Type</option>
              <option value="Assignment">Assignment</option>
              <option value="Project">Project</option>
              <option value="Practice">Practice</option>
            </select>
          </form>
          <button onClick={() => WidgetRef.current.open()}>Upload File</button>
        </Drawer>
      </div>
    </Navbar>
  );
};

export default Content;
