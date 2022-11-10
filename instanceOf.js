//如果target 为基本数据类型返回false
//判断Fn.prototype  是否在target的隐式原型链上
const instanceOf = (target, Fn) => {
  if (
    (typeof target !== "object" && typeof target !== "function") ||
    typeof target === null
  ) {
    return false;
  }
  let proto = target.__proto__;
  while (true) {
    if (proto === null) return false;
    if (proto === Fn.prototype) return true;
    proto = proto.__proto__;
  }
};
function A() {}
const a = new A();
console.log(instanceOf(a, A));
console.log(instanceOf(1, A));
