import React, { PropTypes } from 'react';
import Select from 'react-select';

// TODO: replace select with somethign more customizable. Select box looks hideous on Firefow
// FIXME: selection doesn't change after feedback has been submitted
const CoursePicker = ({ modules, courses, activeCourse, handleSelect }) => {
  const options = [];
  modules.map(module => {
    options.push({
      label: module.name,
      value: module.id,
      disabled: true
    });
    courses.filter(course => course.moduleId === module.id)
      .map(course => {
        options.push({
          label: course.name,
          value: course.id
        })
      })
  })
  const clearable = false;
  const searchable = true;
  const disabled = false;

  return (
    <div className="row center-xs">
      <div className="col-xs-12 col-sm-10 col-md-8 margin-1">
        <h3 className="title">{activeCourse.name || 'Valitse kurssi'}</h3>
        <p>Kursseja yhteensä: {courses.length}</p>
        <Select
          className="select"
          autofocus
          options={options}
          simpleValue
          clearable={clearable}
          name="selected-course"
          disabled={disabled}
          value={options.filter(item => item.value === activeCourse.id)
            .map(selectedCourse => selectedCourse.value)[0]}
          onChange={handleSelect}
          searchable={searchable}
        />
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
