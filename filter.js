//filter的exc接受三个参数，与map一致，主要实现的是数组的过滤功能，会根据exc函数的返回值来判断是否留下该值
//filter返回的是一个新数组

Array.prototype._filter = function (exc) {
  const result = [];
  this.forEach((item, index, arr) => {
    if (exc(item, index, arr)) {
      result.push(item);
    }
  });
  return result;
};
const b = [1, 3, 4, 5, 6, 2, 5, 1, 8, 20];

console.log(b._filter((item) => item % 2 === 0)); // [ 4, 6, 2, 8, 20 ]
