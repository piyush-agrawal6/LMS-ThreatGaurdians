import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import adminReducer from "./admin/reducer";
import tutorReducer from "./tutor/reducer";
import studentReducer from "./student/reducer";
import quizReducer from "./quiz/reducer";
import contentReducer from "./content/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  tutor: tutorReducer,
  student: studentReducer,
  quiz: quizReducer,
  content: contentReducer,
});
