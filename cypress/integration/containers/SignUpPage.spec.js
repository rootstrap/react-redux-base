// # Example:
// [https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/integration/logging-in-html-web-form-spec.js]

import faker from 'faker';

import fakerUser from 'fixtures/fakeUser';
import { signUpStub } from 'stubs/sessionStubs';
import { FAIL_CASE } from 'cypressConstants';
import routes from 'constants/routespaths';
import fields from 'fieldDefinitions/signUpFields';
import { testFields } from 'reusableTests';

const email = faker.internet.email();
const password = faker.internet.password();
const fakeUser = fakerUser();

describe('Sign Up Page', () => {
  beforeEach(() => {
    cy.removeSession();
    cy.visit('/sign-up');
  });

  //  FOR FUTURE VISUAL REGRESSION TESTS
  // context('Visual Regression', () => {
  //   it('match image snapshot', () => {
  //     cy.reload().then(() => cy.matchImageSnapshot());
  //   });
  // });

  context('General', () => {
    it('Should see the sign up page', () => {
      cy.get('p').contains('SIGN UP');
    });

    it('Should see a link to the login page', () => {
      cy.get('a').should('have.attr', 'href', routes.login).contains('Sign in');
    });

    it('Click in the sign up link, should be redirected to the login page', () => {
      cy.get('a').should('have.attr', 'href', routes.login).click();
      cy.url().should('match', /login/);
    });
  });

  context('Form Validations', () => {
    testFields(fields);
  });

  context('Form Submission', () => {
    it('Submit failure, should display has already been taken', () => {
      cy.stubRequest(signUpStub(), FAIL_CASE);

      cy.get('input[name="email"]').type(email);
      cy.get('input[name=password]').type(password);
      cy.get('input[name=passwordConfirmation]').type(password);
      cy.get('form').submit().wait('@signUpStub');

      cy.contains('has already been taken');
    });

    it('Submit successful, should be redirected to the homepage', () => {
      cy.stubRequest(signUpStub());

      cy.get('input[name="email"]').type(fakeUser.email);
      cy.get('input[name=password]').type(password);
      cy.get('input[name=passwordConfirmation]').type(password);
      cy.get('form').submit().wait('@signUpStub');

      cy.visit(routes.login);
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
