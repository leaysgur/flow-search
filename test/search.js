const test = require('ava');
const search = require('../lib/search');

test('search ignores invalid branch', t => {
  t.throws(() => search());
  t.throws(() => search(null));
  t.throws(() => search(undefined));
  t.throws(() => search(''));
  t.throws(() => search('0.30'));
  t.throws(() => search('v1'));
  t.throws(() => search(0.40));
  t.throws(() => search(1.1));
  t.throws(() => search('hoge'));
});
