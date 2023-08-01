import * as types from "./types";
const TOKEN = localStorage.getItem("token");
const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  userRegister: { loading: false, error: false, message: "" },
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
};
export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.REGISTER_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userRegister: {
          loading: false,
          error: false,
          message: payload.message,
        },
        data: {
          isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
      };
    case types.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        data: {
          isAuthenticated: false,
        },
      };
    default:
      return state;
  }
}
