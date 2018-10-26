// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('fetchVisit', (url) => {
  Cypress.log({ name: 'Fetch visit' });

  // In order to stub http requests
  return cy.visit(url, { onBeforeLoad: (win) => { win.fetch = null; } });
});

Cypress.Commands.add('logUser', ({ user }, session) => {
  Cypress.log({ name: 'Save user data' });

  const localforage = require('localforage');
  const storage = localforage.createInstance({ name: 'redux-react-session' });
  storage.setItem('USER-SESSION', session);
  storage.setItem('USER_DATA', user);
});

Cypress.Commands.add('removeSession', () => {
  window.indexedDB.deleteDatabase('redux-react-session');
});

Cypress.Commands.add('mockResponse', (method, url, response, alias) => {
  cy.server();
  cy.fixture('respHeader.json').then((headers) => {
    cy.route({ method, url, response, headers }).as(alias);
  });
});
