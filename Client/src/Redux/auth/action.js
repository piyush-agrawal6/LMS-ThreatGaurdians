import * as types from "./types";
import axios from "axios";

//send otp
export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://outrageous-hoodie-jay.cyclic.app/user/new`,
      userData
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

//Register User
export const checkOTP = (form) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://outrageous-hoodie-jay.cyclic.app/user/register`,
      form
    );
    if (data.data.message === "user registered successfully") {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: {
          token: data.data.token,
          message: data.data.message,
          user: data.data.user,
        },
      });
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

//Register User by google sign in
export const googleRegister = (form) => async (dispatch) => {
  try {
    const data = await axios.post(
      `https://outrageous-hoodie-jay.cyclic.app/user/googleregister`,
      form
    );
    if (data.data.message === "user registered successfully") {
      dispatch({
        type: types.REGISTER_USER_SUCCESS,
        payload: {
          token: data.data.token,
          message: data.data.message,
          user: data.data.user,
        },
      });
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

//login
export const authLogin = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://outrageous-hoodie-jay.cyclic.app/user/login",
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//logout
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
