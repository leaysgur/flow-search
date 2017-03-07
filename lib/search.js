module.exports = (branch) => {
  branch = String(branch);

  // 検索するのは `master` もしくは `v0.40` とか `v1.1` とかだけ
  if (branch !== 'master' && branch.match(/v\d{1,}\.\d{1,}/) === null) {
    throw new Error('branch name is invalid');
  }

  const libUrl = 'https://api.github.com/repos/facebook/flow/contents/lib';
  const param = branch === 'master' ? '' : `?ref=${branch}`;
  fetch(libUrl + param)
    // GitHub APIはJSONを返す
    .then(res => res.json())
    // /lib 配下のファイルたちが型定義
    .then(res => res.map(item => item.download_url))
    // テキストで全部取る
    .then(urls => Promise.all(urls.map(url => fetch(url).then(res => res.text()))))
    // つなげて1枚のテキストにする
    .then(decls => decls.join('\n'))
    // 吐く
    .then(decl => console.log(decl));
};