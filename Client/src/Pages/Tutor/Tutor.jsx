import React, { useState } from "react";
import "./Tutor.css";
import Navbar from "../../Components/Sidebar/Navbar";
import { BiHome } from "react-icons/bi";
import Table from "../../Components/Table/Table";
import AddIcon from "../../Components/AddIcon/AddIcon";
import { Button, Drawer, Form, Input, Select, Space } from "antd";
const Tutor = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Navbar>
      <div className="admin">
        <div className="head-title">
          <div className="head-left">Tutor Data</div>
          <div className="head-right">
            <BiHome /> <p>/ Dashboard</p> <span>/ Tutor</span>
          </div>
        </div>
        <div className="adminData">
          <Table />
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
          <Form layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input
                required
                placeholder="Please enter user name"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter user email" }]}
            >
              <Input
                required
                placeholder="Please enter user name"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter user password" },
              ]}
            >
              <Input
                required
                placeholder="Please enter user name"
                type="password"
              />
            </Form.Item>
            <Form.Item
              name="access"
              label="User Access"
              rules={[{ required: true, message: "Please choose the type" }]}
            >
              <Select placeholder="Please choose the type">
                <Option value="private">Allow</Option>
                <Option value="public">Disallow</Option>
              </Select>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </Navbar>
  );
};

export default Tutor;
