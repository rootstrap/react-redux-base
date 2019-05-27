import capitalize from 'lodash/capitalize';

import { validationTypes } from 'cypressConstants';
import { inputTypes } from './constants';

// Validation cases
const getDefaults = (testType, title, options = {}) => {
  const name = title.toLowerCase();
  switch (testType) {
    case validationTypes.PRESENCE:
      return { value: '', defaultMessage: `${capitalize(name)} can't be blank` };
    case validationTypes.EMAIL:
      return { value: 'a@b', defaultMessage: `You must enter a valid ${name}` };
    case validationTypes.EQUALITY:
      return {
        value: 'different value',
        defaultMessage: `Your ${name} must be equal to the ${options.otherInput}`
      };
    default:
      return {};
  }
};

// Base
Cypress.Commands.add('testInput', ({
  title,
  name,
  validationType,
  // Optionals:
  inputType = inputTypes.INPUT,
  options: {
    logTitle = true,
    customValue,
    customMessage,
    setup,
    ...options
  } = {}
}) => {
  const { value, defaultMessage } = getDefaults(validationType, title, options);
  if (logTitle) {
    Cypress.log({ name: `Test ${validationType}` });
  }
  setup && setup();
  cy.get('form').within(() => {
    cy.get(`${inputType}[name="${name}"]`).as('currentInput');

    cy.get('@currentInput').clear();
    const finalValue = customValue || customValue === 0 ? customValue : value;
    if (finalValue || finalValue === 0) cy.get('@currentInput').type(finalValue);
    cy.get('@currentInput').blur();
  });
  cy.contains(customMessage || defaultMessage);
});

export const testFields = fields => (
  fields.forEach((field) => {
    const { title, errors, warnings, ...basics } = field;
    context(`${title} field`, () => {
      ['errors', 'warnings'].forEach((validationKey) => {
        const validations = field[validationKey];
        if (validations) {
          context(validationKey, () => {
            validations.forEach(({ validationType, options }) => {
              it(`Displays ${title.toLowerCase()} ${validationType} error`, () => {
                cy.testInput({ title, ...basics, validationType, options });
              });
            });
          });
        }
      });
    });
  })
);
