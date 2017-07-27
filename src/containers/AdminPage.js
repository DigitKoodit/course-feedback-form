import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { selectActiveCourse } from '../actions/courseActions';
import Table from './SortableTable/Table.example';


const list = [
  { index: 1, name: 'Sami Nieminen', random: 'Software engineer' },
  { index: 2, name: 'Brian Vaughn', random: 'Software engineer' },
  { index: 3, name: 'Marine Amison', random: 'Software engineer' },
  { index: 4, name: 'Samara Berrier', random: 'Software engineer' },
  { index: 5, name: 'Soo Reiling', random: 'Software engineer' },
  { index: 6, name: 'Buddy Panos', random: 'Software engineer' },
  { index: 7, name: 'Zelma Mayers', random: 'Software engineer' },
  { index: 8, name: 'Shyla Mable', random: 'Software engineer' },
  { index: 9, name: 'Kristie Yard', random: 'Software engineer' },
  { index: 9, name: 'Jonas Curci', random: 'Software engineer' }
  // And so on...
];
const immutableList = Immutable.List(list);

class AdminPage extends Component {

  handleSelect = event => {
    const { selectActiveCourse, courses } = this.props;
    const selectedCourseId = event.target.value;

    // if find gives no result set default course
    selectActiveCourse(courses.find(course => course.id === selectedCourseId));

    event.preventDefault();
  }

  render() {
    const { activeCourse, modules, courses } = this.props;
    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 app-card">
          <h1>Kurssipalautemokkulan hallintapaneeli</h1>
          <Table
            list={immutableList}
          />
        </div >
      </div >
    )
  }
}

AdminPage.propTypes = {
  activeCourse: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  }).isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  })).isRequired,
  selectActiveCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activeCourse: state.course.activeCourse,
  modules: state.course.modules,
  courses: state.course.courses
})


export default connect(mapStateToProps, { selectActiveCourse })(AdminPage);
