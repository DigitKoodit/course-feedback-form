import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/courseActions';

const CourseList = ({ courses, comments, activeCourseId, fetchComments }) => {
  const handleSelect = event => {
    const selectedCourseId = event.target.value
    fetchComments(selectedCourseId);
    event.preventDefault();
  }

  const parseActiveCourseInformation = () => {
    if (activeCourseId) {
      const activeCourse = courses.find(findByCourseId);
      console.log(activeCourse);
      if (activeCourse) {
        return (
          <h3>{activeCourse.name}</h3>
        )
      }
    }
  }

  const findByCourseId = course => (
    course.id === activeCourseId
  )


  return (
    <div>
      <h2>Kursseja yhteensä: {courses.length}</h2>
      <select className="select" onChange={handleSelect}>
        {courses.map(course => (
          <option
            className="option"
            key={course.id}
            value={course.id}
          >
            {course.name}
          </option>
        ))}
      </select>
      <div>
        {parseActiveCourseInformation()}
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  })).isRequired,
  comments: PropTypes.array,
  activeCourseId: PropTypes.string
}

const mapStateToProps = state => ({
  courses: state.course.courses,
  comments: state.course.comments,
  activeCourseId: state.course.activeCourseId
})


export default connect(mapStateToProps, { fetchComments })(CourseList);
