import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//create doubt
export const createDoubt = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DOUBT_REQUEST });
    const res = await axios.post(`${url}/doubt/create`, data);
    dispatch({
      type: types.CREATE_DOUBT_SUCCESS,
      payload: { doubt: res.data.doubt },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_DOUBT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_DOUBT_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/doubt/add`, { id, desc });
    dispatch({
      type: types.ADD_DOUBT_RESPONSE_SUCCESS,
      payload: { doubt: res.data.doubt },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_DOUBT_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all doubts data
export const getDoubtData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOUBT_REQUEST });
    const res = await axios.get(`${url}/doubt/all`);
    dispatch({
      type: types.GET_DOUBT_SUCCESS,
      payload: { doubt: res.data.doubt },
    });
  } catch (error) {
    dispatch({
      type: types.GET_DOUBT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single doubt data
export const getSingleDoubtData = (doubtId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_DOUBT_REQUEST });
    const res = await axios.get(`${url}/doubt/${doubtId}`);
    dispatch({
      type: types.GET_SINGLE_DOUBT_SUCCESS,
      payload: { doubt: res.data.doubt },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_DOUBT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete doubt
export const deleteDoubt = (doubtId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DOUBT_REQUEST });
    const res = await axios.delete(`${url}/doubt/${doubtId}`);
    dispatch({
      type: types.DELETE_DOUBT_SUCCESS,
      payload: { doubtId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_DOUBT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//resolve doubt
export const resolveDoubt = (doubtId) => async (dispatch) => {
  try {
    dispatch({ type: types.RESOLVE_DOUBT_REQUEST });
    const res = await axios.patch(`${url}/doubt/${doubtId}`, {
      resolved: "Yes",
    });
    dispatch({
      type: types.RESOLVE_DOUBT_SUCCESS,
      payload: { id: doubtId, doubt: res.data.doubt },
    });
  } catch (error) {
    dispatch({
      type: types.RESOLVE_DOUBT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
