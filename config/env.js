module.exports = {
  development: {
    mongodb: {
      db: 'glosh-dev'
    },
    GRAPHQL_URL: 'http://localhost:3000/api/graphql'
  },
  production: {
    mongodb: {
      db: 'glosh'
    },
    GRAPHQL_URL: 'http://localhost:3000/api/graphql'
  },
  test: {
    mongodb: {
      db: 'glosh-test'
    },
    GRAPHQL_URL: 'http://localhost:3000/api/graphql'
  }
};
