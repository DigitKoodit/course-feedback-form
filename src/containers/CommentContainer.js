
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputForm from '../components/InputForm';

class CommentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newComment: ''
    }
  }
  sendFeedback = () => {

  }
  handleChange = value => {
    this.setState({
      newComment: value
    });
  }

  render() {
    const { newComment } = this.state;

    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-md-8 margin-1">
          <InputForm
            content={newComment}
            onSubmit={this.sendFeedback}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

CommentContainer.propTypes = {
  activeCourse: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  newComment: state.course.newComment
})


export default connect(mapStateToProps)(CommentContainer);




