import React, { PropTypes } from 'react';

const CoursePicker = ({ courses, activeCourse, handleSelect }) => {

  return (
    <div className="row center-xs">
      <div className="col-xs-12 col-sm-8 col-md-6 margin-1">
        <h2>Kursseja yhteensä: {courses.length}</h2>
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
        <div>
          <h3>{activeCourse.name || 'Valitse kurssi'}</h3>
        </div>
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
