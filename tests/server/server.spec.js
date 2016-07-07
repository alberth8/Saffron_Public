const expect = require('chai').expect;
const should = require('chai').should;
const axios = require('axios');
// TODO: need environment variables
const url = 'http://localhost:8888';

describe('Saffron API', () => {
  describe('api/updateIngredients endpoint', () => {
    it('returns status 200', (done) => {
      axios.post(`${url}/api/updateIngredients`, {})
        .then((response) => {
          expect(response.status).to.equal(200);
          done(); // done() is a callback to deal with async
        })
        .catch((e) => console.error(e));
      });

    it('responds to POSTs with recipes and suggested ingredients', (done) => {
      axios.post(`${url}/api/updateIngredients`, {
        selectedIngredients: ['sugar', 'cream'],
        userID: 1,
      }).then((response) => {
          expect(response.data.suggestedIngredients).to.be.a('array');
          expect(response.data.recipes).to.be.a('array');
          done(); // done() is a callback to deal with async
        })
        .catch((e) => console.error(e));
      });
  });

  describe('api/addRecipe endpoint', () => {
    it('should return turns status 200 and data should have stored properly', (done) => {
      axios.post(`${url}/api/addRecipe`, {
        recipeTitle: 'Pasta with Corn, Pea Tendrils, Prosciutto, and Summer Savory',
        recipeUrl: 'https://food52.com/recipes/59048-pasta-with-corn-pea-tendrils-prosciutto-and-summer-savory',
        recipeImgUrl: 'https://images.food52.com/n5lW5qDZ1SRqR94BrbkIgoh53jI=/753x502/97c68049-'
                        + '113f-49b2-a085-d79958e0004d--2016-0705'
                        + '_pasta-with-pancetta-guanciale-bacon-and-vegetables'
                        + '_james-ransom-276.jpg',
        recipeIngredients: 'pasta, butter, olive oil, prosciutto, scallions, pea tendrils, ' +
                             'basil, parmigiano reggiano, salt, pepper',
      })
        .then((response) => {
          expect(response.status).to.equal(200);
          done(); // done() is a callback to deal with async
        })
        .catch((e) => console.error(e));
    });
  });

  // describe('api/getFav endpoint', () => {
  //   it('returns status 200', (done) => {
  //     axios.post(`${url}/api/saveFav`, {})
  //       .then((response) => {
  //         expect(response.status).to.equal(200);
  //         done(); // done() is a callback to deal with async
  //       })
  //       .catch((e) => console.error(e));
  //     });
  // });

  // describe('api/getFavs endpoint', () => {
  //   it('returns status 200', (done) => {
  //     axios.post(`${url}/api/getFavs`, {})  // why is this a post?
  //       .then((response) => {
  //         expect(response.status).to.equal(200);
  //         done(); // done() is a callback to deal with async
  //       })
  //       .catch((e) => console.error(e));
  //     });
  // });

  // describe('api/fetchData endpoint', () => {
  //   it('returns status 200', (done) => {
  //     axios.post(`${url}/api/fetchData`, {})
  //       .then((response) => {
  //         expect(response.status).to.equal(200);
  //         done(); // done() is a callback to deal with async
  //       })
  //       .catch((e) => console.error(e));
  //     });
  // });

});
