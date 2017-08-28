## 框架说明
- MVVM框架：vue2.0 + vuex2.0 + vue-router2.0 文档地址：[Vue官网](https://cn.vuejs.org/)
- 布局：flex.css 文档地址：[Flex.css](https://cnodejs.org/topic/56d1148d9f876b7e6658579e)
- 移动端高清方案：淘宝rem方案（不懂百度）
- UI框架：mint-ui 文档地址：[饿了吗移动端UI框架Mint-ui](https://github.com/ElemeFE/mint-ui)
### 状态管理
使用vuex作为状态管理的主要方式
src/model/index.js 
src/model/modules/ 按照不同的模块整理划分状态
在页面中引入mapState mapMutations进行管理
如需引入modules/mixin/load
```js
...mapState({
    load:({
        mixin
    }) => mixin.load
})
```
### 布局flex.css
使用flex.css有一定的兼容问题，目前还没有在用户浏览器上发现，至少能兼容到安卓4.4及iphone5。flex布局最适合横向或纵向的3个元素以下布局，超过3个元素应该考虑嵌套。
例：导航条固定，内容自适应
```html
<div class="container" flex="dir:top box:first">
    <div class="navigater" style="height:20px"></div>
    <div class="content"></div>
</div>
```
### 一个页面的结构
页面是用vue单文件组织的
```
html结构
-template
    -page-container
        -page
style样式
    -page-container （加上这一层主要是为了方便制作全局的动画，例如弹出框，加载进度等等效果）
    {
        position:absolute;
        height:100%;
        width:100%;
    }
        -page
        同上一层，这一层主要是实现页面切换的动画
```
注意：页面中必须要有这样的结构和样式，不然动画不能正常使用。
### 关于mint-ui
mint-ui是饿了吗使用的vue移动端框架，因为我们使用的高清方案不同，于是修改了mint-ui部分样式，可以在src/style/base.css中查看，后续有用到的之前没使用到的组件，如果出现不能自适应的情况，需要在base.css中添加样式以覆盖框架中原有的样式。mint-ui的设计降低了ui的耦合性，使用按照需要组合组件。
### ajax
为了方便写各种请求控制，本框架使用的ajax是封装的js原生的xhr，代码在src/util/Tool.js中查看

