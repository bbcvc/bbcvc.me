---
title: 片断
---
## js的label语句
```js
let str = '';

loop1:
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str);
// expected output: "0234"
```
可实现类似于goto语句的效果

MDN🔗：[MDN label statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

## git空提交 触发ci
```bash
git commit --allow-empty -m "empty commit"
```

## 网页读取文件
```js
function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    // 文件里的文本会在这里被打印出来
    console.log(event.target.result)
  };

  reader.readAsText(file);
}
```
此方法依赖浏览器的文件读取API来读取文件，并将文件内容赋值给文本框。

MDN🔗：[MDN FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

## importmap
```html
<script type="importmap">
  {
    "imports": {
      "module1": "https://unpkg.com/module1.js", 
      // or array
      "module2": [
        "https://unpkg.com/module1.js",
        "/node_modules/module2.js"
      ]
      // ...
    }
  }
</script>
```
使用importmap引入资源，然后可以这样使用
```html
<script type="module">
  import { a } from 'module1'
<script>
```
ES Module以成为现在浏览器一个新的特性，主流浏览器都实现了较好的支持。使用importmap对引入文件实现映射，配和ESM可实现与工程模式相似的开发体验。

兼容情况: [importmap](https://caniuse.com/?search=importmap)
> 对于不支持 import-maps 的浏览器， 可以使用 es-module-shims 进行处理。

# clashx规则配置
此界面用于增加和删减配置文件中的规则，目前 Clash 支持的规则类型如下：

DOMAIN-SUFFIX：域名后缀匹配
DOMAIN：域名匹配
DOMAIN-KEYWORD：域名关键字匹配
IP-CIDR：IP 段匹配
SRC-IP-CIDR：源 IP 段匹配
GEOIP：GEOIP 数据库（国家代码）匹配
DST-PORT：目标端口匹配
SRC-PORT：源端口匹配
PROCESS-NAME：源进程名匹配
RULE-SET：Rule Provider 规则匹配
MATCH：全匹配

<ClientOnly>
  <Plum/>
</ClientOnly>
