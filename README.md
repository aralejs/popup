# Popup

---

[![Build Status](https://travis-ci.org/aralejs/popup.png)](https://travis-ci.org/aralejs/popup)
[![Coverage Status](https://coveralls.io/repos/aralejs/popup/badge.png?branch=master)](https://coveralls.io/r/aralejs/popup)

Popup 是可触发的浮层组件。封装了当用户点击、hover、focus 到指定元素时，可以触发另一个浮层显示的行为。

---

Popup 继承自 [overlay](http://aralejs.org/overlay/)，可使用其中包括 [widget](http://aralejs.org/widget/)、[base](http://aralejs.org/base/)、[class](http://aralejs.org/class/)、[events](http://aralejs.org/events/)、[attribute](http://aralejs.org/base/docs/attribute.html)、[aspect](http://aralejs.org/base/docs/aspect.html) 的属性和方法。


## 配置说明

### element `element|string`

弹出的浮层元素。也可以使用 template 参数传递模板来代替这个参数。

### trigger `element|string`

触发元素。

### triggerType `string`

触发类型，可选[hover|click|focus]，默认为 hover。

### delegateNode `element|string` `1.0.2+`

触发事件委托的对象。**当使用这个配置时，需要保证 trigger 参数是一个 selector !!!**

### effect `string`

基础的动画效果，可选[fade|slide]，默认为空 。fade 和 slide 可以并行。

### duration `number`

动画时长，默认 250 毫秒。

### delay `number`

延迟 hover 触发显示的时长，默认 70 毫秒。设为`-1`时，表示 popup 没有延迟显示和隐藏因素而变为 tooltip 的效果。

### disabled `boolean`

是否能触发弹出效果，可用`.set('disabled', true)`进行开关。


> 若有范例和演示中有其他参数（如自定义位置参数 align），请参见 Popup 的父类 [Overlay](http://aralejs.org/overlay/)。

## 属性

### activeTrigger

总是指向触发显示浮层的当前触发元素(jQuery Node 对象)。


## 事件

### animated

动画效果结束时的回调事件。`.on('animated', function(){ })`


## 最佳实践

```js
seajs.use(['arale/popup/{{版本号}}/popup'], function(Popup){
    var example = new Popup({
        trigger: '#triggerId',
        element: '#targetId'
    });
});
```

需要 tooltip 效果的请如下调用：

```js
seajs.use(['arale/popup/{{版本号}}/popup'], function(Popup){
    var example = new Popup({
        trigger: '#triggerId',
        element: '#targetId',
        delay: -1
    });
});
```

另外，Popup 已从 Overlay 继承了点击页面空白处浮层消失，以及窗口改变大小后浮层重新定位等被动属性，
详细请查看 [演示文档](http://aralejs.org/popup/examples/)。


### 多触发器的委托应用

实践中常常遇到多个触发元素对应一个弹出层，而且触发元素会动态添加的情况。
这样如果通过多个实例来绑定 popup 效果就会比较麻烦。

这时，可以使用 `delegateNode` 这个参数将事件绑定到委托节点上，配合多个 trigger 来实现。
在委托节点内动态添加了 trigger 后，也无须重新绑定。

```js
seajs.use(['popup'], function(Popup){
    new Popup({
        trigger: '.triggerClass',
        element: '#popup',
        delegateNode: '#delegateNode'
    });
});
```
[delegeteNode示例](examples/triggers.html#范例2-委托事件)

### 动态内容

当有多个触发元素，而弹出层是同一个，而且内容是根据不同触发元素而不同时，可以用下面的方式进行绑定：

```js
seajs.use(['popup'], function(Popup){
    new Popup({
        trigger: '.triggerClass', // 有多个触发元素
        element: '#popup'
    }).before('show', funtion() {
      // 通过 activeTrigger 拿到当前触发的触发元素
      var content = this.activeTrigger.html();
      // 动态设定内容
      this.element.html(content);
    });
});
```
