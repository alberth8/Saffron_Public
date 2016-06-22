import axios from 'axios';

export function loginUser ( email, password, dispatch ) {
	return function(dispatch) {
		axios.post('api/createUser', { 
			email: email,
		    password :password 
		})	
	}
}
