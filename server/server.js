const express = require('express');
const app = express();
require('./config/middleware.js')(app, express);

app.set('port', process.env.PORT || 3000);

// setup API routes
app.route('/')
	.get((req, res) => {
		res.send('Hello World!')
	})

app.route('/user/')
	.get()
	.post((req, res) => {
	});

app.route('/recipes/')
	.get()
	.post((req, res) => {
	});

app.route('/ingredients/')
	.get()
	.post((req, res) => {
	});

app.listen(app.get('port'), () => {
	console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
})

module.exports = app;