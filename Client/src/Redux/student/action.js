import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//register student
export const studentRegister = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({ type: types.REGISTER_STUDENT_REQUEST });
    const res = await axios.post(`${url}/student/register`, data);
    if (res.data.student) {
      dispatch({
        type: types.REGISTER_STUDENT_SUCCESS,
        payload: { student: res.data.student },
      });
    }
    console.log(res.data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_STUDENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//get all students data
export const getStudentData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_STUDENT_REQUEST });
    const res = await axios.get(`${url}/student/all`);
    dispatch({
      type: types.GET_STUDENT_SUCCESS,
      payload: { students: res.data.students },
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.GET_STUDENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//delete student
export const deleteStudent = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_STUDENT_REQUEST });
    const res = await axios.delete(`${url}/student/${studentId}`);
    dispatch({
      type: types.DELETE_STUDENT_SUCCESS,
      payload: { studentId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_STUDENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//edit student
export const editStudent = (studentId, data) => async (dispatch) => {
  try {
    console.log(studentId);
    dispatch({ type: types.EDIT_STUDENT_REQUEST });
    const res = await axios.patch(`${url}/student/${studentId}`, data);
    dispatch({
      type: types.EDIT_STUDENT_SUCCESS,
      payload: { id: studentId, student: res.data.student },
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.EDIT_STUDENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};
