import * as types from '../actions/actionTypes';


const initialState = {
  modules: [],
  courses: [],
  comments: [],
  newComment: '',
  activeCourseId: ''
}

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_COURSES:
    case types.REQUEST_COMMENTS:
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
    case types.REQUEST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        activeCourseId: action.activeCourseId
      };
    default:
      return state;
  }
}
