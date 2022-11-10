//事件防抖，最后一次触发执行
//fn时我们需要包装的事件回调，dearly时每次推迟执行的等待时间
function debounce(fn, dearly) {
  //定时器
  let timer = null;

  //将debounce处理结果当作函数返回
  return function () {
    //保留调用时的this上下文
    let context = this;
    //保留调用时传入的参数
    let args = arguments;
    //每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer);
    }
    //设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, dearly);
  };
}
//用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log("触发滚动事件"), 1000);
document.addEventListener("scroll", better_scroll);
