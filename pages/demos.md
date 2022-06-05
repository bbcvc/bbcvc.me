---
title: 片断
---
## css 相关

### 1. 万能居中

1. margin: 0 auto;水平
2. text-align: center;水平
3. 行高，垂直
4. 表格，center,middle；水平垂直
5. display:table-cell；模拟表格，all
6. 绝对定位，50%减自身宽高
7. 绝对定位，上下左右全 0，margin:auto
8. 绝对定位加相对定位。不需要知道宽高
9. IE6，IE7：给父元素设一个 font-size:高度/1.14,vertical-align:middle

### 2. [BFC 优化](https://www.jianshu.com/p/0d713b32cd0d)

块格式化上下文, 特性:

- 使 BFC 内部浮动元素不会到处乱跑（清除浮动）；
- 和浮动元素产生边界（在非浮动元素加 margin）。

### 3. 盒模型哪两种模式？什么区别？如何设置

- 标准模式: box-sizing: content-box(默认); 宽高不包括内边距和边框
- 怪异模式: box-sizing: border-box

### 4. [常用清除浮动的方法，如不清除浮动会怎样？](https://blog.csdn.net/h_qingyi/article/details/81269667)

当父元素不给高度的时候，内部元素不浮动时会撑开, 而浮动的时候，父元素变成一条线, 造成塌陷.

- 额外标签法（在最后一个浮动标签后，新加一个标签，给其设置 clear：both；）（不推荐）
- 父元素添加 overflow:hidden; (触发 BFC)
- 使用 after 伪元素清除浮动（推荐使用）
- 使用 before 和 after 双伪元素清除浮动

### 5. 栅格化的原理

比如 antd 的 row 和 col, 将一行等分为 24 份, col 是几就占几份, 底层按百分比实现; 结合媒体查询, 可以实现响应式

### 6. 纯 css 实现三角形

``` css
// 通过设置border
.box {
			width:0px;
			height:0px;
			border-top:50px solid rgba(0,0,0,0);
			border-right:50px solid  rgba(0,0,0,0);
			border-bottom:50px solid green;
			border-left:50px solid  rgba(0,0,0,0);
		}
```

### 7. 高度不定，宽 100%，内一 div 高不确定，如何实现垂直居中？

- verticle-align: middle;
- 绝对定位 50%加 translateY(-50%)
- 绝对定位，上下左右全 0，margin:auto

### 8. 至少两种方式实现自适应布局

- rem, em
- vh, vw
- 百分比
- 媒体查询
- bs, antd 等的栅格布局

### 9. 设置一段文字的大小为 6px

- 谷歌最小 12px, 其他浏览器可以更小
- 通过 transform: scale 实现

### 10. [css 菊花图](https://blog.csdn.net/candy_home/article/details/81540247)

四个小圆点一直旋转

``` css
// 父标签
animation: antRotate 1.2s infinite linear;
// 子标签
animation: antSpin 1s infinite linear;
@keyframe antSpin {
  to {
    opacity: 1
  }
}
@keyframe antRotate {
  to {
    transform: rotate(405)
  }
}
// animation-delay: 逐个延迟0.4s
```

### 11. 关于 em

``` html
 <div style="font-size: 20px">
      123
      <div style="font-size: 2em;width: 2em">456</div>
 </div>
// 此时子元素的font-size为40px, 宽度为80px(还要乘以子元素font-size的系数)
```

### 12. 关于 vh, vw

vw：viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%。
vh：viewpoint height，视窗高度，1vh 等于视窗高度的 1%。
vmin：vw 和 vh 中较小的那个。
vmax：vw 和 vh 中较大的那个。

### 13. [Flex 布局](https://www.runoob.com/w3cnote/flex-grammar.html)

- flex-direction 控制主副轴
- flex-wrap 控制换行(默认不换行)
- flex-flow 是上两个的结合
- justify-content 主轴对齐方式
- align-items 交叉轴对齐方式

### 14. [overflow 原理](https://www.jianshu.com/p/7e04ed3f4bea)

- `overflow: hidden`能清除块内子元素的浮动影响. 因为该属性进行超出隐藏时需要计算盒子内所有元素的高度, 所以会隐式清除浮动
- 创建 BFC 条件(满足一个):
  - float 的值不为 none；
  - overflow 的值不为 visible；
  - position 的值为 fixed / absolute；
  - display 的值为 table-cell / table-caption / inline-block / flex / inline-flex。

### 15. 实现自适应的正方形:

- 使用 vw, vh
- `width`百分比, `height: 0`, `padding-top(bottom): 50%`

### 16. 标准模式和怪异模式

- document.compatMode 属性可以判断是否是标准模式，当 document.compatMode 为“CSS1Compat”，是标准模式，“BackCompat”是怪异模式。
- 怪异模式是为了兼容旧版本的浏览器, 因为 IE 低版本 document.documentElement.clientWidth 获取不到
- 怪异模式盒模型: `box-sizing: border-box`; 标准模式: `box-sizing: content-box`

### 17. CSS3 实现环形进度条

两个对半矩形遮罩, 使用`rotate`以及`overflow: hidden`进行旋转

### 18. [css 优先级](https://www.cnblogs.com/wangmeijian/p/4207433.html)

选择器的特殊性值表述为 4 个部分，用 0,0,0,0 表示。

- ID 选择器的特殊性值，加 0,1,0,0。
- 类选择器、属性选择器或伪类，加 0,0,1,0。
- 元素和伪元素，加 0,0,0,1。
- 通配选择器\*对特殊性没有贡献，即 0,0,0,0。
- 最后比较特殊的一个标志!important（权重），它没有特殊性值，但它的优先级是最高的，为了方便记忆，可以认为它的特殊性值为 1,0,0,0,0。

## JS 相关

### 1. ES5 和 ES6 继承方式区别

- ES5 定义类以函数形式, 以 prototype 来实现继承
- ES6 以 class 形式定义类, 以 extend 形式继承

### 2. [Generator 了解](http://es6.ruanyifeng.com/#docs/generator)

ES6 提供的一种异步编程解决方案, Generator 函数是一个状态机，封装了多个内部状态。

``` js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

调用后返回指向内部状态的指针, 调用 next()才会移向下一个状态, 参数:

``` js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

### 3. 手写 Promise 实现

``` js
var myPromise = new Promise((resolve, reject) => {
  // 需要执行的代码
  ...
  if (/* 异步执行成功 */) {
    resolve(value)
  } else if (/* 异步执行失败 */) {
    reject(error)
  }
})

myPromise.then((value) => {
  // 成功后调用, 使用value值
}, (error) => {
  // 失败后调用, 获取错误信息error
})
```

### 4. Promise 优缺点

- 优点: 解决回调地狱, 对异步任务写法更标准化与简洁化
- 缺点: 首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消; 其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部; 第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成).
  极简版 promise 封装:

``` js
function promise () {
  this.msg = '' // 存放value和error
  this.status = 'pending'
  var that = this
  var process = arguments[0]

  process (function () {
    that.status = 'fulfilled'
    that.msg = arguments[0]
  }, function () {
    that.status = 'rejected'
    that.msg = arguments[0]
  })
  return this
}

promise.prototype.then = function () {
  if (this.status === 'fulfilled') {
    arguments[0](this.msg)
  } else if (this.status === 'rejected' && arguments[1]) {
    arguments[1](this.msg)
  }
}
```

### 5. [观察者模式](https://www.cnblogs.com/gradolabs/p/4786782.html)

又称发布-订阅模式, 举例子说明.
实现: 发布者管理订阅者队列, 并有新消息推送功能. 订阅者仅关注更新就行

### 6. 手写实现 bind

``` js
Function.prototype.bind = function () {
   // 保存原函数
  var self = this
  // 取出第一个参数作为上下文, 相当于[].shift.call(arguments)
  var context = Array.prototype.shift.call(arguments)
  // 取剩余的参数作为arg; 因为arguments是伪数组, 所以要转化为数组才能使用数组方法
  var arg = Array.prototype.slice.call(arguments)
  // 返回一个新函数
  return function () {
    // 绑定上下文并传参
    self.apply(context, Array.prototype.concat.call(arg, Array.prototype.slice.call(arguments)))
  }
}
```

