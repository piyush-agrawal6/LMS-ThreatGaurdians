import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  quiz: [],
};
export default function quizReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_QUIZ_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: [...state.quiz, payload.quiz],
      };
    case types.CREATE_QUIZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_QUIZ_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: payload.quiz,
        load: false,
      };
    case types.GET_QUIZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_QUIZ_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: [...state.quiz.filter((elem) => elem._id != payload.quizId)],
        load: false,
      };
    case types.DELETE_QUIZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
