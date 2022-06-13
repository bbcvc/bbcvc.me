---
title: 片断
---

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
