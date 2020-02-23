/* eslint-disable quotes */
const moduleCheck = require('../utils/moduleCheck');

module.exports = {
  description: 'Create a new graphql module',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What is the name of the module?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return moduleCheck.graph(value) ? 'That module already exists.' : true;
      }
      return 'The name is required.';
    }
  }],
  actions: () => ([{
    type: 'add',
    path: '../apollo/api/{{camelCase name}}/index.js',
    templateFile: './graphql/index.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../apollo/api/{{camelCase name}}/{{camelCase name}}.model.js',
    templateFile: './graphql/model.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../apollo/api/{{camelCase name}}/{{camelCase name}}.service.js',
    templateFile: './graphql/service.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../apollo/api/{{camelCase name}}/{{camelCase name}}.resolvers.js',
    templateFile: './graphql/resolvers.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../apollo/api/{{camelCase name}}/{{camelCase name}}.schema.js',
    templateFile: './graphql/schema.js.hbs',
    abortOnFail: true
  }, {
    type: 'add',
    path: '../apollo/api/{{camelCase name}}/{{camelCase name}}.test.js',
    templateFile: './graphql/test.js.hbs',
    abortOnFail: true
  }, {
    type: 'append',
    path: '../apollo/api/index.js',
    pattern: `/* INJECT_IMPORT */`,
    template: `import { {{camelCase name}}Defs, {{camelCase name}}Resolvers } from './{{camelCase name}}';`
  }, {
    type: 'append',
    path: '../apollo/api/index.js',
    pattern: `/* INJECT_DEFS */`,
    template: `{{camelCase name}}Defs,`
  }, {
    type: 'append',
    path: '../apollo/api/index.js',
    pattern: `/* INJECT_RESOLVERS */`,
    template: `{{camelCase name}}Resolvers,`
  }])
};
