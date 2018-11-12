/// <reference types="Cypress" />

describe('Home Page (Real Response)', () => {
  beforeEach(() => {
    cy.realLogUser().then(() => {
      cy.fetchVisit('/');
    });
  });

  context('Homepage View', () => {
    it('displays a welcome message', () => {
      cy.get('p').contains('Welcome to React Redux Base');
    });

    it('should see the logged out button', () => {
      cy.get('button').contains('LOGOUT');
    });

    it('click in the logout button,should be redirected to the login path', () => {
      cy.get('button').click();
      cy.url().should('match', /login/);
    });
  });
});

describe('Home Page (Mock Response)', () => {
  beforeEach(() => {
    cy.fakeLogUser().then(() => {
      cy.fetchVisit('/');
    });
  });

  context('Homepage View', () => {
    it('displays a welcome message', () => {
      cy.get('p').contains('Welcome to React Redux Base');
    });

    it('should see the logged out button', () => {
      cy.get('button').contains('LOGOUT');
    });

    it('click in the logout button,should be redirected to the login path', () => {
      const mockWithHeader = true;
      cy.mockResponse('DELETE', '**/users/sign_out', 'logoutStub', 200, mockWithHeader, { status: 'ok' });
  
      cy.get('button').click().wait('@logoutStub');
      cy.url().should('match', /login/);
    });
  });
});