const graph = require('./graphql');
const component = require('./component');

module.exports = (plop) => {
  plop.setGenerator('graphql', graph);
  plop.setGenerator('component', component);
};
