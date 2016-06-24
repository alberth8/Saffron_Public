const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'saffron',
    charset: 'utf8',
  },
});

// create connection
const db = require('bookshelf')(knex);

// crucial: handles circular dependencies of the join tables
db.plugin('registry');

// Define schema below. Relationships described in models.
db.knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('password', 200);
    }).then((table) => {
      console.log('Created table `users`', table);
    });
  }
});

db.knex.schema.hasTable('recipes').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('recipes', (recipe) => {
      recipe.increments('id').primary();
      recipe.string('recipeTitle', 100);
      recipe.string('recipeUrl', 300);
      recipe.string('recipeImgUrl', 300);
      recipe.boolean('favorited');
    }).then((table) => {
      console.log('Created table `recipes`', table);
    });
  }
});

db.knex.schema.hasTable('ingredients').then((exists) => {
  if (!exists) {
    db.knex.schema.createTable('ingredients', (ingredient) => {
      ingredient.increments('id').primary();
      ingredient.string('ingredient', 50);
    }).then((table) => {
      console.log('Created table `ingredients`', table);
    });
  }
});

module.exports = db;
