/* eslint-disable quotes */
const moduleCheck = require('../utils/moduleCheck');

module.exports = {
  description: 'Add a component to the app',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['ES6 Class', 'Stateless Function']
  }, {
    type: 'input',
    name: 'name',
    message: 'What is the name of the component?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return moduleCheck.component(value) ? 'That component already exists.' : true;
      }
      return 'The name is required.';
    }
  }, {
    type: 'input',
    name: 'parent',
    message: 'Has parent folder?',
    default: 'No',
    validate: (value) => {
      if ((/.+/).test(value) && value !== 'No') {
        return moduleCheck.component(value) ? true : 'Component do not exsist';
      }
      return true;
    }
  }, {
    type: 'confirm',
    name: 'wantPropTypes',
    default: true,
    message: 'Should the component have PropTypes?'
  }],
  actions: (data) => {
    let path = '../components/{{properCase name}}';
    if (data.parent !== 'No') {
      path = '../components/{{parent}}/{{properCase name}}';
    }
    return [{
      type: 'add',
      path: `${path}/index.jsx`,
      templateFile: data.type === 'ES6 Class'
        ? './component/es6class.js.hbs' : './component/stateless.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: `${path}/{{camelCase name}}.test.js`,
      templateFile: './component/test.js.hbs',
      abortOnFail: true
    },
    // {
    //   type: 'add',
    //   path: `${path}/{{properCase name}}.mdx`,
    //   templateFile: './component/doc.mdx.hbs',
    //   abortOnFail: true
    // },
    {
      type: 'append',
      path: '../components/index.js',
      pattern: `/* INJECT_EXPORT */`,
      template: data.parent !== 'No'
        ? `export { default as {{properCase name}} } from './{{parent}}/{{properCase name}}';` : `export { default as {{properCase name}} } from './{{properCase name}}';`
    }];
  }
};
