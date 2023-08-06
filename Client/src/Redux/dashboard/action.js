import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//get all dashboard data
export const getDashboardData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DASHBOARD_REQUEST });
    const res = await axios.get(`${url}/dashboard/all`);
    dispatch({
      type: types.GET_DASHBOARD_SUCCESS,
      payload: { dashboard: res.data.dashboard },
    });
    console.log(res.data)
  } catch (error) {
    dispatch({
      type: types.GET_DASHBOARD_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
