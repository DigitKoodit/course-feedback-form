import React, { PropTypes } from 'react';

// TODO: replace select with somethign more customizable. Select box looks hideous on Firefow
// FIXME: selection doesn't change after feedback has been submitted
const CoursePicker = ({ modules, courses, activeCourse, handleSelect }) => {

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
          {modules.map(module => (
            <optgroup
              key={module.id}
              label={module.name}
            >
              {courses.map(course => {
                if (course.moduleId === module.id) {
                  return (
                    <option
                      key={course.id}
                      className="option"
                      value={course.id}
                    >
                      {course.name}
                    </option>
                  )
                }
              })}
            </optgroup>
          ))}
        </select>
      </div>
    </div >
  )
}

CoursePicker.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired,
    moduleId: PropTypes.string.isRequired
  })).isRequired,
  activeCourse: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  }).isRequired,
  handleSelect: PropTypes.func.isRequired
}

export default CoursePicker;