### 7. [手写实现 4 种继承](https://www.jianshu.com/p/159b07f2d877)

```
function Father () {}
function Child () {}
// 1. 原型继承
Child.prototype = new Father()
// 2. 构造继承
function Child (name) {
  Father.call(this, name)
}
// 3. 组合继承
function Child (name) {
  Father.call(this, name)
}
Child.prototype = new Father()
// 4. 寄生继承
function cloneObj (o) {
  var clone = object.create(o)
  clone.sayName = ...
  return clone
}
// 5. 寄生组合继承
// 6. ES6 class extend继承
```

### 9. http 状态码

- 1\*\*: 服务器收到请求, 需请求者进一步操作
- 2\*\*: 请求成功
- 3\*\*: 重定向, 资源被转移到其他 URL 了
- 4\*\*: 客户端错误, 请求语法错误或没有找到相应资源
- 5\*\*: 服务端错误, server error
- 304: Not Modified. 指定日期后未修改, 不返回资源

### 10. Object.create 实现（原型式继承，特点：实例的**proto**指向构造函数本身）

### 11. async 和 await：(ES8)

- Generator 函数的语法糖，将\*改成 async，将 yield 换成 await。
- 是对 Generator 函数的改进, 返回 promise。
- 异步写法同步化，遇到 await 先返回，执行完异步再执行接下来的.
- 内置执行器, 无需 next()

### 12. 算法和数据结构：

- 算法：
  解决具体问题所需要的解决方法。执行效率最快的最优算法。时间复杂度。输入，输出，有穷性，确定性，可行性。冒泡排序，二叉树遍历，最长回文，二分查找，指针，链表等，堆栈，队列等。力扣，codewar，算法导论。
- 数据结构：
  逻辑结构：集合、线性、树形、图形结构
  物理结构：顺序、链式存储结构

### 13. 封装 JSONP

```
function jsonp ({url, param, callback}) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    window.callback = function (data) {
      resolve(data)
      document.body.removeChild('script')
    }
    var param = {...param, callback}
    var arr = []
    for (let key in param) {
      arr.push(`${key}=${param[key]}`)
    }
    script.src = `${url}?${arr.join('&')}`
    document.body.appendChild(script)
  })
}
```

### 14. 手动实现 map(forEach 以及 filter 也类似)

```
// for循环实现
Array.prototype.myMap = function () {
  var arr = this
  var [fn, thisValue] = Array.prototype.slice.call(arguments)
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(fn.call(thisValue, arr[i], i, arr))
  }
  return result
}
var arr0 = [1, 2, 3]
console.log(arr0.myMap(v => v + 1))

// forEach实现(reduce类似)
Array.prototype.myMap = function (fn, thisValue) {
  var result = []
  this.forEach((v, i, arr) => {
    result.push(fn.call(thisValue, v, i, arr))
  })
  return result
}
var arr0 = [1, 2, 3]
console.log(arr0.myMap(v => v + 1))
```

### 15. js 实现 checkbox 全选以及反选

```
<body>
    <button id="other">反选</button>
    <input type="checkbox" id="all" />全选
    <input type="checkbox" class="check" />1
    <input type="checkbox" class="check" />2
    <input type="checkbox" class="check" />3
    <script>
      var checkbox = document.getElementsByClassName('check')
      var checkAll = document.getElementById('all')
      var checkOther = document.getElementById('other')
      checkAll.onclick = function() {
        var flag = true
        for (var i = 0; i < checkbox.length; i++) {
          if (!checkbox[i].checked) flag = false
        }
        if (flag) {
          for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false
          }
        } else {
          for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = true
          }
        }
      }
      checkOther.onclick = function() {
        for (var i = 0; i < checkbox.length; i++) {
          checkbox[i].checked = !checkbox[i].checked
        }
      }
    </script>
  </body>
```

### 16. [对原型链的理解](https://www.jianshu.com/p/17b2d4dd6867)？prototype 上都有哪些属性

- 在 js 里，继承机制是原型继承。继承的起点是 对象的原型（Object prototype）。
- 一切皆为对象，只要是对象，就会有 proto 属性，该属性存储了指向其构造的指针。
- Object prototype 也是对象，其 proto 指向 null。
- 对象分为两种：函数对象和普通对象，只有函数对象拥有『原型』对象（prototype）。
- prototype 的本质是普通对象。
- Function prototype 比较特殊，是没有 prototype 的函数对象。
- new 操作得到的对象是普通对象。
- 当调取一个对象的属性时，会先在本身查找，若无，就根据 proto 找到构造原型，若无，继续往上找。最后会到达顶层 Object prototype，它的 proto 指向 null，均无结果则返回 undefined，结束。
- 由 proto 串起的路径就是『原型链』。
- 通过 prototype 可以给所有子类共享属性
- 函数（Function）才有 prototype 属性，对象（除 Object）拥有**proto**
- 实例的**proto**等于构造函数的 prototype
- 实例的 constructor 指向构造函数

### 17. 为什么使用继承

通常在一般的项目里不需要,因为应用简单,但你要用纯 js 做一些复杂的工具或框架系统就要用到了,比如 webgis、或者 js 框架如 jquery、ext 什么的,不然一个几千行代码的框架不用继承得写几万行,甚至还无法维护

### 18. setTimeout 时间延迟为何不准

单线程, 先执行同步主线程, 再执行异步任务队列

### 19. [事件循环述，宏任务和微任务有什么区别？](https://www.jianshu.com/p/03b89adb3ddd)

- 先主线程后异步任务队列
- 先微任务再宏任务

### 20. let const var 作用域

块级作用域, 暂时性死区

### 21. [节流和防抖](https://www.cnblogs.com/walls/p/6399837.html)

- 函数节流是指一定时间内 js 方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。

```
// 函数节流   滚动条滚动
var canRun = true;
document.getElementById("throttle").onscroll = function(){
    if(!canRun){
        // 判断是否已空闲，如果在执行中，则直接return
        return;
    }

    canRun = false;
    setTimeout(function(){
        console.log("函数节流");
        canRun = true;
    }, 300);
};
```

- 函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

```
// 函数防抖
var timer = false;
document.getElementById("debounce").onscroll = function(){
    clearTimeout(timer); // 清除未执行的代码，重置回初始化状态

    timer = setTimeout(function(){
        console.log("函数防抖");
    }, 300);
};
```

### 22. 实现一个 sleep 函数

```
// 这种实现方式是利用一个伪死循环阻塞主线程。因为JS是单线程的。所以通过这种方式可以实现真正意义上的sleep()。
function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

function test() {
  console.log('111');
  sleep(2000);
  console.log('222');
}

test()
```

### 23. 闭包

- 概念: 内层函数能够访问外层函数作用域的变量
- 缺点: 引起内存泄漏（释放内存）
- 作用:
  - 保护 this 指向
  - 使用闭包修正打印值
  - 实现柯里化
  - 实现 node commonJs 模块化, 实现私有变量
  - 保持变量与函数活性, 可延迟回收和执行

### 24. [Immutable.js](https://www.jianshu.com/p/0fa8c7456c15)

Facebook 出品, 倡导数据的不可变性, 用的最多就是 List 和 Map.

### 25. js 实现 instanceof

```
// 检测l的原型链（__proto__）上是否有r.prototype，若有返回true，否则false
function myInstanceof (l, r) {
  var R = r.prototype
  while (l.__proto__) {
    if (l.__proto__ === R) return true
  }
  return false
}
```

### 27. [ES6 的模块引入和 CommonJs 区别](https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html)

### 28. [严格模式](https://www.jianshu.com/p/39e295f4526d)

```
// 严格模式下, 隐式绑定丢失后this不会指向window, 而是指向undefined
      'use strict'
      var a = 2
      var obj = {
        a: 1,
        b: function() {
          // console.log(this.a)
          console.log(this)
        }
      }
      var c = obj.b
      c() // undefined
```

### 30. typescript 缺点

- 并不是严格意义的 js 的超集, 与 js 不完全兼容, 会报错
- 更多的限制, 是一种桎梏
- 有些 js 第三方库没有 dts, 有问题

