import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//register tutor
export const tutorRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_TUTOR_REQUEST });
    const res = await axios.post(`${url}/tutor/register`, { data, token });
    if (res.data.tutor) {
      dispatch({
        type: types.REGISTER_TUTOR_SUCCESS,
        payload: { tutor: res.data.tutor },
      });
    }
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all tutors data
export const getTutorData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_TUTOR_REQUEST });
    const res = await axios.get(`${url}/tutor/all`);
    dispatch({
      type: types.GET_TUTOR_SUCCESS,
      payload: { tutors: res.data.tutors },
    });
  } catch (error) {
    dispatch({
      type: types.GET_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete tutor
export const deleteTutor = (tutorId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_TUTOR_REQUEST });
    const res = await axios.delete(`${url}/tutor/${tutorId}`);
    dispatch({
      type: types.DELETE_TUTOR_SUCCESS,
      payload: { tutorId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//edit tutor
export const editTutor = (tutorId, data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TUTOR_REQUEST });
    const res = await axios.patch(`${url}/tutor/${tutorId}`, { data, token });
    dispatch({
      type: types.EDIT_TUTOR_SUCCESS,
      payload: { id: tutorId, tutor: res.data.tutor },
    });
  } catch (error) {
    dispatch({
      type: types.EDIT_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
