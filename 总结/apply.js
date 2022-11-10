var name = "康城";
var obj = {
  name: "kangcheng",
};
function foo() {
  console.log(this);
  return "success";
}
//手写call
Function.prototype._call = function (ctx, ...args) {
  //判断上下文类型是undefined或者null指向Windo
  //否则使用Object()进行封装
  const o = ctx == undefined ? window : Object(ctx);
  //如何把函数foo的this指向ctx这个上下文呢
  //把函数foo赋值给对象o的一个属性，用这个对象去调用foo this就指向这个对象o
  //下面的this就是调用_call的函数foo  我们把this给对象o的属性fn 就是把函数foo赋值给了o.fn
  //给context新增一个独一无二的属性
  const key = Symbol();
  o[key] = this;
  //立即执行一次
  const result = o[key](...args);
  //删除这个属性
  delete o[key];
  //把函数的返回值赋值给_call的返回值
  return result;
};
//手写bind
Function.prototype._bind = function (ctx, ...args) {
  //下面的this就是调用_bind的函数，保存给_self
  const _self = this;
  //bind要返回一个函数，就不会立即执行
  const newFn = function (...rest) {
    //调用call修改this指向
    return _self.call(ctx, ...args, ...rest);
  };
  if (!_self.prototype) {
    //复制原函数的prototype给newFn 一些情况下函数没有prototype，比如箭头函数
    newFn.prototype = Object.create(_self.prototype);
  }
  return newFn;
};
