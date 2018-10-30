describe('Home Page', () => {
  beforeEach(() => {
    cy.mockResponse('DELETE', '**/users/sign_out', {}, 'logoutStub');
    cy.logUser().then(() => {
      cy.fetchVisit('/');
    });
  });

  context('Visual Regression', () => {
    it('match image snapshot', () => {
      cy.matchImageSnapshot();
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
      cy.get('button').click().wait('@logoutStub');
      cy.url().should('match', /login/);
    });
  });
});
