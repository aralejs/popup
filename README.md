# Popup

---

Popup 是可触发的浮层组件。

---

## 配置说明

### element *element|string*

弹出的浮层元素。

### trigger *element|string*

触发元素。

### triggerType *string*

触发类型，可选[hover|click]，默认为 hover。

### disabled *boolean*

是否能触发弹出效果，可用`.set('disabled', true)`进行开关。


## 最佳实践

```
seajs.use(['popup'], function(Popup){
    var example = new Popup({
        trigger: '#triggerId',
        element: '#targetId'
    });
});
```

另外，Popup 已实现了点击页面空白处浮层消失的功能。

详细请查看演示。

## 感谢

* Bootstrap Dropdown

