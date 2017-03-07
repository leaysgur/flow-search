module.exports = (decls, keyword) => {
  const lines = decls.split('\n');

  // 目印となる位置を見つける
  const lineNo = _getLineNoByKeyword(lines, keyword);
  // その位置から定義ブロックを抜き出す
  const results = lineNo.map(idx => _getDeclsByLineNo(lines, idx));

  return Promise.resolve(results.join('\n\n'));
};


function _getLineNoByKeyword(lines, keyword) {
  const keywordRe = new RegExp(keyword, 'i');
  const declareRe = new RegExp(/^declare /, 'i');
  const lineNo = [];

  lines.forEach((line, idx) => {
    if (declareRe.test(line) && keywordRe.test(line)) {
      lineNo.push(idx);
    }
  });

  return lineNo;
}

function _getDeclsByLineNo(lines, idx) {
  let res = '';

  // `{` がその行にない = class ではないのでその行だけでOK
  if (/{$/.test(lines[idx]) === false) {
    return lines[idx];
  }

  // class の場合は、 `}` で閉じられるまで抜き出す
  while (true) {
    const line = lines[idx];

    res += line + '\n';
    idx++;

    if (line === '}') {
      break;
    }
  }

  return res;
}
