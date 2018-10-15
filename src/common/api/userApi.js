import api from 'api/apiService';

class User {
  static signUp(user) {
    return api.post('/users', user);
  }
}

export default User;
