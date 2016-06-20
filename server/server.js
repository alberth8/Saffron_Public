const express = require('express');
const app = express();
const router = require('./routes.js');

// morgan, body-parser
require('./config/init.js')(app, express);

// set port
app.set('port', process.env.PORT || 3000);

// wildcard route
app.get('/*', function (req, res) {
	res.redirect('/');
});

app.listen(app.get('port'), () => {
	console.log('Express server started in ' 
		+ app.get('env') + ' mode on port ' 
		+ app.get('port'));
});

module.exports = app;


// *
// reference router
// app.use('/', router)

// app.route('/')
// 	.get((req, res) => {
// 		res.end();
// 		//res.sendFile(__dirname + '/../client/public/index.html');
// 	})

// app.route('/user/')
// 	.get()
// 	.post((req, res) => {
// 	});

// app.route('/recipes/')
// 	.get()
// 	.post((req, res) => {
// 	});

// app.route('/ingredients/')
// 	.get()
// 	.post((req, res) => {
// 	});