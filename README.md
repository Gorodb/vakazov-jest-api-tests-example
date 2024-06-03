# Api example tests

## Getting started

Install dependencies with command: `npm -i`

Copy and rename [.env.sample](.env.sample) to `.env`.

Run tests with the command: `jest` for local run or `npm test` to generate reports after tests.

After local run you can run allure reports by command: `yarn allur_run`

If allure server is already running you can generate latest reports by command: `yarn allure_gen`

To send allure reports to remote [reports hub](http://45.9.188.130:5005/en) you can use command: `yarn allure_send`

## Technologies

[Jest](https://jestjs.io/)

[Allure reporter](https://webdriver.io/docs/allure-reporter/)

[Pet store test API](https://petstore.swagger.io/)
