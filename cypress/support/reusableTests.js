// BASE
Cypress.Commands.add('testBase', (messageClassName, title, name, value, defaultMessage, type = 'input', customError) => {
  cy.get('form').within(() => {
    if (value || value === 0) {
      cy.get(`${type}[name="${name}"]`).clear().type(value).blur();
    } else {
      cy.get(`${type}[name="${name}"]`).clear().blur();
    }
  });
  cy.get(messageClassName).contains(customError || `${title} ${defaultMessage}`);
});

// PRESENCE
Cypress.Commands.add('testPresence', ({ messageName, className }, title, name, type = 'input', customError) => {
  Cypress.log({ name: `Test presence ${messageName}` });
  cy.testBase(className, title, name, '', 'can\'t be blank', type, customError);
});

// FORMAT
Cypress.Commands.add('testFormat', ({ messageName, className }, title, name, wrongValue, type = 'input', customError) => {
  Cypress.log({ name: `Test Format ${messageName}` });
  cy.testBase(className, title, name, wrongValue, 'is invalid', type, customError);
});

// NUMERICALITY
Cypress.Commands.add('testNumericality', ({ messageName, className }, title, name, type = 'input', customError) => {
  Cypress.log({ name: `Test Numericality ${messageName}` });
  cy.testBase(className, title, name, 'a', 'is not a number', type, customError);
});

// GREATER THAN
Cypress.Commands.add('testGreaterThan', ({ messageName, className }, title, name, limit, type = 'input', customError) => {
  Cypress.log({ name: `Test Greater Than ${messageName}` });
  cy.testBase(className, title, name, limit, `must be greater than ${limit}`, type, customError);
});

// GREATER THAN OR EQUAL TO
Cypress.Commands.add('testGreaterThanOrEqualTo', ({ messageName, className }, title, name, limit, type = 'input', customError) => {
  Cypress.log({ name: `Test Greater Than Or Equal To ${messageName}` });
  cy.testBase(className, title, name, limit - 1, `must be greater than or equal to ${limit}`, type, customError);
});
