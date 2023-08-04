import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  students: [],
};
export default function studentReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.REGISTER_STUDENT_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.REGISTER_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students, payload.student],
      };
    case types.REGISTER_STUDENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_STUDENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_STUDENT_SUCCESS:
      return {
        ...state,
        students: payload.students,
        load: false,
      };
    case types.GET_STUDENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_STUDENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students.filter((elem) => elem._id != payload.studentId)],
        load: false,
      };
    case types.DELETE_STUDENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.EDIT_STUDENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map((elem) => {
          if (elem._id == payload.id) {
            return payload.student;
          }
          return elem;
        }),
        load: false,
      };
    case types.EDIT_STUDENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
