import * as types from "./types";
import axios from "axios";

//login user
export const adminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    const res = await axios.post(
      "https://zany-gray-clam-gear.cyclic.app/nurses/login",
      data
    );
    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//login user
export const tutorLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_TUTOR_REQUEST });
    const res = await axios.post(
      "https://zany-gray-clam-gear.cyclic.app/doctors/login",
      data
    );
    console.log(res.data);
    dispatch({
      type: types.LOGIN_TUTOR_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_TUTOR_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//login user
export const studentLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_STUDENT_REQUEST });
    const res = await axios.post(
      "https://zany-gray-clam-gear.cyclic.app/admin/login",
      data
    );
    console.log(res.data);
    dispatch({
      type: types.LOGIN_STUDENT_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_STUDENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// logout user
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
