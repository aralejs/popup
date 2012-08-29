
# Popup

Popup 是可触发 Overlay 型 UI 组件。

---


## 依赖

- [position](../position/)
- [overlay](../overlay)

## 配置说明

* `contentElement` {element|string} 

    提示内容节点。

* `contentElement` {element|string} 

    提示内容节点。

* `contentElement` {element|string} 

    提示内容节点。

* `contentElement` {element|string} 

    提示内容节点。


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

## 交流讨论

欢迎创建
[Gitlab Issue](http://git.alipay.im/popup/issues/new)
来提交反馈。

## 感谢

* Bootstrap Dropdown

