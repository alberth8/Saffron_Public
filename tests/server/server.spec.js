const expect = require('chai').expect;
const axios = require('axios');
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
      axios.post('http://localhost:8888/api/updateIngredients', {
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

  // describe('api/addRecipe endpoint', () => {
  //   it('returns status 200', (done) => {
  //     axios.post(`${url}/api/addRecipe`, {})
  //       .then((response) => {
  //         expect(response.status).to.equal(200);
  //         done(); // done() is a callback to deal with async
  //       })
  //       .catch((e) => console.error(e));
  //     });
  // });

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
  //   const url = 'http://localhost:8888';
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
