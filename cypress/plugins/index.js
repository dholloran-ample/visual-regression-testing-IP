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

const fs = require('fs');
const path = require('path');
let percyHealthCheck = require('@percy/cypress/task');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', percyHealthCheck);

  // Loads .env
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const file = fs.readFileSync(envPath, 'utf-8');
    file.split('\n').map(line => {
      if (line.trim() !== '') {
        const [key, value] = line.split('=');
        config.env[key] = value;
      }
    });
  }

  if (config.env['STORYBOOK_CYPRESS_URL']) {
    config.baseUrl = config.env['STORYBOOK_CYPRESS_URL'];
  }

  return config;
};
