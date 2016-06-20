const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '123',
    database : 'test1',
    charset  : 'utf8'
  }
});

// create connection
const db = require('bookshelf')(knex);

// Define schema below. Relationships described in models.
db.knex.schema.hasTable('users').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
    }).then( (table) => {
      console.log('Created table `users`', table);
    });
  }
});

db.knex.schema.hasTable('recipes').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('recipes', (recipe) => {
      recipe.increments('id').primary();
      recipe.string('recipe_url', 300);
      recipe.string('recipe_img_url', 300);
    }).then( (table) => {
      console.log('Created table `recipes`', table)
    });
  }
});

db.knex.schema.hasTable('ingredients').then( (exists) => {
  if (!exists) {
    db.knex.schema.createTable('ingredients', (ingredient) => {
      ingredient.increments('id').primary();
      ingredient.string('ingredient', 50);
    }).then( (table) => {
      console.log('Created table `ingredients`', ingredient);
    });
  }
});