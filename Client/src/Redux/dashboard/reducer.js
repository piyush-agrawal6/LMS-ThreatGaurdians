import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  dashboard: {},
};
export default function dashboardReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: payload.dashboard,
        load: false,
      };
    case types.GET_DASHBOARD_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
