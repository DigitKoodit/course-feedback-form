import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Column, Table, AutoSizer } from 'react-virtualized';
import CoursePicker from '../components/CoursePicker';
import CommentContainer from './CommentContainer';
import { selectActiveCourse } from '../actions/courseActions';
import Table from './SortableTabel/Table.example';


const list = [
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' },
  { name: 'Brian Vaughn', description: 'Software engineer' }
  // And so on...
];

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
            list={list}
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
