import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  tutors: [],
};
export default function tutorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.REGISTER_TUTOR_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.REGISTER_TUTOR_SUCCESS:
      return {
        ...state,
        tutors: [...state.tutors, payload.tutor],
      };
    case types.REGISTER_TUTOR_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_TUTOR_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_TUTOR_SUCCESS:
      return {
        ...state,
        tutors: payload.tutors,
        load: false,
      };
    case types.GET_TUTOR_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_TUTOR_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_TUTOR_SUCCESS:
      return {
        ...state,
        tutors: [...state.tutors.filter((elem) => elem._id != payload.tutorId)],
        load: false,
      };
    case types.DELETE_TUTOR_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.EDIT_TUTOR_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.EDIT_TUTOR_SUCCESS:
      return {
        ...state,
        tutors: state.tutors.map((elem) => {
          if (elem._id == payload.id) {
            return payload.tutor;
          }
          return elem;
        }),
        load: false,
      };
    case types.EDIT_TUTOR_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
