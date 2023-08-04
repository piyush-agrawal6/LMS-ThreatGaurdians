import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//register tutor
export const tutorRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_TUTOR_REQUEST });
    const res = await axios.post(`${url}/tutor/register`, data);
    if (res.data.tutor) {
      dispatch({
        type: types.REGISTER_TUTOR_SUCCESS,
        payload: { tutor: res.data.tutor },
      });
    }
    console.log(res.data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
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
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.GET_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
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
    console.log(error);
  }
};

//edit tutor
export const editTutor = (tutorId, data) => async (dispatch) => {
  try {
    console.log(tutorId);
    dispatch({ type: types.EDIT_TUTOR_REQUEST });
    const res = await axios.patch(`${url}/tutor/${tutorId}`, data);
    dispatch({
      type: types.EDIT_TUTOR_SUCCESS,
      payload: { id: tutorId, tutor: res.data.tutor },
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.EDIT_TUTOR_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};
