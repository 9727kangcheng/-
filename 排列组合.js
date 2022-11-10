//返回字符串参数的所有排列组合
const permute = (str) => {
  const result = []; //存放值
  const map = new Map();
  const dfs = (path) => {
    if (path.length == str.length) {
      result.push(path);
      return;
    }
    for (let i = 0; i < str.length; i++) {
      if (map.get(str[i])) continue;
      map.set(str[i], true);
      path += str[i];
      dfs(path);
      path = path.subString(0, path.length - 1);
      map.set(str[i], false);
    }
  };
  dfs("");
  return result;
};
console.log(permute("abc"));
