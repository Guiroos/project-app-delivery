const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xfmvkh',
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
