//map 中的exc接受三个参数，分别是：元素值、元素下标、和原数组
//map返回的是一个新数组，地址不一样

//这里不能直接使用箭头函数，否则无法访问到this
Array.prototype._map = function (exc) {
  const result = [];
  this.forEach((item, index, arr) => {
    result[index] = exc(item, index, arr);
  });
  return result;
};
const a = new Array(2).fill(2);
console.log(a.map((item, index, arr) => item * index + 1));
console.log(a._map((item, index, arr) => item * index + 1));
