import faker from 'faker';
import { signUpStub } from 'stubs/sessionStubs';
import { FAIL_CASE, inputTypes, validationTypes } from 'cypressConstants';
import { testFields } from 'reusableTests';
import routes from 'constants/routesPaths';

const { INPUT } = inputTypes;
const { PRESENCE, EMAIL, EQUALITY } = validationTypes;

const email = faker.internet.email();
const password = faker.internet.password();

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
      cy.get('a')
        .should('have.attr', 'href', routes.login)
        .contains('Sign in');
    });

    it('Click in the sign up link, should be redirected to the login page', () => {
      cy.get('a')
        .should('have.attr', 'href', routes.login)
        .click();
      cy.url().should('match', /login/);
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
      },
      {
        title: 'Password Confirmation',
        name: 'passwordConfirmation',
        inputType: INPUT,
        errors: [
          {
            validationType: PRESENCE,
            options: { customMessage: 'You must enter a password confirmation to continue' }
          },
          {
            validationType: EQUALITY,
            options: {
              otherInput: 'password',
              setup: () => {
                cy.get('input[name=password]').type('password123');
              }
            }
          }
        ]
      }
    ];
    testFields(fields);
  });

  context('Form Submission', () => {
    it('Submit failure, should display has already been taken', () => {
      cy.stubRequest(signUpStub(), FAIL_CASE);

      cy.get('input[name="email"]').type(email);
      cy.get('input[name=password]').type(password);
      cy.get('input[name=passwordConfirmation]').type(password);
      cy.get('form')
        .submit()
        .wait('@signUpStub');

      cy.contains('has already been taken');
    });

    it('Submit successful, should be redirected to the homepage', () => {
      cy.stubRequest(signUpStub());

      cy.get('input[name="email"]').type(email);
      cy.get('input[name=password]').type(password);
      cy.get('input[name=passwordConfirmation]').type(password);
      cy.get('form')
        .submit()
        .wait('@signUpStub');

      cy.visit(routes.login);
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
