import ApiService from './apiService';

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';

export default new ApiService({
  baseUrl: process.env.API_URL,
  headers: { accept: APPLICATION_JSON, [CONTENT_TYPE]: APPLICATION_JSON }
});