### 31. 构造函数实现原理（new 操作符做了什么）

- 构造函数中没有显示的创建 Object 对象, 实际上后台自动创建了一个空对象
- 直接给 this 对象赋值属性和方法, this 即指向创建的对象
- 没有 return 返回值, 后台自动返回了该对象
- 该对象继承构造函数的原型

```
// 模拟构造函数实现
var Book = function(name) {
  this.name = name;
};

//正常用法
var java = new Book(‘Master Java’);

//使用代码模拟，在非IE浏览器中测试，IE浏览器不支持
var python = {};
python.__proto__ = Book.prototype;
Book.call(python, 'Master Python');
```

### 32. [for in 和 for of 区别](https://www.jianshu.com/p/c43f418d6bf0)

- `for in`遍历数组会遍历到数组原型上的属性和方法, 更适合遍历对象
- `forEach`不支持`break, continue, return`等
- 使用`for of`可以成功遍历数组的值, 而不是索引, 不会遍历原型
- for in 可以遍历到 myObject 的原型方法 method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery 方法可以判断某属性是否是该对象的实例属性

### 33. JS 实现并发控制:

使用消息队列以及`setInterval`或`promise`进行入队和出队

### 34. [ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

### 35. promise.finally 实现

```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

### 36. [实现 symbol](https://segmentfault.com/a/1190000015262174)

```
(function() {
    var root = this;
    var SymbolPolyfill = function Symbol(description) {
        // Symbol函数前不能使用new命令
        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor')
        // 参数是对象，则调用toString
        var descString = description === undefined ? undefined : String(description)
        var symbol = Object.create({
            // 显示转为字符串
            toString: function() {
                return 'Symbol(' + this.description ')'
            },
            // 不能参与运算
            valueOf: function() {
                throw new Error('Cannot convert a Symbol value')
            }
        })
        // 作为对象键名时，生成一个独一无二名称
        // ES2019新增
        symbol.prototype.description = descString
        // 返回一个新对象 由于指针不同  所以两两不等
        return symbol;
    }
    root.SymbolPolyfill = SymbolPolyfill;
})();
```

[Object.create()创建对象](https://www.jianshu.com/p/28d85bebe599)

### 37. ES6 装饰器

- 提案经过大幅修改，没有定案，可能会变
- 是一种函数，用于改变类或方法的功能，起到注释作用
- 函数：

```
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

- 方法：

```
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

- 先从外到内进入，经过 reverse 倒序后，然后由内向外执行。

### 38. 实现 fetch abort

```
const controller = new AbortController()
setTimeout(() => controller.abort(), 1000);

