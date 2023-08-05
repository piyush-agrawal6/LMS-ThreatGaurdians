import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  content: [],
  singleContent: {},
};
export default function contentReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.CREATE_CONTENT_ERROR:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_CONTENT_SUCCESS:
      return {
        ...state,
        content: [...state.content, payload.content],
      };
    case types.CREATE_CONTENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_CONTENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_CONTENT_SUCCESS:
      return {
        ...state,
        content: payload.content,
        load: false,
      };
    case types.GET_CONTENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_CONTENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_CONTENT_SUCCESS:
      return {
        ...state,
        singleContent: payload.content,
        load: false,
      };
    case types.GET_SINGLE_CONTENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_CONTENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_CONTENT_SUCCESS:
      return {
        ...state,
        content: [
          ...state.content.filter((elem) => elem._id != payload.contentId),
        ],
        load: false,
      };
    case types.DELETE_CONTENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
