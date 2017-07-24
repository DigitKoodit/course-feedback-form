import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
// import { Column, Table, AutoSizer } from 'react-virtualized';
import CoursePicker from '../components/CoursePicker';
import CommentContainer from './CommentContainer';
import { selectActiveCourse } from '../actions/courseActions';
import Table from './SortableTable/Table.example';
import { SortDirection } from 'react-virtualized';


const list = [
  { index: 1, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 2, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 3, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 4, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 5, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 6, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 7, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 8, name: 'Brian Vaughn', description: 'Software engineer' },
  { index: 9, name: 'Brian Vaughn', description: 'Software engineer' }
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
