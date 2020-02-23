const withCSS = require('@zeit/next-css');
const path = require('path');
const cfg = require('./config');

module.exports = withCSS({
  cssModules: true,
  env: {
    mongodb: cfg.mongodb,
    GRAPHQL_URL: cfg.GRAPHQL_URL,
    DB_USER: cfg.DB_USER,
    DB_PASSWORD: cfg.DB_PASSWORD,
    SERVER_SECRET: cfg.SERVER_SECRET
  },
  webpack(config) {
    config.resolve.alias['~components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['~api'] = path.resolve(__dirname, 'apollo');
    config.resolve.alias['~lib'] = path.resolve(__dirname, 'lib');
    return config;
  }
});
