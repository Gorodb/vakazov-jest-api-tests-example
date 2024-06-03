/** @type {import('jest').Config} */

const config = {
  verbose: true,
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  testEnvironment: "allure-jest/node",
  testEnvironmentOptions: {
    resultsDir: "./allure-results",
  },
  setupFilesAfterEnv: [
    './setup.js',
    './customMatchers.js',
  ],
};

module.exports = config;
