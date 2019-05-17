const headers = ({
  mockingServer = true,
  token = 'vis26ywltF9LwQkRfpI7xg',
  uid = 'test@rootstrap.com',
  client = '3g4Z3JuoJOrychY-yQQw-w'
} = {}) => ({
  [mockingServer ? 'access-token' : 'token']: token,
  uid,
  client
});

export default headers;
