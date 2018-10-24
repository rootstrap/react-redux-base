// # Example:
// [https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/integration/logging-in-html-web-form-spec.js]

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // after(() => {
  //   // remove session saved in indexedDB
  //   window.indexedDB.deleteDatabase('redux-react-session');
  // });

  context('Redirections', () => {
    it('successfully redirected when user not logged in', () => {
      cy.url().should('match', /login/);
    });

    it('should see the login page', () => {
      cy.get('p').contains('LOGIN');
    });

    it('should see a link to the sign up page', () => {
      cy.get('a').should('have.attr', 'href', '/sign-up').contains('Sign up');
    });

    it('click in the sign up link, should be redirected to the sign up page', () => {
      cy.get('a').should('have.attr', 'href', '/sign-up').click();
      cy.url().should('match', /sign-up/);
    });
  });

  context('Form Errors', () => {
    it('displays empty email error', () => {
      cy.get('form').within(() => {
        cy.get('input[name=password]').type('password123{enter}');
      });

      cy.get('span').contains('You must enter an email to continue');
    });

    it('displays empty password error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('janelae@test.com{enter}');
      });

      cy.get('span').contains('You must enter a password to continue');
    });

    it('displays invalid email error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('janelae');
        cy.get('input[name=password]').type('password123');
      });

      cy.get('span').contains('You must enter a valid email');
    });
  });

  context('Form Submission', () => {
    it('enter an invalid email or password, should see a global error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('testwrongmail@rootstrap.com');
        cy.get('input[name=password]').type('1234');
      });
      cy.get('form').submit().then(() => cy.get('strong').contains('Invalid login credentials. Please try again.'));
    });

    it('submit successfull, should be redirected to the homepage', () => {
      cy.fixture('user.json').as('user').then(({ user: { email, password } }) => {
        cy.get('form').within(() => {
          cy.get('input[name="email"]').type(email);
          cy.get('input[name=password]').type(password);
        });
        cy.get('form').submit().then(() => cy.url().should('eq', `${Cypress.config().baseUrl}/`));
      });
    });
  });
});
