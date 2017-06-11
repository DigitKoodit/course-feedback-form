
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InputForm from '../components/InputForm';
import { submitFeedback } from '../actions/courseActions';

class CommentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newComment: ''
    }
  }

  handleChange = value => {
    this.setState({
      newComment: value
    });
  }

  render() {
    const { newComment } = this.state;
    const { activeCourse, submitFeedback } = this.props;

    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-10 col-md-8 margin-1">
          <InputForm
            content={newComment}
            onSubmit={() => {
              submitFeedback(activeCourse.id, newComment)
              //FIXME: add newComment to redux state?
              this.setState({
                newComment: ''
              });
            }}
            maxCharacters={1500}
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
  }).isRequired,
  submitFeedback: PropTypes.func.isRequired
}

export default connect(state => state, { submitFeedback })(CommentContainer);




