---
title: display设置小记
tag: h5c3
date: 2022-08-12T16:00:00Z
---

[[TOC]]

### 一. block 块元素
特点：
1. 可设置宽高
2. 元素默认独占一行
3. 设置margin，padding

### 二. line 行内元素
特点：
1. 不可设置宽高
2. 上下margin，padding有效，左右无效。

### 三. line-block 行内块
特点：
1. 可设置宽高
2. padding，margin有效

### 四. flex 弹性布局
#### 给父元素设置
1. flex-direction: row | row-reverse | column | column-reverse;
`flex-direction`用来控制子项布局方式，或是轴的方向
2. flex-wrap: nowrap | wrap | wrap-reverse;
`flex-wrap`控制子项是否换行显示
> 以上两行可缩写为 `flex-flow: <flex-direction> | <flex-warp>`
3. justify-content: flex-start | flex-end | center  | space-xxx
`justify-content`属性决定了水平方向子项的对齐和分布方式
4. align-item: stretch | flex-start | flex-xxx
与`justify-content`类似的，决定了子项在垂直方向的排布方式
5. align-content:stretch | flex-start | flex-xxx | space-xx
该属性指明了子项在垂直方向每一行flex元素的对齐和分布方式
#### 给子元素设置
1. order: <int /> // 整数值
默认为0，决定了子元素的排列顺序，可为负数
2. flex-grow: <number /> // 数值，可为小数
不支持负值，默认值是0，表示不占用剩余的空白间隙扩展自己的宽度。如果`flex-grow`大于0，则flex容器剩余空间的分配就会发生。
3. flex-shrink: <number />
`flex-shrink`的内核跟`flex-grow`很神似，`flex-grow`是空间足够时候如何利用空间，`flex-shrink`则是空间不足时候如何收缩腾出空间。
4. flex-basis: <length /> | auto
该属性定义了再分配剩余空间之前元素的默认大小。默认值`auto`，有`width`就按照`width`的值来，没有则按照内容的宽度来定义。
> 以上2-4可以缩写为`flex: <flex-grow> | <flex-shrink> | <flex-basis> || none || auto`
> -   `flex`默认值等同于`flex:0 1 auto`；
> -   `flex:none`等同于`flex:0 0 auto`；
> -   `flex:auto`等同于`flex:1 1 auto`；
5. align-self: auto | flex-start | ...
可控制单独一个子项在水平方向的排布

<ClientOnly>
  <Plum/>
</ClientOnly>
