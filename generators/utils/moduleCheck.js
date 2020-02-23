const fs = require('fs');

const graph = fs.readdirSync('apollo/api');
const component = fs.readdirSync('components');

const moduleCheck = (components, comp) => components.indexOf(comp) >= 0;

module.exports = {
  graph: (cmp) => moduleCheck(graph, cmp),
  component: (cmp) => moduleCheck(component, cmp)
};
