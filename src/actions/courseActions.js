import * as types from './actionTypes';

import dummyCourses from '../dummyCourses';
import dummyComments from '../dummyComments';

export const fetchCourses = () => dispatch => {
  dispatch({
    type: types.REQUEST_COURSES
  });

  const courses = dummyCourses.sort((a, b) => compareAlphabetically(a.name, b.name));

  dispatch({
    type: types.REQUEST_COURSES_SUCCESS,
    courses
  })
}

// Fetch all comments but filter course by id.
// Use 'MATE5398' or other ids listed on dummyComments.json

export const fetchComments = courseId => dispatch => {
  dispatch({
    type: types.REQUEST_COMMENTS
  });

  //TODO: fetch comment by given courseId

  const comments = dummyComments.filter(comment => comment.courseId === courseId)
    .sort((a, b) => compareAlphabetically(a.courseId, b.courseId));

  console.log(dummyComments);

  dispatch({
    type: types.REQUEST_COMMENTS_SUCCESS,
    activeCourseId: courseId,
    comments
  })
}

const compareAlphabetically = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}
