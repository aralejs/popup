# Popup

-------------

## API

* `trigger` {element|string} 

    触发元素。

* `triggerType` {string} 

    触发类型，可选[hover|click]，默认为 hover。

* `delay` {number} 

    延迟触发和隐藏时间，默认 100 毫秒。

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

