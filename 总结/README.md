## webpack打包原理
根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源，当webpack处理程序时，它会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。
webpack有两种组织模块的依赖方式，同步、异步。异步作为他们的分割点，形成一个新的块；在优化每个依赖树之后，每一个异步区块都将作为一个文件被打包。

## react hooks
对函数组件进行增强，让函数型组件可以存储状态，可以拥有处理副作用的能力
class组件的不足：确实逻辑复用性、会经常变得复杂难以维护、不能保证this指向的正确性
useState、useReducer、useContext、useEffect、useMemo、memo、useCallback、useRef
## 宏任务、微任务
宏任务（setTimeout、setInterval、ajax、I/OUI交互事件）
微任务（Promise、async/await、process.nextTick）
 1）所有的同步任务都在主线程上执行，行成一个执行栈。
 2）除了主线程之外，还存在一个任务列队，只要异步任务有了运行结果，就在任务列队中植入一个时间标记。
 3）主线程完成所有任务(执行栈清空），就会读取任务列队，先执行微任务队列在执行宏任务队列。
 