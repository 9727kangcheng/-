//手写render,结合react Fiber
function render(vDom, container) {
  let dom;
  //检查当前节点是文本还是对象
  if (typeof vDom != "object") {
    dom = document.createTextNode(vDom);
  } else {
    dom = document.createElement(vDom.type);
  }
  //将vDom处理children外的属性都挂载到真正的dom上
  if (vDom.props) {
    Object.keys(vDom.props)
      .filter((key) => key != "children")
      .forEach((item) => {
        dom[item] = vDom.props[item];
      });
  }
  //如果还有子元素，递归调用
  if (vDom.porps && vDom.props.children && vDom.porps.children.length) {
    vDom.props.children.forEach((child) => render(child, dom));
  }
  container.appendChild(dom);
}

const render = (ele, c) => {
  //创建虚拟dom节点
  let dom = document.createElement(ele.type);
  //添加属性
  const props = Object.keys(ele.props);
  props.forEach((e) => {
    if (e !== "children") {
      dom[e] = ele.props[e];
    }
  });
  //处理子元素
  if (Array.isArray(ele.props.children)) {
    //是数组，那就继续递归
    ele.props.children.forEach((item) => render(item, dom));
  } else {
    dom.innerHTML = ele.porps.children;
  }
  //将当前加工好的dom节点添加到父容器节点中
  c.appendChild(dom);
};
render(vDom, document.getElementById("root"));

//从运行机制上来解释，fiber是一种流程让出机制，让react同步渲染进行中断，并将渲染的执行权让出给浏览器，从而达到不阻塞浏览器渲染的目的
//从数据角度解释，fiber能细化成一种数据结构，或者一个执行单元

const fiber = {
  stateNode, //dom节点实力
  child, //当前接待你所关联的子节点
  sibling, //当前节点所关联的兄弟节点
  return: "", //当前节点所关联的节点
};
/* 
  核心特点：
  支持增量渲染，fiber将react中的渲染任务拆分道每一帧，（任务拆分，有时间就渲染，没时间就暂停）
  支持暂停，终止以及恢复之间的渲染任务（没渲染时间将执行权交给浏览器）
  通过fiber赋予不同任务的优先级。（优先级高的运行，比如事件交互响应、页面渲染等，像网络请求之类的往后排）
  支持并发处理（结合第三点，面对可变的一堆任务，react始终处理最高优先级，灵活调整处理顺序，保证重要的任务都会在允许的最快时间内响应）
*/
requestIdleCallback;
/* 
react是声明式UI库，负责把state转换成页面结构后（虚拟dom结构），再转换成真实dom结构，交给浏览器渲染。state发生改变时，react会进行reconcilation ，
结束后立刻进入Commit阶段，Commit结束后，新State页面才会被展示出来


**reconcilation：计算出目标State对应的虚拟dom结构，寻找将虚拟dom结构修改为目标虚拟dom结构的最优方案
**Commit：将Reconciliation结果应用到DOM中，调用暴露的Hooks：componentDidUpdate、useLayoutEffect等。
*/
