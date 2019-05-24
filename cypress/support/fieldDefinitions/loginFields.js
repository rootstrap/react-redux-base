import { inputTypes, validationTypes } from 'cypressConstants';

const { INPUT } = inputTypes;
const { PRESENCE, EMAIL } = validationTypes;

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
];

export default fields;
