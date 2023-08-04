import * as types from "./types";
const TOKEN = localStorage.getItem("token");
const initialState = {
  load: false,
  error: false,
  admins: [],
};
export default function adminReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.REGISTER_ADMIN_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.REGISTER_ADMIN_SUCCESS:
      return {
        ...state,
        admins: [...state.admins, payload.admin],
      };
    case types.REGISTER_ADMIN_REQUEST:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_ADMIN_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_ADMIN_SUCCESS:
      return {
        ...state,
        admins: payload.admins,
        load: false,
      };
    case types.GET_ADMIN_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_ADMIN_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        admins: [...state.admins.filter((elem) => elem._id != payload.adminId)],
        load: false,
      };
    case types.DELETE_ADMIN_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.EDIT_ADMIN_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.EDIT_ADMIN_SUCCESS:
      return {
        ...state,
        admins: state.admins.map((elem) => {
          if (elem._id == payload.id) {
            return payload.admin;
          }
          return elem;
        }),
        load: false,
      };
    case types.EDIT_ADMIN_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
