import fetch from 'isomorphic-fetch';
import * as session from '../services/sessionService';
import { browserHistory } from 'react-router';
import humps from 'humps';

const handleErrors = (response) =>
  new Promise((resolve, reject) => {
    if (!response) {
      reject({ message: 'No response returned from fetch' });
      return;
    }

    if (response.ok) {
      const sessionHeaders = getSessionHeaders(response.headers);
      const { token, uid, client } = sessionHeaders;
      console.log(sessionHeaders);
      if (token && uid && client) {
        saveSessionHeaders(response.headers);
        resolve(response);
      } else {
        reject({ message: 'Invalid token provided from the api' });
      }
      return;
    }

    session.isLogged()
    .catch(() => {
      if (response.status === 401) {
        session.deleteSession();
        browserHistory.replace('/login');
        return;
      }
    });

    response.json()
      .then(json => {
        const error = humps.camelizeKeys(json) || { message: response.statusText };
        reject(error);
      }).catch(() => reject({ message: 'Response not JSON' }));
    }
  );

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204;
  if (bodyIsEmpty) {
    return Promise.resolve();
  }
  return humps.camelizeKeys(response.json());
};

const getSessionHeaders = (headers) => {
  const sessionHeaders = {
    token: headers.get('access-token'),
    uid: headers.get('uid'),
    client: headers.get('client')
  };
  return sessionHeaders;
}

const saveSessionHeaders = (headers) => {
  return session.saveSession(getSessionHeaders(headers));
};

class Api {

  performRequest(uri, requestData = {}) {
    return new Promise((resolve, reject) => {
      fetch(uri, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  addTokenHeader(requestData) {
    return session.isLogged()
    .then(session => {
      const { token, client, uid } = session;
      requestData.headers['access-token'] = token;
      requestData.headers['client'] = client;
      requestData.headers['uid'] = uid;
      return requestData;
    }).catch(() => requestData);
  }

  get(uri) {
    let requestData = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    };
    return this.addTokenHeader(requestData)
    .then(data => {
      return this.performRequest(uri, data);
    });
  }

  post(uri, data) {
    const decamelizeData = humps.decamelizeKeys(data);
    let requestData = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
    .then(data => {
      return this.performRequest(uri, data);
    });
  }

  delete(uri, data) {
    const decamelizeData = humps.decamelizeKeys(data);
    let requestData = {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
    .then(data => {
      return this.performRequest(uri, data);
    });
  }

  put(uri, data) {
    const decamelizeData = humps.decamelizeKeys(data);
    let requestData = {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
    .then(data => {
      return this.performRequest(uri, data);
    });
  }

  patch(uri, data) {
    const decamelizeData = humps.decamelizeKeys(data);
    let requestData = {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return this.addTokenHeader(requestData)
    .then(data => {
      return this.performRequest(uri, data);
    });
  }
}

export default new Api();
