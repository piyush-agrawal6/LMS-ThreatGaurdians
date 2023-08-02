import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Modal, message, Popconfirm } from "antd";

const confirm = () => {
  message.success("Click on Yes");
};

const cancel = () => {
  message.error("Click on No");
};

const TableRow = ({ Name, Email, Access }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <tr className="tableRow">
      <td>Piyush Agrawal</td>
      <td>agrawaljoy1@gmail.com</td>
      <td style={{ color: Access ? "Green" : "Red" }}>
        {Access ? <AiFillEye /> : <AiFillEyeInvisible />}
      </td>
      <td onClick={showModal}>Edit</td>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <input placeholder="Name" />
          <input placeholder="Email" />
          <p>Access : Allowed</p>
          <select>
            <option>Toggle access</option>
            <option>Allow</option>
            <option>Disallow</option>
          </select>
        </form>
      </Modal>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <td>Delete</td>
      </Popconfirm>
    </tr>
  );
};

export default TableRow;
