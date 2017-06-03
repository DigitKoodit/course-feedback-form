import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CoursePicker from '../components/CoursePicker';
import CommentContainer from './CommentContainer';

class Home extends Component {

  constructor(props) {
    super(props);


    this.state = {
      activeCourse: this.initialActiveCourse
    }
  }

  initialActiveCourse = {
    name: '',
    id: '-1',
    credits: -1
  }

  handleSelect = event => {
    const { courses } = this.props;
    const selectedCourseId = event.target.value;
    this.setState({
      // if find gives no result set default course
      activeCourse: courses.find(course => course.id === selectedCourseId) || this.initialActiveCourse
    })
    event.preventDefault();
  }

  render() {
    const { activeCourse } = this.state;
    const { courses } = this.props;
    return (
      <div >
        <h1>Kurssipalautemokkula</h1>
        <CoursePicker
          activeCourse={activeCourse}
          courses={courses}
          handleSelect={this.handleSelect}
        />
        <CommentContainer
          activeCourse={activeCourse}
        />
      </div >
    )
  }
}

Home.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  })).isRequired
};

const mapStateToProps = state => ({
  courses: state.course.courses
})


export default connect(mapStateToProps)(Home);
