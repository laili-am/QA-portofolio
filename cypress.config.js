const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/report/mochawesome-report",
    overwrite: true,
    html: true,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
