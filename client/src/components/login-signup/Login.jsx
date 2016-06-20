import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);

	}

  onLogin() {

  }

  render() {
  	return (
  	  <div>
  	    <form>
          <fieldset class="form-group">
            <label for="formGroupExampleInput">Username</label>
            <input type="text" className="form-control" id="formGroupExampleInput"></input>
          </fieldset>
          <fieldset class="form-group">
            <label for="formGroupExampleInput2">Password</label>
            <input type="text" className="form-control" id="formGroupExampleInput2"></input>
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

const mapDispatchToProps = function(dispatch) {
	return {

	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)