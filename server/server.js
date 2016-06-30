// environment variables
require('dotenv').config({ path: './server/config/dev.env' });

// deubgging Bookshelf
process.stderr.on('data', (data) => {
  console.log(data);
});

const express = require('express');
const ingredientsRoutes = require('./routes/ingredientsRoutes.js');
const addRecipeRoutes = require('./routes/addRecipeRoutes.js');
const recipesRoutes = require('./routes/recipesRoutes.js');
const userProfileRoutes = require('./routes/userProfileRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const recRoutes = require('./routes/recRoutes.js');
const seedRoute = require('./routes/seedRoute.js');

const app = express();
// morgan, body-parser, static files
require('./config/init.js')(app, express);

// set port
console.log(process.env.PORT);
app.set('port', process.env.PORT || 3000);

// create routes per page
recRoutes(app);
ingredientsRoutes(app);
recipesRoutes(app);
userProfileRoutes(app);
authRoutes(app);
addRecipeRoutes(app);
seedRoute(app);

// wildcard route
app.get('/*', (req, res) => res.redirect('/'));

// bind and listen to connections on specified port
app.listen(app.get('port'), () => {
  console.log(`Express server started in ${app.get('env')} mode on port ${app.get('port')}`);
});

module.exports = app;
