import React, { PropTypes } from 'react';

const CoursePicker = ({ courses, activeCourse, handleSelect }) => {

  return (
    <div className="row center-xs">
      <div className="col-xs-12 col-sm-10 col-md-8 margin-1">
        <h3 className="title">{activeCourse.name || 'Valitse kurssi'}</h3>
        <p>Kursseja yhteensä: {courses.length}</p>
        <select
          autoFocus
          className="select"
          onChange={handleSelect}
        >
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
      </div>
    </div >
  )
}

CoursePicker.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  })).isRequired,
  activeCourse: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  }).isRequired,
  handleSelect: PropTypes.func.isRequired
}

export default CoursePicker;
