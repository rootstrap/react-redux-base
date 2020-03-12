// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

import headers from 'fixtures/headers';
import user from 'fixtures/fakeUser';
import session from 'fixtures/headers';
import realUser from 'fixtures/realUser';
import { SUCCESS_CASE } from 'cypressConstants';
import { login, updateSession } from 'state/actions/userActions';

// Cypress image snapshot
addMatchImageSnapshotCommand({
  failureThreshold: '0.01', // threshold for entire image
  failureThresholdType: 'percent' // percent of image or number of pixels
});

Cypress.on('window:before:load', win => {
  delete win.fetch;
});

Cypress.Commands.add('stubRequest', (options, caseId = SUCCESS_CASE) => {
  const { name, cases, ...baseOptions } = options;
  const { withHeaders = true, ...caseOptions } = cases[caseId];
  const stubOptions = { ...baseOptions, ...caseOptions };

  if (withHeaders) stubOptions.headers = headers();
  stubOptions.url = `**${stubOptions.url}`;
  cy.server();
  cy.route(stubOptions).as(name);
});

Cypress.Commands.add('removeSession', () => {
  Cypress.log({ name: 'removeSession' });

  window.indexedDB.deleteDatabase('localforage');
});

Cypress.Commands.add('loginUser', () => {
  Cypress.log({ name: 'Save user and session data' });

  cy.window()
    .its('store')
    .then(store => {
      store.dispatch(updateSession(session()));
      store.dispatch(login.success(user()));
    });
});

Cypress.Commands.add('realLoginUser', () => {
  Cypress.log({ name: 'Real login user' });

  cy.request('POST', `${Cypress.env('API_URL')}/users/sign_in`, { user: realUser }).then(
    response => {
      const {
        headers,
        body: { user }
      } = response;
      const { uid, client, 'access-token': token } = headers;
      if (token) {
        const session = { token, uid, client };
        cy.window()
          .its('store')
          .then(store => {
            store.dispatch(updateSession(session));
            store.dispatch(login.success(user));
          });
      }
    }
  );
});
