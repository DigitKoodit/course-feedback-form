
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


  handleChange = value => {
    this.setState({
      newComment: value
    });
  }

  render() {
    const { newComment } = this.state;

    return (
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-8 col-md-6 margin-1">
          <InputForm
            content={newComment}
            onSubmit={() => console.log('hellou')}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )
  }
}

CommentContainer.propTypes = {
}

const mapStateToProps = state => ({
  newComment: state.course.newComment
})


export default connect(mapStateToProps)(CommentContainer);




