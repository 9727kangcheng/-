//看我手写一个promise
function CutePromise(excuotr) {
  //value 记录异步任务成功的执行结果
  this.value = null;
  //reason 记录异步任务失败的原因
  this.reason = null;
  //status 记录当前状态，初始化时'pending'
  this.status = "pending";

  //缓存两个队列，维护resolved 和rejected各自对应的处理函数
  this.onResolvedQueue = [];
  this.onRejectedQueue = [];
  //把this 存下来，后面会用得到
  var self = this;

  //定义resolve函数
  function resolve(value) {
    //如果不是pending状态，直接返回
    if (self.value !== "pending") {
      return;
    }
    //异步任务成功，把结果赋值给value
    self.value = value;
    self.status = "resolved";
    // 用 setTimeout 延迟队列任务的执行

    //批量执行resolved队列离的任务
    self.onResolvedQueue.forEach((resolved) => resolved(self.value));
  }
  //定义reject函数
  function reject(reason) {
    //如果不是pending状态，直接返回
    if (self.value !== "pending") {
      return;
    }
    //异步任务失败，把结果赋值给reason
    self.value = reason;
    self.status = "rejected";
    // 用 setTimeout 延迟队列任务的执行

    //批量执行rejected队列离的任务
    self.onRejectedQueue.forEach((rejected) => rejected(self.value));
  }
  //把resolve 和reject能力赋予执行器
  excuotr(resolve, reject);
}
CutePromise.prototype.then = function (onResolved, onRejected) {
  //注意，onResolved和onRejected必须是函数，如果不是，我们此处用一个遗传来兜底
  if (typeof onResolved !== "function") {
    onResolved = function (x) {
      return x;
    };
  }
  if (typeof onRejected !== "function") {
    onRejected = function (e) {
      return e;
    };
  }
  //依然是保存this
  var self = this;
  //判断是否是resolved
  if (self.status === "resolved") {
    // 如果是 执行对应的处理方法
    onResolved(self.value);
  } else if (self.status === "onRejected") {
    // 如果是 执行对应的处理方法
    onRejected(self.reason);
  } else if (self.status === "pending") {
    self.onResolvedQueue.push(onResolved);
    self.onRejectedQueue.push(onRejected);
  }
  return this;
};
//然后小试一手
// new CutePromise(function (resolve, reject) {
//   resolve("成了");
// }).then(
//   function (value) {
//     console.log(value);
//   },
//   function (reason) {
//     console.log(reason);
//   }
// );
// new CutePromise(function (resolve, reject) {
//   reject("错了");
// }).then(
//   function (value) {
//     console.log(value);
//   },
//   function (reason) {
//     console.log(reason);
//   }
// );
const cutePromise = new CutePromise(function (resolve, reject) {
  resolve("成了");
});
cutePromise
  .then((value) => {
    console.log(value);
    console.log("我是第一个任务");
  })
  .then((value) => {
    console.log("我是第二个任务");
  });
