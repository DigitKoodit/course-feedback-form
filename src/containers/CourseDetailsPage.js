import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { fetchComments } from '../actions/courseActions';

class CourseDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCourse: props.activeCourse,
      comments: props.comments
    }
  }

  componentDidMount = () => {
    const { fetchComments } = this.props;
    fetchComments(this.props.activeCourse.id);
  }

  componentWillReceiveProps = nextProps => {
    this.updateComments(nextProps.comments);
  }

  updateComments = comments => {
    this.setState({
      comments
    })
  }


  render() {
    const { activeCourse, comments } = this.state;
    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-lg-6 app-card">
          <h1>Palaute</h1>
          {activeCourse &&
            <div>
              <div className="row">
                <h5>{activeCourse.moduleId}</h5>
              </div>
              <div className="row">
                <h3>{activeCourse.name}</h3>
              </div>
            </div>
          }
          <div className="row">
            <table className="comment-table">
              <tbody>
                <tr>
                  <th>Päiväys</th>
                  <th>Viesti</th>
                </tr>
                {comments.map(comment =>
                  <tr
                    key={comment.created_at}
                    className="table-row"
                  >
                    <td>{comment.created_at}</td>
                    <td>{comment.message}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div >
      </div >
    )
  }
}


CourseDetailPage.propTypes = {
  activeCourse: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    courseId: PropTypes.string,
    created_at: PropTypes.string
  }))
};

const mapStateToProps = state => ({
  activeCourse: state.course.activeCourse,
  pathname: state.routing.locationBeforeTransitions.pathname,
  comments: state.course.comments
})


export default connect(mapStateToProps, { fetchComments })(CourseDetailPage);
