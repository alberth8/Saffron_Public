import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index.js';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    const email = this.state.email;
    const password = this.state.password;
    this.props.signupUser(email, password);
    this.setState({
      email: '',
      password: '',
    });
  }

  onKeyPress(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (e.keyCode === 13) {
      this.signupUser.on(email, password);
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
      <div className="container">
        <h2>Sign Up</h2>
        <div className="row">
          <form className="col s10 m8 l6">
            <fieldset>
              <input
                type="email"
                placeholder="email"
                className="input-field"
                ref="email"
                value={this.state.email}
                onChange={(e) => { this.onEmailChange(e); }}
              />
            </fieldset>
            <fieldset>
              <input
                type="password"
                placeholder="password"
                className="input-field"
                value={this.state.password}
                onChange={(e) => { this.onPasswordChange(e); }}
                onKeyDown={(e) => { this.onKeyPress(e); }}
              />
            </fieldset>
            <button
              className="btn waves-effect waves-light btn-login"
              onClick={this.onSignup}
            >
              SignUp
            </button>
          </form>
          {this.props.authErrorMessage}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  authErrorMessage: state.authErrorMessage,
});

SignUp.propTypes = {
  signupUser: PropTypes.func,
  userInfo: PropTypes.func,
  authErrorMessage: PropTypes.string,
};


export default connect(mapStateToProps, actions)(SignUp);
