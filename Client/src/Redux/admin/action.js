import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//register admin
export const adminRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_ADMIN_REQUEST });
    const res = await axios.post(`${url}/admin/register`, data);
    dispatch({
      type: types.REGISTER_ADMIN_SUCCESS,
      payload: { admin: res.data.admin },
    });
    console.log(res.data)
    return res.data;
  } catch (error) {
    dispatch({
      type: types.REGISTER_ADMIN_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//get all admins data
export const getAdminData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADMIN_REQUEST });
    const res = await axios.get(`${url}/admin/all`);
    dispatch({
      type: types.GET_ADMIN_SUCCESS,
      payload: { admins: res.data.admins },
    });
  } catch (error) {
    dispatch({
      type: types.GET_ADMIN_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//delete admin
export const deleteAdmin = (adminId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ADMIN_REQUEST });
    const res = await axios.delete(`${url}/admin/${adminId}`);
    dispatch({
      type: types.DELETE_ADMIN_SUCCESS,
      payload: { adminId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_ADMIN_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//edit admin
export const editAdmin = (adminId, data) => async (dispatch) => {
  try {
    console.log(adminId);
    dispatch({ type: types.EDIT_ADMIN_REQUEST });
    const res = await axios.patch(`${url}/admin/${adminId}`, data);
    dispatch({
      type: types.EDIT_ADMIN_SUCCESS,
      payload: { id: adminId, admin: res.data.admin },
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.EDIT_ADMIN_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};
