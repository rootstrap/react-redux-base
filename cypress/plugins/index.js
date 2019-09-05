// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require('@cypress/webpack-preprocessor');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const env = require('dotenv').config({ path: `.env.${process.env.ENV || 'test'}` });

module.exports = (on, config) => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require('../../webpack/webpack.config.cypress'),
    watchOptions: {}
  };
  on('file:preprocessor', webpack(options));
  on('task', require('@cypress/code-coverage/task'));
  config.env = { API_URL: env.parsed.API_URL };

  addMatchImageSnapshotPlugin(on);
  return config;
};
