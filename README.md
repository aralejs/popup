# Popup

---

Popup 是可触发的浮层组件。

---

## 配置说明

### element `element|string`

弹出的浮层元素。

### trigger `element|string`

触发元素。

### triggerType `string`

触发类型，可选[hover|click]，默认为 hover。

### effect `string`

基础的动画效果，可选[fade|slide]，默认为空。fade 和 slide 可以并行。

### duration `number`

动画时长，默认 250 毫秒。

### delay `number`

延迟 hover 触发显示的时长，默认 60 毫秒。

### disabled `boolean`

是否能触发弹出效果，可用`.set('disabled', true)`进行开关。


## 最佳实践

```js
seajs.use(['popup'], function(Popup){
    var example = new Popup({
        trigger: '#triggerId',
        element: '#targetId'
    });
});
```

另外，Popup 已从 Overlay 继承了点击页面空白处浮层消失的功能。
详细请查看 [演示](/examples/)。

## 感谢

* Bootstrap Dropdown

