import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CoursePicker from '../components/CoursePicker';
import CommentContainer from './CommentContainer';
import { selectActiveCourse } from '../actions/courseActions';
import Snackbar from '../components/Snackbar';

class Home extends Component {

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
          <h1>Kurssipalautemokkula</h1>
          <CoursePicker
            activeCourse={activeCourse}
            modules={modules}
            courses={courses}
            handleSelect={this.handleSelect}
          />
          <CommentContainer
            activeCourse={activeCourse}
          />
        </div >
      </div >
    )
  }
}

Home.propTypes = {
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


export default connect(mapStateToProps, { selectActiveCourse })(Home);
