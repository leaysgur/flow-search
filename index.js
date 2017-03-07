require('es6-promise').polyfill();
require('isomorphic-fetch');

const search = require('./lib/search');
const find = require('./lib/find');

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .help('h')
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .default('b', 'master')
  .default('d', '')
  .alias('b', 'branch')
  .alias('d', 'declare')
  .argv;


if (argv.d) {
  return search(argv.branch)
    .then(res => find(res, argv.d))
    .then(console.log);
}

return search(argv.branch).then(console.log);
