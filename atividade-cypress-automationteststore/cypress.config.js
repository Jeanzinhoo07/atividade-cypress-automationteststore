const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://automationteststore.com',

        specPattern: 'cypress/e2e/**/*.cy.js',

        supportFile: false,

        video: true,

        screenshotOnRunFailure: true,

        defaultCommandTimeout: 12000,

        pageLoadTimeout: 60000,

        viewportWidth: 1366,

        viewportHeight: 768
    }
});