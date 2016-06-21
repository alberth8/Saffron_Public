const express = require('express');
const app = express();
// const router = require('./routes.js');
const ingredientsRoutes = require('./routes/ingredientsRoutes.js');
const recipesRoutes = require('./routes/recipesRoutes.js');
const userProfileRoutes = require('./routes/userProfileRoutes.js');

// morgan, body-parser
require('./config/init.js')(app, express);

// set port
app.set('port', process.env.PORT || 3000);

// create routes per page
ingredientsRoutes(app);
recipesRoutes(app);
userProfileRoutes(app);

// (*)

// wildcard route
app.get('/*', function (req, res) {
	res.redirect('/');
});

// bind and listen to connections on specified port
app.listen(app.get('port'), () => {
	console.log('Express server started in ' 
		+ app.get('env') + ' mode on port ' 
		+ app.get('port'));
});

// (*)
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