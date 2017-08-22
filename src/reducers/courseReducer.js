import * as types from '../actions/actionTypes';


const initialState = {
  modules: [],
  courses: [],
  comments: [],
  activeCourse: {
    id: 'DIGIT_COURSE',
    name: 'Yleistä',
    credits: 0,
    moduleId: 'DIGIT'
  }
}

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_COURSES:
    case types.REQUEST_FEEDBACKS:
    case types.REQUEST_MODULES:
      return state;
    case types.REQUEST_MODULES_SUCCESS:
      return {
        ...state,
        modules: action.modules
      };
    case types.REQUEST_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.courses
      };
    case types.REQUEST_FEEDBACK_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        activeCourseId: action.activeCourseId
      };
    case types.SELECT_ACTIVE_COURSE:
      return {
        ...state,
        activeCourse: action.activeCourse
      }
    case types.SUBMIT_FEEDBACK:
    case types.SUBMIT_FEEDBACK_SUCCESS:
    case types.SELECT_ACTIVE_COURSE_FAIL:
      return {
        ...state,
        activeCourse: initialState.activeCourse
      }
    default:
      return state;
  }
}
