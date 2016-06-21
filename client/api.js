import axios from 'axios';

const api = {
  getIngredients(event, ingredient) {
    return axios.get('http://localhost:3000/api/ingredients');
  },

  getLoginStatus() {
    return axios.get('http://localhost:3000/checklogin');
  },
};

export default api;
