import fetch from 'isomorphic-fetch';
import { sessionService } from 'redux-react-session';
import humps from 'humps';
import merge from 'lodash/merge';

import routes from 'constants/routesPaths';

function hasSession() {
  return sessionService.loadSession()
    .then(() => true)
    .catch(() => false);
}

function getResponseBody(response) {
  const bodyIsEmpty = response.status === 204;
  return bodyIsEmpty ? Promise.resolve() : response.json();
}

async function saveSession({ headers }) {
  if (headers.get('access-token')) {
    const sessionData = {
      token: headers.get('access-token'),
      uid: headers.get('uid'),
      client: headers.get('client')
    };

    return sessionService.saveSession(sessionData);
  }
}

async function handleErrorResponse(response) {
  if (response.status === 401 && await hasSession()) {
    await sessionService.deleteSession();
    window.location = routes.login;
  }

  let error;

  try {
    const json = await response.json();
    error = json || new Error(response.statusText);
  } catch (e) {
    error = new Error('Response not JSON');
  }

  throw humps.camelizeKeys(error);
}

async function handleSuccessResponse(response) {
  await saveSession(response);
  const body = getResponseBody(response);
  return humps.camelizeKeys(body);
}

async function handleResponse(response) {
  if (!response) {
    throw new Error('No response returned from fetch');
  }

  return response.ok ? handleSuccessResponse(response) : handleErrorResponse(response);
}

async function getTokenHeaders() {
  let headers;

  try {
    const { token, client, uid } = await sessionService.loadSession();
    headers = { 'access-token': token, client, uid };
  } catch (e) {
    headers = {};
  }

  return headers;
}

class Api {
  constructor(defaultRequestConfig = {}) {
    this.defaultRequestConfig = defaultRequestConfig;
  }

  async buildRequestConfig(requestConfig = {}, addTokenHeaders = true) {
    // Start with default config
    let config = merge({}, this.defaultRequestConfig);

    // Add Token headers if necessary
    if (addTokenHeaders) {
      const headers = await getTokenHeaders();
      config = merge({}, config, { headers });
    }

    // Apply request specific config
    config = merge({}, config, requestConfig);

    // TODO: Check merge mutable nature!!!
    return config;
  }

  async performRequest(uri, apiUrl, requestConfig = {}, addTokenHeaders = true) {
    const url = `${apiUrl}${uri}`;
    const config = await this.buildRequestConfig(requestConfig, addTokenHeaders);
    const response = await fetch(url, config);
    return handleResponse(response);
  }

  get(uri, apiUrl = process.env.API_URL) {
    const requestData = {
      method: 'get',
    };
    return this.performRequest(uri, apiUrl, requestData);
  }

  post(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'post',
      body: JSON.stringify(decamelizeData)
    };
    return this.performRequest(uri, apiUrl, requestData);
  }

  delete(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'delete',
      body: JSON.stringify(decamelizeData)
    };
    return this.performRequest(uri, apiUrl, requestData);
  }

  put(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'put',
      body: JSON.stringify(decamelizeData)
    };
    return this.performRequest(uri, apiUrl, requestData);
  }

  patch(uri, data, apiUrl = process.env.API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'patch',
      body: JSON.stringify(decamelizeData)
    };
    return this.performRequest(uri, apiUrl, requestData);
  }
}

export default new Api({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
