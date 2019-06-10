import httpClient from './httpClient';

class Api {
  static async get(uri) {
    return httpClient.get(uri);
  }

  static async post(uri, data) {
    return httpClient.post(uri, data);
  }

  static async delete(uri, data) {
    return httpClient.delete(uri, { data });
  }

  static async put(uri, data) {
    return httpClient.put(uri, data);
  }

  static async patch(uri, data) {
    return httpClient.patch(uri, data);
  }
}

export default Api;
