const react = require('react');

// Enzyme doesn't support memo yet: https://github.com/airbnb/enzyme/issues/1875
module.exports = { ...react, memo: x => x };
