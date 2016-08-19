# Saffron

> Creative cuisine for your tired routine!  Saffron helps cooks find new and interesting combinations of ingredients to spice up their dinner routines.  Pick a few ingredients you already have, and we'll suggest the best next ingredients to use!


## Team

  - __Product Owner__: Albert Han
  - __Scrum Master__: Shane Hubbell
  - __Full Stack Development Team Members__: Daniel Rabinovich, Aezed Raza, Albert Han, Shane Hubbell
 

## Table of Contents

1. [Usage](#usage)
1. [System Architecture](#system-architecture)
1. [Preview](#preview)
1. [Technologies](#technologies)
1. [Microservices](#microservices)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)
1. [License](#license)


## Usage

> Saffron was built out of our frustration - how do you easily discover new recipes and ingredients on the go?  We scraped thousands of recipes and aggregated those recipe and ingredient combinations to suggest ingredients to users.  

> Here's how it works:  A user enters "selected" ingredients into the app, we find ALL the recipes which contain those ingredients, then suggest the next most likely ingredients to maximize your recipe options.  

> We track collective user behavior and use machine learning algorithms to predict which recipes you're likely to love.  We hope you enjoy using the application, and welcome contributors to this project.


## System Architecture

![System Architecture](https://github.com/alberth8/Saffron_Public/blob/master/sysArch2.png)


## Preview

Landing page:
![Landing page](https://github.com/alberth8/Saffron_Public/blob/master/landingPage.png)

Ingredients & Recipes page:
![IngredeintsRecipe](https://github.com/alberth8/Saffron_Public/blob/master/SPA.png)


## Technologies

**Front end**
- React Redux
- Materialize, CSS
- Webpack

**Back end**
- Node
- Express
- Bookshelf/Knex
- MySQL
- Passport

**Testing**
- Mocha
- Chai


## Microservices

- [Web scraper](https://github.com/AquaticPidgeon/recipe-scraper) built by aezed
- [Ingredients pairing service](https://github.com/alberth8/PairingService) built by alberth8

## Development

1. Start and login to your MySql server

   ```bash
   $ mysql.server start
   $ mysql -u root -p
   ```

2. Create saffron database

   ```bash
   $ create database saffron;
   ```

3. Run server to create database

   ```bash
   $ nodemon server/server.js
   ```

4. Seed database

   ```bash
   $ node server/db/seedData/seed.js
   ```

5. Start webpack

   ```bash
   $ webpack -w
   ```

6. Navigate to http://127.0.0.1:8888 in a browser to access the client app. 

### Installing Dependencies

From within the root directory:

```bash
$ sudo npm install -g bower
$ npm install
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
