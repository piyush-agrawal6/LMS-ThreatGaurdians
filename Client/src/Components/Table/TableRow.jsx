import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Modal, message, Popconfirm } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import { deleteAdmin } from "../../Redux/admin/action";
import { useDispatch } from "react-redux";

const confirm = () => {
  message.success("Click on Yes");
};

const cancel = () => {
  message.error("Click on No");
};

const TableRow = ({ data }) => {
  const path = window.location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (path === "/admin") {
      dispatch(deleteAdmin(id));
    }
  };

  return (
    <tr className="tableRow">
      <td>{data.name}l</td>
      <td>{data.email}</td>
      <td style={{ color: data.access ? "Green" : "Red" }}>
        {data.access ? <AiFillEye /> : <AiFillEyeInvisible />}
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
        title="Delete the admin"
        description="Are you sure to delete this admin?"
        onConfirm={() => handleDelete(data._id)}
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
