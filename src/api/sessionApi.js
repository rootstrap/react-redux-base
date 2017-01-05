import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class Session {
  static login(user) {
    return api.post(`${consts.API_URL}/users/sign_in`, user);
  }

  static logout() {
    return api.delete(`${consts.API_URL}/users/sign_out`);
  }
}

export default Session;
