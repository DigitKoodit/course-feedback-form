import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { browserHistory } from 'react-router';
import { selectActiveCourse } from '../actions/courseActions';
import Table from './SortableTable/Table.example';
import { fetchComments } from '../actions/courseActions';

class AdminPage extends Component {

  handleSelect = event => {
    const { selectActiveCourse, fetchComments, courses } = this.props;
    const selectedCourseId = event.rowData.id;
    // console.log(event.rowData.id)

    selectActiveCourse(courses.find(course => course.id === selectedCourseId));
    fetchComments(selectedCourseId);
    browserHistory.push('/admin/' + selectedCourseId);
    // if find gives no result set default course
  }

  listToImmutable = list => {
    if (list) {
      return Immutable.List(list);
    }
    return [];
  }

  render() {
    const { activeCourse, modules, courses } = this.props;
    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-lg-6 app-card">
          <h1>Kurssipalautemokkulan hallintapaneeli</h1>
          <Table
            list={this.listToImmutable(courses)}
            onItemClicked={this.handleSelect}
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
  selectActiveCourse: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activeCourse: state.course.activeCourse,
  modules: state.course.modules,
  courses: state.course.courses
})


export default connect(mapStateToProps, { selectActiveCourse, fetchComments })(AdminPage);
