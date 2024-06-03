require('dotenv').config();

const timeout = parseInt(process.env.DEFAULT_TIMEOUT) || 10000; // in milliseconds

jest.setTimeout(timeout);
