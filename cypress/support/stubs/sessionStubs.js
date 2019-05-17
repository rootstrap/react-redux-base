
import user from 'fixtures/fakeUser';
import headers from 'fixtures/headers';

const localForage = require('localforage');

const storage = localForage.createInstance({ name: 'redux-react-session' });

// HELPERS
Cypress.Commands.add('logUser', () => {
  Cypress.log({ name: 'Save user data' });

  storage.setItem('USER-SESSION', headers({ mockingServer: false }));
  storage.setItem('USER_DATA', user());
});

Cypress.Commands.add('removeSession', () => {
  window.indexedDB.deleteDatabase('redux-react-session');
});

Cypress.Commands.add('mockResponseLoginHeaders', (method, url, response, alias) => {
  cy.server();
  cy.route({ method, url, response, headers: headers() }).as(alias);
});

// STUBS
Cypress.Commands.add('stubSignUp', (fail = false) => {
  if (fail) {
    cy.mockResponse(
      'POST',
      '**/users',
      'signUpStubFailure',
      422,
      { errors: { email: ['has already been taken'] } },
      false
    );
  } else {
    cy.mockResponseLoginHeaders('POST', '**/users', { user: user({ complete: false }) }, 'signUpStub');
  }
});

Cypress.Commands.add('stubLogin', (fail = false) => {
  if (fail) {
    cy.mockResponse('POST', '**/users/sign_in', 'loginStubFailure', 401, { errors: 'Invalid login credentials. Please try again.' }, false);
  } else {
    cy.mockResponseLoginHeaders('POST', '**/users/sign_in', { user: user() }, 'loginStub');
  }
});

Cypress.Commands.add('stubProfile', (customUser) => {
  cy.mockResponse('GET', '**/user/profile', 'profileStub', 200, { user: customUser || user() });
});

Cypress.Commands.add('stubLogout', () => {
  cy.mockResponse('DELETE', '**/users/sign_out', 'logoutStub', 200, { status: 'ok' });
});
