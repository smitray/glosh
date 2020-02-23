const dotenv = require('dotenv');
const _ = require('lodash');
const base = require('./base');
const env = require('./env');

const result = dotenv.config();
if (result.error) {
  throw new Error(result.error);
}

const envs = result.parsed;

// console.log(process.env.NODE_ENV);

module.exports = {
  ...envs,
  ..._.merge(env[process.env.NODE_ENV], base)
};
