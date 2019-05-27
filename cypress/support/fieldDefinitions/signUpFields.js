import { inputTypes, validationTypes } from 'cypressConstants';

const { INPUT } = inputTypes;
const { PRESENCE, EMAIL, EQUALITY } = validationTypes;

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
  },
];

export default fields;
