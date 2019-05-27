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
import localForage from 'localforage';

import headers from 'fixtures/headers';
import user from 'fixtures/fakeUser';
import { SUCCESS_CASE } from 'cypressConstants';

const storage = localForage.createInstance({ name: 'redux-react-session' });

// Cypress image snapshot
addMatchImageSnapshotCommand({
  failureThreshold: '0.01', // threshold for entire image
  failureThresholdType: 'percent' // percent of image or number of pixels
});

Cypress.on('window:before:load', (win) => {
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

Cypress.Commands.add('logUser', () => {
  Cypress.log({ name: 'Save user data' });

  storage.setItem('USER-SESSION', headers({ mockingServer: false }));
  storage.setItem('USER_DATA', user());
});

Cypress.Commands.add('removeSession', () => {
  window.indexedDB.deleteDatabase('redux-react-session');
});
