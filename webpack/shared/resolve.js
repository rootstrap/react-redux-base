const path = require('path');

module.exports = {
  extensions: ['*', '.js', '.jsx', '.json'],
  alias: {
    actions: path.resolve(__dirname, '../../src/actions'),
    api: path.resolve(__dirname, '../../src/api'),
    components: path.resolve(__dirname, '../../src/components'),
    constants: path.resolve(__dirname, '../../src/constants'),
    containers: path.resolve(__dirname, '../../src/containers'),
    locales: path.resolve(__dirname, '../../src/locales'),
    reducers: path.resolve(__dirname, '../../src/reducers'),
    selectors: path.resolve(__dirname, '../../src/selectors'),
    store: path.resolve(__dirname, '../../src/store'),
    styles: path.resolve(__dirname, '../../src/styles'),
    utils: path.resolve(__dirname, '../../src/utils'),
    fixtures: path.resolve(__dirname, '../../cypress/fixtures'),
    stubs: path.resolve(__dirname, '../../cypress/support/stubs'),
    cypressConstants: path.resolve(__dirname, '../../cypress/support/constants'),
    fieldDefinitions: path.resolve(__dirname, '../../cypress/support/fieldDefinitions'),
    reusableTests: path.resolve(__dirname, '../../cypress/support/reusableTests')
  }
};
