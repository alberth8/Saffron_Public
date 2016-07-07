import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index.js';
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.email).focus();
  }

  onLogin(e) {
    const email = this.state.email;
    const password = this.state.password;
    e.preventDefault();
    // gets userInfo to save it in the store for use by other functions
    this.props.userInfo(email);
    // gets popular items to display on profile page
    this.props.popular();
    // logs user in
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
      this.onLogin(e, email, password);
      this.props.popular();
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
      <div className="container">
        <h2>Login</h2>
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
              onClick={(e) => { this.onLogin(e); }}
            >
              Login
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

Login.propTypes = {
  loginUser: PropTypes.func,
  userInfo: PropTypes.func,
  authErrorMessage: PropTypes.string,
  popular: PropTypes.func,
};

export default connect(mapStateToProps, actions)(Login);
