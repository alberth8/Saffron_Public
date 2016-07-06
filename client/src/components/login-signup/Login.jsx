import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const email = this.state.email;
    const password = this.state.password;
    this.props.userInfo(email);
    this.props.popular();
    this.props.loginUser(email, password);
    this.setState({
      email: '',
      password: '',
    });
  }

  onKeyPress(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (e.keyCode === 13) {
      this.onLogin(email, password);
      this.props.popular();
      this.props.userInfo(email, password);
    }
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form>
          <fieldset className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.email}
              onChange={(e) => { this.onEmailChange(e); }}
            />

          </fieldset>
          <fieldset
            className="form-group"
          >
            <label>Password</label>
            <input
              type="text"
              className="form-control" id="formGroupExampleInput2"
              value={this.state.password}
              onChange={(e) => { this.onPasswordChange(e); }}
              onKeyDown={(e) => { this.onKeyPress(e); }}
            />
          </fieldset>
        </form>
        <button onClick={this.onLogin}>Login</button>
        {this.props.authErrorMessage}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  authErrorMessage: state.authErrorMessage,
});

Login.propTypes = {
  loginUser: PropTypes.func,
  userInfo: PropTypes.func,
  authErrorMessage: PropTypes.string,
  popular: PropTypes.func,
};

export default connect(mapStateToProps, actions)(Login);
