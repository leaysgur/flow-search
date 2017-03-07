module.exports = (branch) => {
  branch = String(branch);

  // 検索するのは `master` もしくは `v0.40` とか `v1.1` とかだけ
  if (branch !== 'master' && branch.match(/v\d{1,}\.\d{1,}/) === null) {
    return Promise.reject(new Error('branch name is invalid'));
  }

  return _fetchAllDeclsText(branch);
};

function _fetchAllDeclsText(branch) {
  const libUrl = 'https://api.github.com/repos/facebook/flow/contents/lib';
  const param = branch === 'master' ? '' : `?ref=${branch}`;

  return fetch(libUrl + param)
    // GitHub APIはJSONを返す
    .then(res => res.json())
    // /lib 配下のファイルたちが型定義
    .then(res => res.map(item => item.download_url))
    // 存在しない場合はエラーが返ってくる
    .catch(() => Promise.reject(new Error('branch does not exists')))
    // テキストで全部取る
    .then(urls => Promise.all(urls.map(url => fetch(url).then(res => res.text()))))
    // つなげて1枚のテキストにする
    .then(decls => decls.join('\n'));
}
