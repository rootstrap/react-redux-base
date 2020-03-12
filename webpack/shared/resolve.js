const path = require('path');

module.exports = {
  extensions: ['*', '.js', '.jsx', '.json'],
  alias: {
    httpClient: path.resolve(__dirname, '../../src/httpClient'),
    assets: path.resolve(__dirname, '../../src/assets'),
    components: path.resolve(__dirname, '../../src/components'),
    constants: path.resolve(__dirname, '../../src/constants'),
    middleware: path.resolve(__dirname, '../../src/middleware'),
    pages: path.resolve(__dirname, '../../src/pages'),
    services: path.resolve(__dirname, '../../src/services'),
    hooks: path.resolve(__dirname, '../../src/hooks'),
    locales: path.resolve(__dirname, '../../src/locales'),
    state: path.resolve(__dirname, '../../src/state'),
    selectors: path.resolve(__dirname, '../../src/selectors'),
    styles: path.resolve(__dirname, '../../src/styles'),
    utils: path.resolve(__dirname, '../../src/utils'),
    fixtures: path.resolve(__dirname, '../../cypress/fixtures'),
    stubs: path.resolve(__dirname, '../../cypress/stubs'),
    cypressConstants: path.resolve(__dirname, '../../cypress/support/constants'),
    reusableTests: path.resolve(__dirname, '../../cypress/support/reusableTests')
  }
};
