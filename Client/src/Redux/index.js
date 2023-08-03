import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import adminReducer from "./admin/reducer";
export const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});
