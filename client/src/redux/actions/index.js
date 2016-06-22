import axios from 'axios';

export function loginUser ( email, password, dispatch ) {
	return function(dispatch) {
		axios.post('/login', { 
			email: email,
		    password :password 
		})	
	}
}

export function signupUser (email, password, dispatch) {
	return function(dispatch) {
		axios.post('/api/signup', {
			email: email,
			password: password
		})
	}
}
