import * as types from '../actions/actionTypes';


const initialState = {
  courses: [],
  comments: [],
  activeCourseId: ''
}

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_COURSES:
    case types.REQUEST_COMMENTS:
      return state;
    case types.REQUEST_COURSES_SUCCESS:
      console.log(action.comments);
      return {
        ...state,
        courses: action.courses
      };
    case types.REQUEST_COMMENTS_SUCCESS:
      console.log(action.comments);
      return {
        ...state,
        comments: action.comments,
        activeCourseId: action.activeCourseId
      };
    default:
      return state;
  }
}
