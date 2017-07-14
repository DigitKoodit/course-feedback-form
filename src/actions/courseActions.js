import axios from 'axios';
import * as types from './actionTypes';

import { displaySnackbar } from './uiActions';
import dummyModules from '../dummyModules';
import dummyCourses from '../dummyCourses';
import dummyComments from '../dummyComments';

export const fetchModules = () => dispatch => {
  dispatch({
    type: types.REQUEST_MODULES
  });

  axios.get('http://localhost:3037/api/modules')
    .then(response => {
      const modules = response.data;
      dispatch({
        type: types.REQUEST_MODULES_SUCCESS,
        modules
      })
    })

  // const modules = dummyModules;
}

export const fetchCourses = () => dispatch => {
  dispatch({
    type: types.REQUEST_COURSES
  });

  axios.get('http://localhost:3037/api/courses')
    .then(response => {
      const courses = response.data.sort((a, b) => compareAlphabetically(a.name, b.name));
      dispatch({
        type: types.REQUEST_COURSES_SUCCESS,
        courses
      })
    });
  // const courses = dummyCourses.sort((a, b) => compareAlphabetically(a.name, b.name));
}

// Fetch all comments but filter course by id.
// Use 'MATE5398' or other ids listed on dummyComments.json

export const fetchComments = courseId => dispatch => {
  dispatch({
    type: types.REQUEST_FEEDBACKS
  });

  //TODO: fetch comment by given courseId

  const comments = dummyComments.filter(comment => comment.courseId === courseId)
    .sort((a, b) => compareAlphabetically(a.courseId, b.courseId));

  dispatch({
    type: types.REQUEST_FEEDBACKS_SUCCESS,
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

export const selectActiveCourse = activeCourse => dispatch => {
  if (!activeCourse) {
    dispatch({
      type: types.SELECT_ACTIVE_COURSE_FAIL
    })
  } else {
    dispatch({
      type: types.SELECT_ACTIVE_COURSE,
      activeCourse
    })
  }
}

export const submitFeedback = (courseId, feedback) => dispatch => {
  if (courseId && feedback && feedback.length > 0) {
    axios({
      method: 'POST',
      url: 'http://localhost:3037/api/feedback',
      data: {
        courseId,
        message: feedback,
        year: 2017
      }
    }).then(result => {
      if (result.data.error) {
        console.log(result.data.error);
        displaySnackbar('Jokin meni pieleen. Kokeile uudestaan!')(dispatch);
        dispatch({
          type: types.SUBMIT_FEEDBACK_FAIL
        })
      } else {
        displaySnackbar('Kiitos palautteestasi!')(dispatch);
        dispatch({
          type: types.SUBMIT_FEEDBACK_SUCCESS
        })
      }
    })
    .catch(err => {
      // Catch any result codes than 200
      console.log(err);
      displaySnackbar('Jokin meni pieleen. Kokeile uudestaan!')(dispatch);
      dispatch({
        type: types.SUBMIT_FEEDBACK_FAIL
      })
    })
    // setTimeout(() => {
    //   displaySnackbar('Kiitos palautteestasi!')(dispatch);
    //   dispatch({
    //     type: types.SUBMIT_FEEDBACK_SUCCESS
    //   })
    // }, 500)
  }
}
