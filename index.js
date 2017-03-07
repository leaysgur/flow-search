require('es6-promise').polyfill();
require('isomorphic-fetch');

const version = require('./lib/version');
const search = require('./lib/search');
const find = require('./lib/find');

const argv = require('yargs')
  .usage('Usage: $0 -b v0.40')
  .default('b', 'master')
  .alias('b', 'branch')
  .alias('v', 'version')
  .alias('d', 'declare')
  .help('h')
  .alias('h', 'help')
  .argv;


if (argv.v) {
  return version().then(console.log);
}

if (argv.d) {
  // for DEBUG
  const res = require('fs').readFileSync('./decls.txt', 'utf8');
  return find(res, argv.d).then(console.log);
  // return search(argv.branch)
  //   .then(res => find(res, argv.d))
  //   .then(console.log);
}

return search(argv.branch).then(console.log);
