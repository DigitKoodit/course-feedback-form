import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { login, logout } from '../actions/authActions'
import { Router, browserHistory } from 'react-router';
import LoginForm from '../components/LoginForm';

class LoginPage extends React.Component {


  componentDidMount() {
    let authenticated = this.props.authenticated;
    let userId = this.props.userId;

    if (authenticated) {
      this.props.login(userId);
    }
  }

  render() {
    const {
      authenticated,
      login,
      logout
    } = this.props;

    return (

      <div className="login-page">
        <LoginForm
          onSubmit={login} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  userId: state.auth.userId
})

export default connect(mapStateToProps, {
  login, logout
})(LoginPage);