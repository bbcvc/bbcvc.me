---
title: css知识点总结
tag: css
---

[[TOC]]

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

```
// 通过设置border
.box
        {
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

```
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

```
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
