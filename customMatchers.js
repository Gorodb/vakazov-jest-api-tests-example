const {expect} = require("@jest/globals");
const {DataHelper} = require("./helpers/dataHelper");

expect.extend({
  toBeEqualToObject(received, expected, errorMessage) {
    const receivedStringify = typeof received === "object" ? JSON.stringify(received) : received;
    const expectedStringify = typeof expected === "object" ? JSON.stringify(expected) : expected;
    const pass = DataHelper.compareObjects(received, expected);

    if (pass) {
      return {
        message: () => errorMessage || `'${receivedStringify}' should be equal to '${expectedStringify}'`,
        pass: true,
      };
    }
    return {
      message: () => errorMessage || `'${receivedStringify}' should not be equal to '${expectedStringify}'`,
      pass: false,
    };
  },
});
