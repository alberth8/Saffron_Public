const express = require('express');
const app = express();

require('./config/middleware.js')(app, express);

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../client/public/'));
// setup API routes
app.route('/')
	.get((req, res) => {
		res.sendFile(__dirname + '/../client/public/index.html');
	})

// app.route('/*')
// 	.get((req, res) => {
// 		res.redirect('/');
// 	})


app.listen(app.get('port'), () => {
	console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
})

module.exports = app;