fetch(url, {
    signal: controller.signal
}).then(res => {
    ...
}, err => {
    console.log(err) // AbortError
})
```

### 39. 使用 xhr 实现 fetch

- fetch 是 ajax 替代品，基于 promise。
- 类似于 jquey ajax，但不是 ajax 封装，而是原生 js,，没有使用 XHR 对象
- 比 ajax 方便，但仍然不完善，建议使用 axios 库
- fetch 有而 axios 没有的问题：
  - 兼容性问题
  - 默认不带 cookie，需要手动设置 credentials
  - 跨域问题，需要手动设置 mode
  - 返回 400、500 不识别为 reject
  - 无法 abort 和 timeout
- 用 XHR 实现 fetch:

```
// 先实现ajax
function ajax(method,url,data,suc,fail) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                suc(xhr.responseText)
            } else {
                console.log(err);
                fail(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

// 再实现promise
function promise () {
  this.msg = '' // 存放value和error
  this.status = 'pending'
  var that = this
  var process = arguments[0]

  process (function () {
    that.status = 'fulfilled'
    that.msg = arguments[0]
  }, function () {
    that.status = 'rejected'
    that.msg = arguments[0]
  })
  return this
}

promise.prototype.then = function () {
  if (this.status === 'fulfilled') {
    arguments[0](this.msg)
  } else if (this.status === 'rejected' && arguments[1]) {
    arguments[1](this.msg)
  }
}

// 最后实现fetch
function fetch(method, url, data) {
    return new promise(function (resolve,reject) {
        ajax(method, url, data, function (res) {
            resolve(res);
        },function (err) {
            reject(err);
        })
    })
}
```

### 40. JS 中数值存储

- javascript 中所有的数值类型都是双精度存储的，使用 **64bit**，64bit 等于 **8byte**
- 中文占 2 个字节（byte） 中文里标点也占 2 个字节（byte） 英文里的子母不分大小写，一个子母占 1 个字节（字节） 英文里的标点占 1 个字节。 1 字节（byte）=8 位（bits）
- 当任何数字在进行位运算时 js 内部会将其转换成 32 位有符号整型

### 41. [this 指向](https://juejin.im/post/5c049e6de51d45471745eb98)：

- 谁调用了方法，该方法的 this 就指向谁;
- 优先级：箭头函数 > new 绑定 > 显示绑定 > 隐式绑定

## 浏览器网络相关

### 1. [reflow(回流)和 repaint(重绘)优化](https://www.jianshu.com/p/40c6fc1d4800)

- 浏览器渲染过程: DOM tree, CSS tree --> Render tree --> Paint
- DOM tree 根节点为 html
- 渲染从浏览器左上角到右下角
- 第一次打开页面至少触发一次重绘和回流, 结构如宽高位置变化时, 触发**reflow 回流**;非结构如背景色变化时, 触发**repaint 重绘**. 二者都会造成体验不佳
- 如何减少重绘和回流?
  - 通过 classname 或 cssText 一次性修改样式, 而非一个一个改
  - 离线模式: 克隆要操作的结点, 操作后再与原始结点交换, 类似于虚拟 DOM
  - 避免频繁直接访问计算后的样式, 而是先将信息保存下来
  - 绝对布局的 DOM, 不会造成大量 reflow
  - div 不要嵌套太深, 不要超过六层

### 2.[一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？](https://www.cnblogs.com/gitbo/p/6597735.html)

- 浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP，向服务器发起请求；
- 服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
- 浏览器对加载到的资源（HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构（如 HTML 的 DOM Tree）；
- 载入解析到的资源文件，渲染页面，完成。

### 3.localStorage 与 sessionStorage 与 cookie 的区别总结

- **共同点**: 都保存在浏览器端, 且同源
- localStorage 与 sessionStorage 统称 webStorage,保存在浏览器,不参与服务器通信,大小为 5M
- **生命周期不同**: localStorage 永久保存, sessionStorage 当前会话, 都可手动清除
- **作用域不同**: 不同浏览器不共享 local 和 session, 不同会话不共享 session
- **Cookie**: 设置的过期时间前一直有效, 大小 4K.有个数限制, 各浏览器不同, 一般为 20 个.携带在 HTTP 头中, 过多会有性能问题.可自己封装, 也可用原生

### 4.浏览器如何阻止事件传播，阻止默认行为

- 阻止事件传播(冒泡): e.stopPropagation()
- 阻止默认行为: e.preventDefault()

### 5.虚拟 DOM 方案相对原生 DOM 操作有什么优点，实现上是什么原理？

虚拟 DOM 可提升性能, 无须整体重新渲染, 而是局部刷新.
JS 对象, diff 算法

### 6.浏览器事件机制中事件触发三个阶段

- **事件捕获阶段**: 从 dom 树节点往下找到目标节点, 不会触发函数
- **事件目标处理函数**: 到达目标节点
- **事件冒泡**: 最后从目标节点往顶层元素传递, 通常函数在此阶段执行.
  addEventListener 第三个参数默认 false(冒泡阶段执行),true(捕获阶段执行).
  阻止冒泡见以上方法

### 7.[什么是跨域？为什么浏览器要使用同源策略？你有几种方式可以解决跨域问题？了解预检请求嘛？](https://segmentfault.com/a/1190000011145364)

- 跨域是指一个域下的文档或脚本试图去请求另一个域下的资源
- 防止 XSS、CSFR 等攻击, 协议+域名+端口不同
- jsonp; 跨域资源共享（CORS）(Access control); 服务器正向代理等

- **预检请求**: 需预检的请求要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响

### 8.[了解浏览器缓存机制吗？](https://www.jianshu.com/p/8b4f3f7bf823)

- 浏览器缓存就是把一个已经请求过的资源拷贝一份存储起来，当下次需要该资源时，浏览器会根据缓存机制决定直接使用缓存资源还是再次向服务器发送请求.
- 作用: 减少网络传输的损耗以及降低服务器压力。
- 缓存位置优先级：Service Worker > Memory Cache > Disk Cache > Push Cache. 都没有命中，就会向服务器发请求
- 策略优先级: 强制缓存 > 协商缓存; cache-control > Expires > Etag > Last-modified

### 9.为什么操作 DOM 慢?

DOM 本身是一个 js 对象, 操作这个对象本身不慢, 但是操作后触发了浏览器的行为, 如 repaint 和 reflow 等浏览器行为, 使其变慢

### 10.什么情况会阻塞渲染？

- js 脚本同步执行
- css 和图片虽然是异步加载, 但 js 文件执行需依赖 css, 所以 css 也会阻塞渲染

### 11.如何判断 js 运行在浏览器中还是 node 中？

判断有无全局对象 global 和 window

### 12.关于 web 以及浏览器处理预加载有哪些思考？

图片等静态资源在使用之前就提前请求
资源使用到的时候能从缓存中加载, 提升用户体验
页面展示的依赖关系维护

### 13.[http 多路复用](https://segmentfault.com/a/1190000011172823)

- **Keep-Alive**: Keep-Alive 解决的核心问题：一定时间内，同一域名多次请求数据，只建立一次 HTTP 请求，其他请求可复用每一次建立的连接通道，以达到提高请求效率的问题。这里面所说的一定时间是可以配置的，不管你用的是 Apache 还是 nginx。
- 解决两个问题: 串行文件传输(采用二进制数据帧); 连接数过多(采用流, 并行传输)

### 14. [http 和 https：](https://www.cnblogs.com/wqhwe/p/5407468.html)

- http: 最广泛网络协议，BS 模型，浏览器高效。
- https: 安全版，通过 SSL 加密，加密传输，身份认证，密钥

1. https 相对于 http 加入了 ssl 层, 加密传输, 身份认证;
2. 需要到 ca 申请收费的证书;
3. 安全但是耗时多，缓存不是很好;
4. 注意兼容 http 和 https;
5. 连接方式不同, 端口号也不同, http 是 80, https 是 443

### 15. [CSRF 和 XSS 区别及防御](https://blog.csdn.net/m0_37631322/article/details/81346335)

### 16. cookie 可设置哪些属性？httponly?

chrome 控制台的 application 下可查看:

- name 　　字段为一个 cookie 的名称。
- value 　　字段为一个 cookie 的值。
- domain 　　字段为可以访问此 cookie 的域名。
- path 　　字段为可以访问此 cookie 的页面路径。 比如 domain 是 abc.com,path 是/test，那么只有/test 路径下的页面可以读取此 cookie。
- expires/Max-Age 　　字段为此 cookie 超时时间。若设置其值为一个时间，那么当到达此时间后，此 cookie 失效。不设置的话默认值是 Session，意思是 cookie 会和 session 一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此 cookie 失效。
- Size 　　字段 此 cookie 大小。
- http 　　字段 cookie 的 httponly 属性。若此属性为 true，则只有在 http 请求头中会带有此 cookie 的信息，而不能通过 document.cookie 来访问此 cookie。
- secure 　　 字段 设置是否只能通过 https 来传递此条 cookie

### 17. 登录后，前端做了哪些工作，如何得知已登录

- 前端存放服务端下发的 cookie, 简单说就是写一个字段在 cookie 中表明已登录, 并设置失效日期
- 或使用后端返回的 token, 每次 ajax 请求将 token 携带在请求头中, 这也是防范 csrf 的手段之一

### 18. [http 状态码](https://www.runoob.com/http/http-status-codes.html)

- 1\*\*: 服务器收到请求, 需请求者进一步操作
- 2\*\*: 请求成功
- 3\*\*: 重定向, 资源被转移到其他 URL 了
- 4\*\*: 客户端错误, 请求语法错误或没有找到相应资源
- 5\*\*: 服务端错误, server error
- 301: 资源(网页等)被永久转移到其他 URL, 返回值中包含新的 URL, 浏览器会自动定向到新 URL
- 302: 临时转移. 客户端应访问原有 URL
- 304: Not Modified. 指定日期后未修改, 不返回资源
- 403: 服务器拒绝执行请求
- 404: 请求的资源(网页等)不存在
- 500: 内部服务器错误

### 19. [Http 请求头缓存设置方法](https://www.cnblogs.com/zhaow/p/7832829.html)

Cache-control, expire, last-modify

### 20. 实现页面回退刷新

- 旧: window.history.back() + window.location.href=document.referrer;
- 新: HTML5 的新 API 扩展了 window.history，使历史记录点更加开放了。可以存储当前历史记录点、替换当前历史记录点、监听历史记录点 onpopstate, replaceState

### 21. [正向代理和反向代理](https://www.cnblogs.com/Anker/p/6056540.html)

- 正向代理:
  （1）访问原来无法访问的资源，如 google
  （2）可以做缓存，加速访问资源
  （3）对客户端访问授权，上网进行认证
  （4）代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息
- 反向代理:
  （1）保证内网的安全，可以使用反向代理提供 WAF 功能，阻止 web 攻击大型网站，通常将反向代理作为公网访问地址，Web 服务器是内网。
  （2）负载均衡，通过反向代理服务器来优化网站的负载

### 22. [关于预检请求](https://www.jianshu.com/p/3a10ac906fd0)

在非简单请求且跨域的情况下，浏览器会自动发起 options 预检请求。

### 23. [三次握手四次挥手](https://www.jianshu.com/p/ad0904df7d76)

- 开启连接用三次握手, 关闭用四次挥手

### 24. TCP 和 UDP 协议

- TCP（Transmission Control Protocol：传输控制协议；面向连接，可靠传输
- UDP（User Datagram Protocol）：用户数据报协议；面向无连接，不可靠传输

### 25. [进程和线程的区别](https://www.cnblogs.com/zhuzhu2016/p/5804875.html)

- 进程：是并发执行的程序在执行过程中分配和管理资源的基本单位，是一个动态概念，竞争计算机系统资源的基本单位。
- 线程：是进程的一个执行单元，是进程内科调度实体。比进程更小的独立运行的基本单位。线程也被称为轻量级进程。
- 一个程序至少一个进程，一个进程至少一个线程。

## vue 相关

### 1.[ 生命周期](http://baijiahao.baidu.com/s?id=1603406094025961442&wfr=spider&for=pc)

### 2 .双向数据绑定 v-model。这个最好也是自己实现一下 理解更深

通过 v-model
VUE 实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的。

```
// 依赖收集
// 简化版
var obj = { }
var name
//第一个参数：定义属性的对象。
//第二个参数：要定义或修改的属性的名称。
//第三个参数：将被定义或修改的属性描述符。
Object.defineProperty(obj, "data", {
  //获取值
  get: function () {
    return name
  },
  //设置值
  set: function (val) {
    name = val
    console.log(val)
  }
})
//赋值调用set
obj.data = 'aaa'
//取值调用get
console.log(obj.data)

// 详细版
 myVue.prototype._obverse = function (obj) { // obj = {number: 0}
    var value;
    for (key in obj) {  //遍历obj对象
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        if (typeof value === 'object') {  //如果值是对象，则递归处理
          this._obverse(value);
        }
        Object.defineProperty(this.$data, key, {  //关键
          enumerable: true,
          configurable: true,
          get: function () {
            console.log(`获取${value}`);
            return value;
          },
          set: function (newVal) {
            console.log(`更新${newVal}`);
            if (value !== newVal) {
              value = newVal;
            }
          }
        })
      }
    }
  }
```

### 3.vue 父子组件传递参数

- 父 -->子: 通过 props
- 子 -->父: 通过 $$refs 或 $emit

### 4.[vue 传递参数方法](https://www.imooc.com/article/257885)

- 父子组件传参如上, v-bind : v-on @
- 兄弟组件传参:(通过 EventBus 事件总线实现)

```
// 1. 新建eventBus.js
import Vue from 'vue'
export default new Vue
// 或直接在main.js中初始化EventBus(全局)
Vue.prototype.$EventBus = new Vue()

// 2. 发射与接收
// 如果是定义在eventBus.js中
import eventBus from 'eventBus.js'
eventBus.$emit()
eventBus.$on()

// 如果是定义在main.js中
this.bus.$emit()
this.bus.$on()

// 3. 移除监听
eventBus.$off()
```

### 5.vue 自定义组件

可以使用独立可复用的自定义组件来构成大型应用, 采用帕斯卡命名法或横线连接, 通过以上方式进行组件间通信. 每一个组件都是 Vue 实例, 可以使用生命周期钩子.

### 6. [vue 自定义指令](http://baijiahao.baidu.com/s?id=1603883371090691442&wfr=spider&for=pc)

- 除核心指令之外的指令, 使用 directive 进行注册.
- 指令自定义钩子函数: bind, inserted, update, componentUpdated, unbind

### 7.[vuex 组成和原理](https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc)

- 组成: 组件间通信, 通过 store 实现全局存取
- 修改: 唯一途径, 通过 commit 一个 mutations(同步)或 dispatch 一个 actions(异步)
- 简写: 引入 mapState、mapGetters、mapActions

### 8.vue-router 的原理，例如 hashhistory 和 History interface 这些东西要弄明白。其实看一下源码就好了，看不懂可以直接看解析的相关技术博客。

- [vue-router 用法](https://www.jianshu.com/p/e8b2529e472c):
  在 router.js 或者某一个路由分发页面配置 path, name, component 对应关系
  - 每个按钮一个 value, 在 watch 功能中使用 this.$router.push 实现对应跳转, 类似 react 的 this.history.push
  - 或直接用 router-link to 去跳转, 类似 react 的 link to
- [vue-router 原理](https://www.jianshu.com/p/4295aec31302): 通过**hash**和**History interface**两种方式实现前端路由
  - HashHistory: 利用 URL 中的 hash（“#”）;replace()方法与 push()方法不同之处在于，它并不是将新路由添加到浏览器访问历史的栈顶，而是替换掉当前的路由
  - History interface: 是浏览器历史记录栈提供的接口，通过 back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作. pushState(), replaceState() 这下不仅是读取了，还可以对浏览器历史记录栈进行修改

### 9.vue 的 seo 问题

seo 关系到网站排名, vue 搭建 spa 做前后端分离不好做 seo, 可通过其他方法解决:

- [SSR 服务端渲染](https://ssr.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F): 将同一个组件渲染为服务器端的 HTML 字符串.利于 seo 且更快.
- vue-meta-info, nuxt, prerender-spa-plugin 页面预渲染等

### 10.预渲染和 ssr

以上

### 11.生命周期内 create 和 mounted 的区别

- **created**: 在模板渲染成 html 前调用，即通常初始化某些数据，然后再渲染成视图。
- **mounted**: 在模板渲染成 html 后调用，通常是初始化页面完成后，再对 html 的 dom 节点进行一些需要的操作和方法。

### 12.监听 watch

对应一个对象，键是观察表达式，值是对应回调。值也可以是 methods 的方法名，或者是对象，包含选项。在实例化时为每个键调用 $watch()

### 13.登录验证拦截(通过 router)

- 先设置 requireAuth:

```
routes = [
    {
        name: 'detail',
        path: '/detail',
        meta: {
            requireAuth: true
        }
    },
    {
        name: 'login',
        path: '/login'
    }
]
```

- 再配置 router.beforeEach:

```
router.beforeEach((from, to, next) => {
    if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
        if (store.state.token) { // vuex.state判断token是否存在
            next() // 已登录
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
       next()
    }
})
```

### 14. v-for key 值

不写 key 值会报 warning, 和 react 的 array 渲染类似. 根据 diff 算法, 修改数组后, 写 key 值会复用, 不写会重新生成, 造成性能浪费或某些不必要的错误

### 15. [vue3.0 的更新和 defineProperty 优化](https://www.oschina.net/news/101906/vue-3-0-updates?from=singlemessage)

- 放弃 Object.defineProperty ，使用更快的原生 Proxy (访问对象拦截器, 也称代理器)
- 提速, 降低内存使用, Tree-shaking 更友好
- 支持 IE11 等
- 使用 Typescript

### 15. vue 使用 this 获取变量

正常要通过 vm.$options.data访问，但实例vm会遍历data中的变量，并挂在到this上， this.$root 传参取值

### 16. [jQuery 的优缺点，与 vue 的不同，vue 的优缺点？](https://www.jianshu.com/p/131c0d04dc1b)

- jq 优点: 比原生 js 更易书写, 封装了很多 api, 有丰富的插件库; 缺点: 每次升级与之前版本不兼容, 只能手动开发, 操作 DOM 很慢, 不方便, 变量名污染, 作用域混淆等.
- vue 优缺点: 双向绑定, 虚拟 DOM, diff 算法, MVVM, 组件化, 通信方便, 路由分发等

### 17. vue 解除双向绑定

`let obj = JSON.parse(JSON.stringify(this.temp1));`

### 18. vue 异步组件

为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染

```
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

### 19. [MVC 与 MVVM](http://baijiahao.baidu.com/s?id=1596277899370862119&wfr=spider&for=pc)

- model-数据层 view-视图层 controller-控制层
- MVC 的目的是实现 M 和 V 的分离，单向通信，必须通过 C 来承上启下
- MVVM 中通过 VM（vue 中的实例化对象）的发布者-订阅者模式实现双向绑定，数据绑定，dom 事件监听
- 区别：MVC 和 MVVM 的区别并不是 VM 完全取代了 C，ViewModel 存在目的在于抽离 Controller 中展示的业务逻辑，而不是替代 Controller，其它视图操作业务等还是应该放在 Controller 中实现。也就是说 MVVM 实现的是业务逻辑组件的重用

### 20. vue 渐进式

小到可以只使用核心功能，比如单文件组件作为一部分嵌入；大到使用整个工程，vue init webpack my-project 来构建项目；VUE 的核心库及其生态系统也可以满足你的各式需求（core+vuex+vue-route）

## react 相关

### 1. [新旧生命周期](https://segmentfault.com/a/1190000016617400)

- **旧**: will, did; mount, update...
- **新**: 16 版本之后:
  - `getDerivedStateFromProps`: 虚拟 dom 之后，实际 dom 挂载之前, 每次获取新的 props 或 state 之后, 返回新的 state, 配合 didUpdate 可以替代 willReceiveProps
  - `getSnapshotBeforeUpdate`: update 发生的时候，组件更新前触发, 在 render 之后，在组件 dom 渲染之前；返回一个值，作为 componentDidUpdate 的第三个参数；配合 componentDidUpdate, 可以覆盖 componentWillUpdate 的所有用法
  - `componentDidCatch`: 错误处理
- **对比**: 弃用了三个 will, 新增两个 get 来代替 will, 不能混用, 17 版本会彻底删除. 新增错误处理

### 2. react 核心

- [虚拟 DOM, Diff 算法, 遍历 key 值](http://www.cnblogs.com/mahmud/p/10099672.html)
- react-dom: 提供了针对 DOM 的方法，比如：把创建的虚拟 DOM，渲染到页面上 或 配合 ref 来操作 DOM
- react-router

### 3. fiber 核心(react 16)

- 旧: 浏览器渲染引擎单线程, 计算 DOM 树时锁住整个线程, 所有行为同步发生, 有效率问题, 期间 react 会一直占用浏览器主线程，如果组件层级比较深，相应的堆栈也会很深，长时间占用浏览器主线程, 任何其他的操作（包括用户的点击，鼠标移动等操作）都无法执行
- 新: 重写底层算法逻辑, 引入 fiber 时间片, 异步渲染, react 会在渲染一部分树后检查是否有更高优先级的任务需要处理(如用户操作或绘图), 处理完后再继续渲染, 并可以更新优先级, 以此管理渲染任务. 加入 fiber 的 react 将组件更新分为两个时期（phase 1 && phase 2），render 前的生命周期为 phase1，render 后的生命周期为 phase2, 1 可以打断, 2 不能打断一次性更新. 三个 will 生命周期可能会重复执行, 尽量避免使用

### 4. 渲染一个 react

- 分为首次渲染和更新渲染
- 生命周期, 建立虚拟 DOM, 进行 diff 算法
- 对比新旧 DOM, 节点对比, 将算法复杂度从 O(n^3)降低到 O(n)
- key 值优化, 避免用 index 作为 key 值, 兄弟节点中唯一就行

### 5. 高阶组件

高阶组件就是一个函数，且该函数(wrapper)接受一个组件作为参数，并返回一个新的组件。
高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不关心数据来自何处.

- [react-dnd](https://segmentfault.com/a/1190000004006185?_ea=457266): 根组件, source, target 等
  `export default DragSource(type, spec, collect)(MyComponent)`
- 重构代码库使用 HOC 提升开发效率

### 6. hook(v16.7 测试)

在无状态组件(如函数式组件)中也能操作 state 以及其他 react 特性, 通过 useState

### 7. redux 和 vuex 以及 dva：

- redux: 通过 store 存储，通过 action 唯一更改，reducer 描述如何更改。dispatch 一个 action
- dva: 基于 redux，结合 redux-saga 等中间件进行封装
- vuex：类似 dva，集成化。action 异步，mutation 非异步

### 8. [react 和 vue 的区别](https://www.jianshu.com/p/b7cd52868e95?from=groupmessage)

- **数据是否可变**: react 整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在 react 中，是单向数据流，推崇结合 immutable 来实现数据不可变; vue 的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立 Watcher 来监听，当属性变化的时候，响应式的更新对应的虚拟 dom。总之，react 的性能优化需要手动去做，而 vue 的性能优化是自动的，但是 vue 的响应式机制也有问题，就是当 state 特别多的时候，Watcher 也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用 react，更加可控。
- **通过 js 来操作一切，还是用各自的处理方式**: react 的思路是 all in js，通过 js 来生成 html，所以设计了 jsx，还有通过 js 来操作 css，社区的 styled-component、jss 等; vue 是把 html，css，js 组合到一起，用各自的处理方式，vue 有单文件组件，可以把 html、css、js 写到一个文件中，html 提供了模板引擎来处理。
- **类式的组件写法，还是声明式的写法**: react 是类式的写法，api 很少; 而 vue 是声明式的写法，通过传入各种 options，api 和参数都很多。所以 react 结合 typescript 更容易一起写，vue 稍微复杂。
- **扩展不同**: react 可以通过高阶组件（Higher Order Components--HOC）来扩展，而 vue 需要通过 mixins 来扩展
- **什么功能内置，什么交给社区去做**: react 做的事情很少，很多都交给社区去做，vue 很多东西都是内置的，写起来确实方便一些，
  比如 redux 的 combineReducer 就对应 vuex 的 modules，
  比如 reselect 就对应 vuex 的 getter 和 vue 组件的 computed，
  vuex 的 mutation 是直接改变的原始数据，而 redux 的 reducer 是返回一个全新的 state，所以 redux 结合 immutable 来优化性能，vue 不需要。

### 9. react 单向数据流怎么理解

React 是单向数据流，数据主要从父节点传递到子节点（通过 props）。如果顶层（父级）的某个 props 改变了，React 会重渲染所有的子节点。

### 10. React 算法复杂度优化

react 树对比是按照层级去对比的， 他会给树编号 0,1,2,3,4.... 然后相同的编号进行比较。 所以复杂度是 n，这个好理解。

关键是传统 diff 的复杂度是怎么算的？ 传统的 diff 需要出了上面的比较之外，还需要跨级比较。 他会将两个树的节点，两两比较，这就有 n^2 的复杂度了。 然后还需要编辑树，编辑的树可能发生在任何节点，需要对树进行再一次遍历操作，因此复杂度为 n。加起来就是 n^3 了。

### 11. React 优点

声明式, 组件化, 一次学习, 随处编写. 灵活, 丰富, 轻巧, 高效

### 12. React 事件机制

- 合成事件：
  - 根据事件类型，采用不同的`SyntheticEvent`来构造不同的合成事件
  - `syntheticEvent` 和原生浏览器事件一样拥有同样的接口，也支持事件冒泡机制。可以通过`stopPropgation`和`preventDefault`中断
  - 如果需要访问原生事件对象，可以使用`nativeEvent`属性
- 实现机制：
  - react 的事件机制利用了事件委托机制
  - 没有绑定在真实的 dom 节点上，而是把事件都绑定在结构的最外层 document，统一由这个监听器分发
  - 注册：组件挂载和更新时，将绑定事件分类放入`EventPluginHub`事件池
  - 触发：根据事件产生的 Event 对象找到触发事件的组件，再通过组件标识和事件类型从事件池里找到对应的事件监听回调并执行
- react 中使用原生
  - 在`didmount`中对真实 dom 进行原生绑定，在`unmount`解绑，防止内存泄漏
  - `syntheticEvent`的`stopPropgation`无法阻止原生事件的冒泡，但原生可以组织合成，所以尽量不要混用，除非使用 e.target 判断
- 异步回调使用`syntheticEvent`：
  - 合成事件里，回调执行后会销毁事件对象
  - 异步回调需使用`event.persist()`告诉 react 不要回收
- 与原生冒泡捕获对比：
  - 原生的捕获机制并不常用，且具有 ie 的不兼容问题
  - react 仅实现冒泡机制，无兼容问题，只有`document`节点上才有 DOM 事件也节约了内存
- 事件执行：
  1. 找到事件触发的`DOM`和`React Component`，调用`findParent`方法
  2. 遍历得到所有父组件，存在数组中
  3. 从该组件直到最后一个父组件，根据之前事件存储，用 React 事件名 + 组件 key，找到对应绑定回调方法

## 移动端相关

### 1. 移动端兼容适配

- ` <meta name="viewport" content="width=device-width, initial-scale=1.0">`
- rem, em, 百分比
- 框架的栅格布局
- media query 媒体查询
- 手淘团队的一套 flexible.js, 自动判断 dpr 进行整个布局视口的放缩

### 2. flexible 如何实现自动判断 dpr

判断机型, 找出样本机型去适配. 比如 iphone 以 6 为样本, 宽度 375px, dpr 是 2

### 3. 为什么以 iPhone6 为标准的设计稿的尺寸是以 750px 宽度来设计的呢？

iPhone6 的满屏宽度是 375px，而 iPhone6 采用的视网膜屏的物理像素是满屏宽度的 2 倍，也就是 dpr(设备像素比)为 2, 并且设计师所用的 PS 设计软件分辨率和像素关系是 1:1。所以为了做出的清晰的页面，设计师一般给出 750px 的设计图，我们再根据需求对元素的尺寸设计和压缩。

### 4. [如何处理异形屏 iphone X](https://blog.csdn.net/qq_42354773/article/details/81018615)

- `safe area`: 默认放置在安全区域以避免遮挡, 但会压缩
- 在 meta 中添加`viewport-fit=cover`: 告诉浏览器要讲整个页面渲染到浏览器中，不管设备是圆角与否，这个时候会造成页面的元素被圆角遮挡
- `padding: constant(env)`: 解决遮挡问题

### 5. 移动端首屏优化

- 采用服务器渲染 ssr
- 按需加载配合[webpack 分块打包](https://www.jb51.net/article/119160.htm), 通过 entry 和 commonChunkPlugin
- 很有必要将 script 标签 ➕ 异步
- 有轮播图 最好给个默认 另外要处理图片懒加载
- [打包线上也要注意去掉 map 文件](https://www.jianshu.com/p/bd202dca29ad)
- 组件, 路由懒加载
- webpack 的一切配置 肯定是必须的
- 压缩图片 [https://tinypng.com/](https://tinypng.com/)
- 建议还是用 webpack 的图片压缩插件
- 骨架屏
- Loading 页面

### 6. [PWA 全称 Progressive Web App，即渐进式 WEB 应用](https://segmentfault.com/a/1190000012353473?utm_source=tag-newest)

一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能
解决了哪些问题？

- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
- 实现了消息推送
  它解决了上述提到的问题，这些特性将使得 Web 应用渐进式接近原生 App。

### 7. 离线包方案

现在 web 页面在移动端的地位越来越高，大部分主流 App 采用 native + webview 的 hybrid 模式，加载远程页面受限于网络，本地 webview 引擎，经常会出现渲染慢导致的白屏现象，体验很差，于是离线包方案应运而生。动态下载的离线包可以使得我们不需要走完整的 App 审核发布流程就完成了版本的更新

### 8. [自适应和响应式布局的区别](https://baijiahao.baidu.com/s?id=1627060039271152391&wfr=spider&for=pc)

1. 自适应布局通过检测视口分辨率，来判断当前访问的设备是：pc 端、平板、手机，从而请求服务层，返回不同的页面；响应式布局通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容。

2. 自适应布局需要开发多套界面，而响应式布局只需要开发一套界面就可以了。

3. 自适应对页面做的屏幕适配是在一定范围：比如 pc 端一般要大于 1024 像素，手机端要小于 768 像素。而响应式布局是一套页面全部适应。

4. 自适应布局如果屏幕太小会发生内容过于拥挤。而响应式布局正是为了解决这个问题而衍生出的概念，它可以自动识别屏幕宽度并做出相应调整的网页设计。

## 插件及工具相关

### 1. [babel 和 polyfill](http://www.cnblogs.com/zhansu/p/8305081.html)

- `Babel`: Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码。注意：Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API

- `Polyfill`: Polyfill 的准确意思为，用于实现浏览器并不支持的原生 API 的代码。

### 2. jpg, jpeg 和 png 区别

- jpg 是 jpeg 的缩写, 二者一致
- PNG 就是为取代 GIF 而生的, 无损压缩, 占用内存多
- jpg 牺牲图片质量, 有损, 占用内存小
- PNG 格式可编辑。如图片中有字体等，可利用 PS 再做更改。JPG 格式不可编辑

### 3. [git rebase 和 merge 区别](https://www.jianshu.com/p/4079284dd970)

# 前端性能优化

1. 减少 HTTP 请求（合并 css、js，雪碧图/base64 图片）
2. 压缩（css、js、图片皆可压缩,使用 webpack uglify 和 svg）
3. 样式表放头部，脚本放底部
4. 使用 CDN（这部分，不少前端都不用考虑，负责发布的兄弟可能会负责搞好）
5. http 缓存
6. bosify 图片压缩: 根据具体情况修改图片后缀或格式 后端根据格式来判断存储原图还是缩略图
7. 懒加载, 预加载
8. 替代方案: 骨架屏, SSR
9. [webpack 优化](https://segmentfault.com/a/1190000015883378?utm_source=tag-newest)

## 原生通信

### 1.[JSBridge 通信原理, 有哪几种实现的方式？](https://blog.csdn.net/u014021258/article/details/81129702)

JsBridge 给 JavaScript 提供了调用 Native 功能，Native 也能够操控 JavaScript。这样前端部分就可以方便使用地理位置、摄像头以及登录支付等 Native 能力啦。JSBridge 构建 Native 和非 Native 间消息通信的通道，而且是 双向通信的通道。

- JS 向 Native 发送消息 : 调用相关功能、通知 Native 当前 JS 的相关状态等。
- Native 向 JS 发送消息 : 回溯调用结果、消息推送、通知 JS 当前 Native 的状态等。

  2.实现一个简单的 JSBridge，设计思路？

## 算法相关

### 1. [二分查找和冒泡排序](https://www.cnblogs.com/tine/p/5938844.html)

- 二分查找: 递归(分左右, 传递 start,end 参数)和非递归(使用 while(l < h))；要求有序数组
- 冒泡排序: 两个 for 循环

### 2. [快速排序](https://www.jianshu.com/p/e394f7012d75)

```
function quickSort (arr) {
  if (arr.length < 2) return arr
  var middle = Math.floor(arr.length / 2)
  var flag = arr.splice(middle, 1)[0]
  var left = [],
        right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([flag], quickSort(right))
}
```

### 3. 最长公共子串

```
function findSubStr(str1, str2) {
        if (str1.length > str2.length) {
          [str1, str2] = [str2, str1]
        }
        var result = ''
        var len = str1.length
        for (var j = len; j > 0; j--) {
          for (var i = 0; i < len - j; i++) {
            result = str1.substr(i, j)
            if (str2.includes(result)) return result
          }
        }
      }
      console.log(findSubStr('aabbcc11', 'ppooiiuubcc123'))
```

### 4. [最长公共子序列(LCS 动态规划)](https://juejin.im/post/5b0c2583f265da08f50b4b33#heading-0)

[另一篇](https://segmentfault.com/a/1190000012864957)

```
// dp[i][j] 计算去最大长度，记住口诀：相等左上角加一，不等取上或左最大值
function LCS(str1, str2){
        var rows =  str1.split("")
        rows.unshift("")
        var cols =  str2.split("")
        cols.unshift("")
        var m = rows.length
        var n = cols.length
        var dp = []
        for(var i = 0; i < m; i++){
            dp[i] = []
            for(var j = 0; j < n; j++){
                if(i === 0 || j === 0){
                    dp[i][j] = 0
                    continue
                }

                if(rows[i] === cols[j]){
                    dp[i][j] = dp[i-1][j-1] + 1 //对角＋1
                }else{
                    dp[i][j] = Math.max( dp[i-1][j], dp[i][j-1]) //对左边，上边取最大
                }
            }
            console.log(dp[i].join(""))//调试
        }
        return dp[i-1][j-1]
    }
//!!!如果它来自左上角加一，则是子序列，否则向左或上回退。
//findValue过程，其实就是和 就是把T[i][j]的计算反过来。
// 求最长子序列
function findValue(input1,input2,n1,n2,T){
	var i = n1-1,j=n2-1;
	var result = [];//结果保存在数组中
	console.log(i);
	console.log(j);
	while(i>0 && j>0){
		if(input1[i] == input2[j]){
			result.unshift(input1[i]);
			i--;
			j--;
		}else{
			//向左或向上回退
			if(T[i-1][j]>T[i][j-1]){
				//向上回退
				i--;
			}else{
				//向左回退
				j--;
			}
		}

	}

	console.log(result);
}
```

### 5. [数组去重，多种方法](https://www.cnblogs.com/guangyan/articles/6682686.html)

- 双 for 循环, splice 剔除并 i--回退
- indexOf 等于 index
- filter indexOf === index
- 新数组 indexOf === index
- 使用空对象等

### 6. 实现一个函数功能：sum(1,2,3,4..n)转化为 sum(1)(2)(3)(4)…(n)

```
// 使用柯里化 + 递归
function curry ( fn ) {
  var c = (...arg) => (fn.length === arg.length) ?
          fn (...arg) : (...arg1) => c(...arg, ...arg1)
  return c
}
```

[柯里化参考我的另一篇](https://www.jianshu.com/p/7fa99a4bee8b)

### 7. 反转二叉树

此题充满了嘲讽。。

```
var invertTree = function (root) {
  if (root !== null) {
    [root.left, root.right] = [root.right, root.left]
    invertTree(root.left)
    invertTree(root.right)
  }
  return root
}
```

### 8. 贪心算法解决背包问题

问题：给定背包容积，如何存放不同重量和价值物品，能获得最大价值？

```
var items = ['A','B','C','D'] // 物品编号
var values = [50,220,60,60] // 物品价值
var weights = [5,20,10,12] // 物品重量
var capacity = 32 // 背包容积

greedy(values, weights, capacity) // 320

function greedy(values, weights, capacity) {
        var result = 0
        var rest = capacity
        var sortArray = []
        var num = 0
        values.forEach((v, i) => {
          sortArray.push({
            value: v,
            weight: weights[i],
            ratio: v / weights[i]
          })
        })
        // 按照性价比降序排序
        sortArray.sort((a, b) => b.ratio - a.ratio)
        sortArray.forEach((v, i) => {
          num = parseInt(rest / v.weight)
          rest -= num * v.weight
          result += num * v.value
        })
        return result
      }
```

### 9. 输入一个递增排序的数组和一个数字 S，在数组中查找两个数，使得他们的和正好是 S，如果有多对数字的和等于 S，输出两个数的乘积最小的。

```
function FindNumbersWithSum(array, sum)
{
    var index = 0
    for (var i = 0; i < array.length - 1 && array[i] < sum / 2; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === sum) return [array[i], array[j]]
        }
        //index = array.indexOf(sum - array[i], i + 1)
       // if (index !== -1) {
       //     return [array[i], array[index]]
        //}
    }
    return []
```

### 10. [二叉树各种(层序)遍历](https://www.jianshu.com/p/3eee17f3c6f4)

[深度广度遍历](https://www.jianshu.com/p/5e9ea25a1aae)

```
// 根据前序和中序重建二叉树
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin)
{
    var result = null
    if (pre.length === 1) {
        result = {
            val: pre[0],
            left: null,
            right: null
        }
    } else if (pre.length > 1) {
        var root = pre[0]
        var vinRootIndex = vin.indexOf(root)
        var vinLeft = vin.slice(0, vinRootIndex)
        var vinRight = vin.slice(vinRootIndex + 1, vin.length)
        pre.shift()
        var preLeft = pre.slice(0, vinLeft.length)
        var preRight = pre.slice(vinLeft.length, pre.length)
        result = {
            val: root,
            left: reConstructBinaryTree(preLeft, vinLeft),
            right: reConstructBinaryTree(preRight, vinRight)
        }
    }
    return result
}

// 递归
// 前序遍历
function prevTraverse (node) {
  if (node === null) return;

  console.log(node.data);
  prevTraverse(node.left);
  prevTraverse(node.right);
}

// 中序遍历
function middleTraverse (node) {
  if (node === null) return;

  middleTraverse(node.left);
  console.log(node.data);
  middleTraverse(node.right);
}

// 后序遍历
function lastTraverse (node) {
  if (node === null) return;

  lastTraverse(node.left);
  lastTraverse(node.right);
  console.log(node.data);
}

// 非递归
// 前序遍历
function preTraverse(tree) {
        var arr = [],
          node = null
        arr.unshift(tree)
        while (arr.length) {
          node = arr.shift()
          console.log(node.root)
          if (node.right) arr.unshift(node.right)
          if (node.left) arr.unshift(node.left)
        }
      }

// 中序遍历
function middleTraverseUnRecursion (root) {
  let arr = [],
      node = root;

  while (arr.length !== 0 || node !== null) {
    if (node === null) {
      node = arr.shift();
      console.log(node.data);
      node = node.right;
    } else {
      arr.unshift(node);
      node = node.left;
    }
  }

}

// 广度优先-层序遍历
// 递归
var result = []
var stack = [tree]
var count = 0
var bfs = function () {
  var node = stack[count]
  if (node) {
    result.push(node.value)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
    count++
    bfs()
  }
}
bfs()
console.log(result)
// 非递归
function bfs (node) {
  var result = []
  var queue = []
  queue.push(node)
  while (queue.length) {
    node = queue.shift()
    result.push(node.value)
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }
  return result
}
```

### 11. [各种排序](https://www.jianshu.com/p/7e6589306a27)

```
// 插入排序
function insertSort(arr) {
        var temp
        for (var i = 1; i < arr.length; i++) {
          temp = arr[i]
          for (var j = i; j > 0 && temp < arr[j - 1]; j--) {
            arr[j] = arr[j - 1]
          }
          arr[j] = temp
        }
        return arr
      }
      console.log(insertSort([3, 1, 8, 2, 5]))

// 归并排序
function mergeSort(array) {
        var result = array.slice(0)
        function sort(array) {
          var length = array.length
          var mid = Math.floor(length * 0.5)
          var left = array.slice(0, mid)
          var right = array.slice(mid, length)
          if (length === 1) return array
          return merge(sort(left), sort(right))
        }
        function merge(left, right) {
          var result = []

          while (left.length || right.length) {
            if (left.length && right.length) {
              if (left[0] < right[0]) {
                result.push(left.shift())
              } else {
                result.push(right.shift())
              }
            } else if (left.length) {
              result.push(left.shift())
            } else {
              result.push(right.shift())
            }
          }
          return result
        }
        return sort(result)
      }
      console.log(mergeSort([5, 2, 8, 3, 6]))

// 二分插入排序
function twoSort(array) {
        var len = array.length,
          i,
          j,
          tmp,
          low,
          high,
          mid,
          result
        result = array.slice(0)
        for (i = 1; i < len; i++) {
          tmp = result[i]
          low = 0
          high = i - 1
          while (low <= high) {
            mid = parseInt((high + low) / 2, 10)
            if (tmp < result[mid]) {
              high = mid - 1
            } else {
              low = mid + 1
            }
          }
          for (j = i - 1; j >= high + 1; j--) {
            result[j + 1] = result[j]
          }
          result[j + 1] = tmp
        }
        return result
      }
      console.log(twoSort([4, 1, 7, 2, 5]))
```

### 12. [使用尾递归对斐波那契优化](http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```
// 传统递归斐波那契, 会造成超时或溢出
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

// 使用尾递归优化, 可规避风险
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

### 13. 两个升序数组合并为一个升序数组

```
function sort (A, B) {
  var i = 0, j = 0, p = 0, m = A.length, n = B.length, C = []
  while (i < m || j < n) {
    if (i < m && j < n) {
      C[p++] = A[i] < B[j] ? A[i++] : B[j++]
    } else if (i < m) {
      C[p++] = A[i++]
    } else {
      C[p++] = B[j++]
    }
  }
  return C
}
```

## node 相关

### 1. node 的 router 是什么

### 2. 数据库索引是啥

- 狭义上: 索引是数据库针对每条数据自动生成的内部唯一 id 标识, 用以快速搜索定位数据
- 广义上: 是数据库根据每条数据形成的关键字, 将划分为树形结构, 便于 sql 语句对数据的查找, 使算法复杂度降低到 O(logn)

### 3. [浏览器的事件循环和 node 事件循环有什么区别？](https://www.jianshu.com/p/b221e6e36dcb)

微任务执行时机不同：
Node 环境：微任务在事件循环的各个阶段的 空隙（中间）执行
浏览器：微任务在事件循环的宏任务执行完后执行

### 4. 关于 buffer

- node 中的核心对象：`Buffer.from(str)`
- 用来存储二进制数据的类数组
- 用两位十六进制数表示一个字符的`unicode`编码
- 连续存储空间，快
- 1 byte = 8 bit
- 英文字符 1 byte, 中文字符 2 byte

# 计算机基础

- 硬件：
  - CPU 是人的大脑，负责运算
  - 内存是人的记忆，负责临时存储
  - 硬盘是人的笔记本，负责永久存储
  - 输入设备是人的耳朵或眼睛，负责接受外部的信息传给 CPU
  - 以上所有的设备都通过总线连接，总线相当于人的神经
- 数据结构与算法：
  - 算法：
    - 定义：解决具体问题所需要的解决方法。
    - 最优算法：执行效率最快的，时间复杂度最低。
    - 特征：输入，输出，有穷性，确定性，可行性。
    - 类型：冒泡排序，二叉树遍历，最长回文，二分查找，指针，链表等，堆栈，队列等。
    - 途径：力扣，codewar，算法导论。
  - 数据结构：
    - 逻辑结构：集合、线性、树形、图形结构
    - 物理结构：顺序、链式存储结构
- 操作系统：
  - 定义：管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石
  - 功能：
    - 管理与配置内存
    - 决定系统资源供需的优先次序
    - 控制输入设备与输出设备
    - 操作网络
    - 管理文件系统
- 数据库：
  - 关系型数据库比如 MySQL、SQLServer、Oracle
  - 非关系型数据库 mongodb
- 计算机组成原理：硬件和软件
- 计算机网络：
  - 定义：一些相互连接的、以共享资源为目的的、自治的计算机的集合
  - 组成：计算机、网络操作系统、传输介质以及相应的应用软件四部分
  - 功能：数据通信、资源共享、集中管理、分布式处理、负载均衡
  - 分类：局域网 LAN、无线网
  - 网络协议 TCP/IP
