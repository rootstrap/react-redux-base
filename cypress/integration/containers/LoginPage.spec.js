// # Example:
// [https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/integration/logging-in-html-web-form-spec.js]

import faker from 'faker';
import fakerUser from 'fixtures/fakeUser';
import { loginStub } from 'stubs/sessionStubs';
import { FAIL_CASE } from 'cypressConstants';
import fields from 'fieldDefinitions/loginFields';
import { testFields } from 'reusableTests';

const email = faker.internet.email();
const password = faker.internet.password();
const fakeUser = fakerUser();

describe('Login Page (Real Response)', () => {
  beforeEach(() => {
    cy.removeSession();
    cy.visit('/');
  });

  //  FOR FUTURE VISUAL REGRESSION TESTS
  // context('Visual Regression', () => {
  //   it('match image snapshot', () => {
  //     cy.reload().then(() => cy.matchImageSnapshot());
  //   });
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

  context('Form Validations', () => {
    testFields(fields);
  });

  context('Form Submission', () => {
    it('submit failure, should display invalid credentials', () => {
      cy.stubRequest(loginStub(), FAIL_CASE);

      cy.get('input[name="email"]').type(email);
      cy.get('input[name=password]').type(password);
      cy.get('form').submit().wait('@loginStub');

      cy.get('strong').contains('Invalid login credentials. Please try again.');
    });

    it('submit successful, should be redirected to the homepage', () => {
      cy.stubRequest(loginStub());

      cy.get('input[name="email"]').type(fakeUser.email);
      cy.get('input[name=password]').type(password);
      cy.get('form').submit().wait('@loginStub');

      cy.visit('/login');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
