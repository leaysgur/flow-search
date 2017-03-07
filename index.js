require('es6-promise').polyfill();
require('isomorphic-fetch');

const search = require('./lib/search');
const version = require('./lib/version');

const argv = require('yargs')
  .usage('Usage: $0 -b v0.40')
  .default('b', 'master')
  .alias('b', 'branch')
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help')
  .argv;

if (argv.v) {
  version();
  process.exit(0);
}

search(argv.branch);
