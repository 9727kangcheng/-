class eventProxy {
  constructor() {
    //eventMap用来储存事件和监听函数之间的关系
    this.eventMap = {};
  }

  on(type, handler) {
    //handler必须是一个函数，如果不是直接报错
    if (!(handler instanceof Function)) {
      throw new Error("这里需要一个函数");
    }
    //判断type事件对应的队列是否存在
    if (!this.eventMap[type]) {
      //若不存在，新建该队列
      this.eventMap[type] = [];
    }
    //若存在，直接往队列里推入handler
    this.eventMap[type].push(handler);
  }

  //触发时可以携带数据，params就是数据的载体
  emit(type, params) {
    //假设该事件是由有订阅的(对应的事件队列存在)
    if (this.eventMap[type]) {
      //将事件队列的handler依次执行出列
      this.eventMap[type].forEach((handler, index) => {
        //读取params
        handler[params];
      });
    }
  }

  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}

const myEvent = new eventProxy();
//一个简单的handler
const textHandler = function (params) {
  console.log(`text事件被触发了，textHandler接收到的入参是${params}`);
};
myEvent.on("text", textHandler);
myEvent.emit("text", "newState");
