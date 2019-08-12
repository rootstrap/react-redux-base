// # Example:
// [https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__html-web-forms/cypress/integration/logging-in-html-web-form-spec.js]

import faker from 'faker';
import { loginStub } from 'stubs/sessionStubs';
import { FAIL_CASE, inputTypes, validationTypes } from 'cypressConstants';
import { testFields } from 'reusableTests';
import routes from 'constants/routesPaths';

const { INPUT } = inputTypes;
const { PRESENCE, EMAIL } = validationTypes;

const email = faker.internet.email();
const password = faker.internet.password();

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
    it('Successfully redirected when user not logged in', () => {
      cy.url().should('match', /login/);
    });

    it('Should see the login page', () => {
      cy.get('p').contains('LOGIN');
    });

    it('Should see a link to the sign up page', () => {
      cy.get('a')
        .should('have.attr', 'href', routes.signUp)
        .contains('Sign up');
    });

    it('Clicking the sign up link, should be redirected to the sign up page', () => {
      cy.get('a')
        .should('have.attr', 'href', routes.signUp)
        .click();
      cy.url().should('match', /sign-up/);
    });
  });

  context('Form Validations', () => {
    const fields = [
      {
        title: 'Email',
        name: 'email',
        inputType: INPUT,
        errors: [
          {
            validationType: PRESENCE,
            options: { customMessage: 'You must enter an email to continue' }
          },
          {
            validationType: EMAIL,
            options: { customMessage: 'You must enter a valid email' }
          }
        ]
      },
      {
        title: 'Password',
        name: 'password',
        inputType: INPUT,
        errors: [
          {
            validationType: PRESENCE,
            options: { customMessage: 'You must enter a password to continue' }
          }
        ]
      }
    ];
    testFields(fields);
  });

  context('Form Submission', () => {
    it('submit failure, should display invalid credentials', () => {
      cy.stubRequest(loginStub(), FAIL_CASE);

      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('form')
        .submit()
        .wait('@loginStub');

      cy.get('strong').contains('Invalid login credentials. Please try again.');
    });

    it('submit successful, should be redirected to the homepage', () => {
      cy.stubRequest(loginStub());

      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('form')
        .submit()
        .wait('@loginStub');

      cy.visit('/login');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
