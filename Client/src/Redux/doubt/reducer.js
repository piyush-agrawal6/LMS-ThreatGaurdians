import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  doubt: [],
  singleDoubt: {},
};
export default function doubtReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_DOUBT_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_DOUBT_SUCCESS:
      return {
        ...state,
        doubt: [...state.doubt, payload.doubt],
      };
    case types.CREATE_DOUBT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_DOUBT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_DOUBT_SUCCESS:
      return {
        ...state,
        doubt: payload.doubt,
        load: false,
      };
    case types.GET_DOUBT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_DOUBT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_DOUBT_SUCCESS:
      return {
        ...state,
        singleDoubt: payload.doubt,
        load: false,
      };
    case types.GET_SINGLE_DOUBT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_DOUBT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_DOUBT_SUCCESS:
      return {
        ...state,
        doubt: [...state.doubt.filter((elem) => elem._id != payload.doubtId)],
        load: false,
      };
    case types.DELETE_DOUBT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };

    case types.RESOLVE_DOUBT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.RESOLVE_DOUBT_SUCCESS:
      return {
        ...state,
        doubt: state.doubt.map((elem) => {
          if (elem._id == payload.id) {
            return payload.doubt;
          }
          return elem;
        }),
        load: false,
      };
    case types.RESOLVE_DOUBT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.ADD_DOUBT_RESPONSE_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.ADD_DOUBT_RESPONSE_SUCCESS:
      return {
        ...state,
        singleDoubt: payload.doubt,
        load: false,
      };
    case types.ADD_DOUBT_RESPONSE_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
