const path = require('path');

module.exports = {
  extensions: ['*', '.js', '.jsx', '.json'],
  alias: {
    actions: path.resolve(__dirname, '../../src/actions'),
    api: path.resolve(__dirname, '../../src/api'),
    assets: path.resolve(__dirname, '../../src/assets'),
    components: path.resolve(__dirname, '../../src/components'),
    constants: path.resolve(__dirname, '../../src/constants'),
    pages: path.resolve(__dirname, '../../src/pages'),
    services: path.resolve(__dirname, '../../src/services'),
    hooks: path.resolve(__dirname, '../../src/hooks'),
    locales: path.resolve(__dirname, '../../src/locales'),
    reducers: path.resolve(__dirname, '../../src/reducers'),
    selectors: path.resolve(__dirname, '../../src/selectors'),
    store: path.resolve(__dirname, '../../src/store'),
    styles: path.resolve(__dirname, '../../src/styles'),
    utils: path.resolve(__dirname, '../../src/utils'),
    fixtures: path.resolve(__dirname, '../../cypress/fixtures'),
    stubs: path.resolve(__dirname, '../../cypress/stubs'),
    cypressConstants: path.resolve(__dirname, '../../cypress/support/constants'),
    reusableTests: path.resolve(__dirname, '../../cypress/support/reusableTests')
  }
};
