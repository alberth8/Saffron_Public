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
    // gets popular items to display on profile page
    this.props.popular();
    this.props.signupUser(email, password);
    this.setState({
      email: '',
      password: '',
    });
    // gets userInfo to save it in the store for use by other functions
    this.props.userInfo(email, password);
  }

  onKeyPress(e) {
    const email = this.state.email;
    const password = this.state.password;
    if (e.keyCode === 13) {
      // gets popular items to display on profile page
      this.props.popular();
      // gets userInfo to save it in the store for use by other functions
      this.props.signupUser(email, password);
      // gets userInfo to save it in the store for use by other functions
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
              className="form-control" id="formGroupExampleInput"
              value={this.state.email}
              onChange={(e) => { this.onEmailChange(e); }}
            />
          </fieldset>
          <fieldset className="form-group">
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
        <button onClick={this.onSignup}>Signup</button>
        {this.props.authErrorMessage.error}
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
  popular: PropTypes.func,
};


export default connect(mapStateToProps, actions)(SignUp);
