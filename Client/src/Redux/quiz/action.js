import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//create quiz
export const createQuiz = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_QUIZ_REQUEST });
    const res = await axios.post(`${url}/quiz/create`, { data, token });
    dispatch({
      type: types.CREATE_QUIZ_SUCCESS,
      payload: { quiz: res.data.quiz },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_QUIZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all quiz data
export const getQuizData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_QUIZ_REQUEST });
    const res = await axios.get(`${url}/quiz/all`);
    dispatch({
      type: types.GET_QUIZ_SUCCESS,
      payload: { quiz: res.data.quizzes },
    });
  } catch (error) {
    dispatch({
      type: types.GET_QUIZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete quiz
export const deleteQuiz = (quizId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_QUIZ_REQUEST });
    const res = await axios.delete(`${url}/quiz/${quizId}`);
    dispatch({
      type: types.DELETE_QUIZ_SUCCESS,
      payload: { quizId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_QUIZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
