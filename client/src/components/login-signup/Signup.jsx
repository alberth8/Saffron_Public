import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index.js';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onSignup = this.onSignup.bind(this);
    
	}

	onSignup() {
    let email = this.state.email;
    let password = this.state.password;
    console.log(email);
    this.props.signupUser(email, password,)
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
        <button onClick={ this.onSignup }>Signup</button>  	  
  	  </div>
  	);
  }

}

const mapStateToProps = function(state, ownProps) {
	return {

	};
}


export default connect(mapStateToProps, actions)(SignUp)