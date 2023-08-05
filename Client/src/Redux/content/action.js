import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//create content
export const createContent = (data) => async (dispatch) => {
  console.log("called")
  try {
    dispatch({ type: types.CREATE_CONTENT_REQUEST });
    const res = await axios.post(`${url}/content/create`, data);
    dispatch({
      type: types.CREATE_CONTENT_SUCCESS,
      payload: { content: res.data.content },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_CONTENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//get all content data
export const getContentData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CONTENT_REQUEST });
    const res = await axios.get(`${url}/content/all`);
    dispatch({
      type: types.GET_CONTENT_SUCCESS,
      payload: { content: res.data.content },
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.GET_CONTENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//get single content data
export const getSingleContentData = (contentId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_CONTENT_REQUEST });
    const res = await axios.get(`${url}/content/${contentId}`);
    dispatch({
      type: types.GET_SINGLE_CONTENT_SUCCESS,
      payload: { content: res.data.content },
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_CONTENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};

//delete content
export const deleteContent = (contentId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CONTENT_REQUEST });
    const res = await axios.delete(`${url}/content/${contentId}`);
    dispatch({
      type: types.DELETE_CONTENT_SUCCESS,
      payload: { contentId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CONTENT_ERROR,
      payload: {
        message: "error",
      },
    });
    console.log(error);
  }
};
