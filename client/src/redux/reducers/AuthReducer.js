export default function (state = true, action) {
	switch (action.type) {
		case 'CHANGE_AUTH':
		  return action.payload;
	}
	return state;
}