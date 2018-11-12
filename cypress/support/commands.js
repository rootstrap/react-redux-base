import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import fakerUser from '../fixtures/fakers/fakeUser';
import fakerSessionUser from '../fixtures/fakers/fakeSessionUser';

const localForage = require('localforage');

const storage = localForage.createInstance({ name: 'redux-react-session' });

// Cypress image snapshot
addMatchImageSnapshotCommand({
  failureThreshold: '0.01', // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
});

Cypress.Commands.add('fetchVisit', (url) => {
  Cypress.log({ name: 'Fetch visit' });

  // In order to: stub http requests, support not index url cy.visit
  const { indexUrl } = Cypress.config();

  cy.visit(indexUrl, { onBeforeLoad: (win) => {
    win.fetch = null;
  } }).then((win) => { 
    if (url !== indexUrl) { 
      win.location.href = url;
    }
  });
});

Cypress.Commands.add('saveReduxSession', (session, user) => {
  storage.setItem('USER-SESSION', session);
  storage.setItem('USER_DATA', user);
});

Cypress.Commands.add('fakeLogUser', () => {
  Cypress.log({ name: 'Fake login' });
  const fakeUser = fakerUser();
  const fakeSession = fakerSessionUser(fakeUser.uid);
  cy.saveReduxSession(fakeSession, fakeUser);
});

Cypress.Commands.add('realLogUser', () => {
  Cypress.log({ name: 'Real login' });

  cy.fixture('realUserLogin.json').as('user').then((user) => {
    cy.request('POST', `${Cypress.env('apiUrl')}/users/sign_in`, user).then((response) => {
      const { headers, body: { user } } = response;
      const token = headers['access-token'];
      const { uid, client } = headers;
      if (token) {
        const session = { token, uid, client };
        cy.saveReduxSession(session, user);
      }
    });
  });
});

Cypress.Commands.add('removeSession', () => {
  window.indexedDB.deleteDatabase('redux-react-session');
});

Cypress.Commands.add('getSessionData', () => {
  return new Cypress.Promise((resolve, reject) => {
    storage.getItem('USER-SESSION').then((headers) => {
      resolve(headers);
    }).catch(() => {
      reject();
    });
  });
});

Cypress.Commands.add('mockResponse', (method, url, alias, status, withHeaders = true, response = null) => {
  const mockOptions = { method, url, status };

  if (withHeaders) {
    cy.getSessionData().then((headers) => {
      if (!headers) {
        // If there isn't any previous session data, that is because we are mocking a login.
        const { user } = response;
        const fakeSession = fakerSessionUser(user.uid);
        cy.saveReduxSession(fakeSession, user);
      } else {
        mockOptions.headers = headers;
      }

      cy.mockCallToServer(mockOptions, response, alias);
    });
  }
  // cy return automatically its responses
  cy.mockCallToServer(mockOptions, response, alias);
});

Cypress.Commands.add('mockCallToServer', (mockOptions, response, alias) => {
  if (response) {
    mockOptions.response = response;
  }
  cy.server();
  cy.route(mockOptions).as(alias);
});
