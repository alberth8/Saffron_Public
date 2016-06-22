import React from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
// import { LoginUser } from '../../redux/actions/LoginUser.js';
import * as actions from '../../redux/actions/index.js';

class Login extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onLogin = this.onLogin.bind(this);
	}

  onLogin() {
    let email = this.state.email;
    let password = this.state.password;
    console.log(this.props.loginUser)
    this.props.loginUser(email, password,)
    this.setState({
      email: '',
      password: ''
    })
    
  }
  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  onEmailChange(e){
    this.setState({
      email: e.target.value
    })
  }

  render() {
  	return (
  	  <div>
  	    <form>
          <fieldset class="form-group">
            <label for="formGroupExampleInput">Email</label>
            <input type="email" className="form-control" id="formGroupExampleInput"
            value={ this.state.email }
            onChange={ (e) => {this.onEmailChange(e)} }>
            </input>
          </fieldset>
          <fieldset class="form-group">
            <label for="formGroupExampleInput2">Password</label>
            <input type="text" className="form-control" id="formGroupExampleInput2"
            value={ this.state.password }
            onChange={ (e) => {this.onPasswordChange(e)} }>
            </input>
          </fieldset>
        </form>
        <button onClick={ this.onLogin }>Login</button>
  	  </div>
  	);
  }

}

const mapStateToProps = function(state, ownProps) {
	return {

	};
}

// const mapDispatchToProps = function(dispatch) {
// 	return bindActionCreators({ LoginUser }, dispatch); 
//  }


export default connect(mapStateToProps, actions)(Login)