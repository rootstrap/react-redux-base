import axios from 'axios';
import humps from 'humps';
import { sessionService } from 'redux-react-session';

const client = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  transformRequest: [
    data => humps.decamelizeKeys(data),
  ],
  transformResponse: [
    data => humps.camelizeKeys(data),
  ],
});

client.interceptors.request.use(async (request) => {
  const { token, client, uid } = await sessionService.loadSession();
  request.headers = {
    'access-token': token,
    client,
    uid,
  };
  return request;
}, (error) => {
  console.log(error); // Or do another thing
  return Promise.reject(error);
});

client.interceptors.response.use(async (response) => {
  const { headers: { accessToken, uid, client } } = response;

  if (accessToken && uid && client) {
    await sessionService.saveSession({ token: accessToken, uid, client });
  }

  return response;
}, async (error) => {
  const session = await sessionService.loadSession();

  if (error.request.status === 401 && session) {
    sessionService.deleteSession();
    sessionService.deleteUser();
  }
  return Promise.reject(error);
});

export default client;
