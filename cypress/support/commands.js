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

// Cypress image snapshot
addMatchImageSnapshotCommand({
  failureThreshold: '0.01', // threshold for entire image
  failureThresholdType: 'percent' // percent of image or number of pixels
});

Cypress.Commands.add('fetchVisit', (url) => {
  Cypress.log({ name: 'Fetch visit' });

  return cy.visit(url);
});

Cypress.on('window:before:load', (win) => {
  delete win.fetch;
});

Cypress.Commands.add('mockResponse', (method, url, alias, status, response = null, withHeaders = true) => {
  const mockOptions = { method, url, status };

  if (withHeaders) {
    mockOptions.headers = headers();
    cy.mockCallToServer(mockOptions, response, alias);
  } else {
    cy.mockCallToServer(mockOptions, response, alias);
  }
});

Cypress.Commands.add('mockCallToServer', (mockOptions, response, alias) => {
  if (response) {
    mockOptions.response = response;
  }
  cy.server();
  cy.route(mockOptions).as(alias);
});
