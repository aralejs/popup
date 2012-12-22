# HISTORY

---

## 0.9.12

`tag:fixed` [#8](https://github.com/aralejs/popup/issues/8) align 里的 baseElment 无法自定义的问题。


## 0.9.11

`tag:fixed` 修复多个实例公用一个浮出层时的动画重叠问题。

## 0.9.10

`tag:new` 增加基础的动画支持（fade | slide），以及动画时长 duration 参数。

`tag:fixed` 修复当 triggerType 为 focus 时无法操作弹出层上的内容的bug。

`tag:fixed` 修复一个动画为 slide 时的浮层定位错误。

`tag:fixed` [#6](https://github.com/aralejs/popup/issues/6) 直接调用 show 方法的定位错误。

`tag:improved` 依赖升级到 overlay 0.9.13。


## 0.9.9

`tag:new` 增加 disabled（是否能触发）参数。

`tag:fixed` 修复 trigger 为多个元素时的定位bug。

`tag:fixed` 修复 align.baseXY 为 [0, 0] 时无效的bug。

`tag:improved` 依赖升级到 overlay 0.9.12 ，将popup的显示时重新定位功能提到overlay中。

`tag:improved` delay 默认值调整为 70 毫秒。

`tag:improved` 代码优化重构。

## 0.9.8 

`tag:improved` 依赖升级到 overlay 0.9.10 版本，由此增加了窗口 resize 时，浮层重新定位的特性。

## 0.9.4 `2012-06-16`

`tag:changed` Triggerable 改名为 Popup。

## 0.9.3 `2012-06-05`

`tag:improved` 调整为 Triggerable 继承体系。

## 0.9.1 `2012-05-29`

`tag:changed` 按照新版 Widget 以及 Base 进行改造。

`tag:changed` 改成了继承 Overlay 的方式。

`tag:new` 支持 Delay 参数


## 0.9.0 `2012-05-24`

`tag:new` 包含 Dropdown 基本功能
