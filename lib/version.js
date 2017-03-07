const pkg = require('../package');

module.exports = () => {
  const version = `flow-search v${pkg.version}`;
  return Promise.resolve(version);
};
