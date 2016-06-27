// environment variables
require('dotenv').config({ path: './server/config/dev.env' });

// deubgging Bookshelf
process.stderr.on('data', (data) => {
  console.log(data);
});

const express = require('express');
const app = express();
const ingredientsRoutes = require('./routes/ingredientsRoutes.js');
const addRecipeRoutes = require('./routes/addRecipeRoutes.js');
const recipesRoutes = require('./routes/recipesRoutes.js');
const userProfileRoutes = require('./routes/userProfileRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

// morgan, body-parser, static files
require('./config/init.js')(app, express);

// set port
app.set('port', process.env.PORT || 3000);

// page specific routes
ingredientsRoutes(app);
recipesRoutes(app);
userProfileRoutes(app);
authRoutes(app);
addRecipeRoutes(app);

// wildcard route
app.get('/*', (req, res) => res.redirect('/'));

// bind and listen to connections on specified port
app.listen(app.get('port'), () => {
  console.log(`Express server started in 
     ${app.get('env')} mode on port ${app.get('port')}`);
});

module.exports = app;
