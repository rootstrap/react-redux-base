// # Example:
// [https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/integration/logging-in-html-web-form-spec.js]

import faker from 'faker';
import fakerUser from 'fixtures/fakeUser';

const email = faker.internet.email();
const password = faker.internet.password();
const fakeUser = fakerUser();

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.removeSession();
    cy.goToRoute('/sign-up');
    // cy.fetchVisit('/');
    // cy.get('a').should('have.attr', 'href', '/sign-up').click();
  });

  //  FOR FUTURE VISUAL REGRESSION TESTS
  // context('Visual Regression', () => {
  //   it('match image snapshot', () => {
  //     cy.reload().then(() => cy.matchImageSnapshot());
  //   });
  // });

  context('General', () => {
    it('should see the sign up page', () => {
      cy.get('p').contains('SIGN UP');
    });

    it('should see a link to the login page', () => {
      cy.get('a').should('have.attr', 'href', '/login').contains('Sign in');
    });

    it('click in the sign up link, should be redirected to the login page', () => {
      cy.get('a').should('have.attr', 'href', '/login').click();
      cy.url().should('match', /login/);
    });
  });

  context('Form Errors', () => {
    it('displays empty email error', () => {
      cy.get('form').within(() => {
        cy.get('input[name=password]').type('password123');
        cy.get('input[name=passwordConfirmation]').type('password123{enter}');
      });

      cy.contains('You must enter an email to continue');
    });

    it('displays empty password error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('janelae@test.com');
        cy.get('input[name=passwordConfirmation]').type('password123{enter}');
      });

      cy.contains('You must enter a password to continue');
    });

    it('displays empty password confirmation error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('janelae@test.com');
        cy.get('input[name=password]').type('password123{enter}');
      });

      cy.contains('You must enter a password confirmation to continue');
    });

    it('displays invalid email error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('janelae');
        cy.get('input[name=password]').type('password123');
        cy.get('input[name=password]').type('password123{enter}');
      });

      cy.get('span').contains('You must enter a valid email');
    });

    it('displays password and password confirmation don\'t match error', () => {
      cy.get('form').within(() => {
        cy.get('input[name="email"]').type('janelae@test.com');
        cy.get('input[name=password]').type('password123');
        cy.get('input[name=passwordConfirmation]').type('password{enter}');
      });

      cy.contains('Your password confirmation must be equal to the password');
    });
  });

  context('Form Submission', () => {
    it.only('submit failure, should display has already been taken', () => {
      cy.stubSignUp(true);

      cy.get('input[name="email"]').type(email);
      cy.get('input[name=password]').type(password);
      cy.get('input[name=passwordConfirmation]').type(password);
      cy.get('form').submit().wait('@signUpStubFailure');

      cy.contains('has already been taken');
    });

    it('submit successful, should be redirected to the homepage', () => {
      cy.stubSignUp();

      cy.get('input[name="email"]').type(fakeUser.email);
      cy.get('input[name=password]').type(password);
      cy.get('input[name=passwordConfirmation]').type(password);
      cy.get('form').submit().wait('@signUpStub');

      cy.goToRoute('/login');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
