// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('loginByForm', (user) => {
  Cypress.log({
    name: 'login',
    message: 'login by form'
  });

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('api_url')}/users/sign_in`,
    form: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Factory: 'hangar'
    },
    body: user
  }).then(({ allRequestResponses }) => {
    // Save user data into indexedbd (sessionApi.saveUser functionality)
    const respHeaders = allRequestResponses[0]['Response Headers'];
    const { user } = allRequestResponses[0]['Response Body'];
    const token = respHeaders['access-token'];
    const { uid, client } = respHeaders;

    const localforage = require('localforage');

    const storage = localforage.createInstance({ name: 'redux-react-session' });
    storage.setItem('USER-SESSION', { token, uid, client });
    storage.setItem('USER_DATA', user);
  });
});
