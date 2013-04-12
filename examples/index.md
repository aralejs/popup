# 演示文档

- order: 1

------------

<style>
.fn-hide, .ui-popup {
    display: none;
}
.ui-popup {
    border: 1px solid #CCC;
    padding: 3px 5px;
    background: #EEE;
    margin: 0;
}
.ui-popup ul {
    margin: 0;
}
.ui-popup li {
    list-style: none;
}
</style>

## 1. data-api

<div class="popup">
    点击链接
    <a href="#popup1" id="triggerId1">下拉框<span class="icon">▼</span></a>
    <ul class="ui-popup" id="popup1" data-widget="popup" data-trigger="#triggerId1" data-trigger-type="click">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['arale/widget/1.0.3/widget'], function(Widget){
    // example1
    // data-api 自动渲染
    Widget.autoRenderAll();
});
````

## 2. 默认行为与表现

> 默认行为通过 hover 触发，可以不用传递参数 triggerType

<div class="popup">
    <a href="#popup2" id="triggerId2">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup2">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>
<div class="selectbox">
    <select>
        <option>我有仙心一颗</option>
        <option>久被尘劳封锁</option>
        <option>何日尘尽光生</option>
        <option>照破山河万朵</option>
    </select>
    <span class="grey">选择框用于测试 IE6 遮罩</span>
</div>

````javascript
seajs.use(['popup'], function(Popup) {
    var example2 = new Popup({
        trigger: '#triggerId2',
        element: '#popup2',
        align: {
            baseXY: [0, 0]
        }
    });
    // 订阅事件
    example2.after('show', function(){
        console.log('example2 is shown');
    }).after('hide', function(){
        console.log('example2 is hidden');
    });
});
````

## 3. 自定义行为(click)

<div class="popup">
    <a href="#popup3" id="triggerId3">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup3">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup'], function(Popup){
    var example3 = new Popup({
        trigger: '#triggerId3',
        triggerType: 'click',
        align: {
            baseXY: [0, -80]
        },
        element: '#popup3'
    });
});
````

## 4. 自定义Template、Align并设置回调函数

<div class="popup">
    <a href="#" id="triggerId4">下拉框<span class="icon">▼</span></a>
</div>

````javascript
seajs.use(['popup','$'], function(Popup, $){
    var example4 = new Popup({
        trigger: '#triggerId4',
        align: {
            selfXY: [-10,-10],
            baseXY: [0,20]
        },
        template: '<div class="ui-popup fn-hide"><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul></div>'
    });
    example4.after('show', function(){
        $('#triggerId4').text('三秒后改变浮层位置');
        window.setTimeout(function() {
            example4.set('align', { baseXY: [0, -115] });
        }, 3000);
    });
});
````

## 5. 简单的自动完成组件

<div class="popup">
    <input id="triggerId5" placeholder="请输入..." />
    <ul class="fn-hide ui-popup" id="popup5">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup','$'], function(Popup, $) {

    var example5 = new Popup({
        trigger: '#triggerId5',
        triggerType: 'focus',
        element: '#popup5',
        align: {
            baseXY: [0, '100%+12']
        }
    });
    example5.element.find('a').click(function(e) {
        e.preventDefault();
        example5.get('trigger').val($(this).text());
        example5.hide();
    });
    
});
````

## 范例6: 多个 Trigger 的情况

<div class="popup">
    <a class="trigger-all">下拉框1<span class="icon">▼</span></a>
    <a class="trigger-all">下拉框2<span class="icon">▼</span></a>
    <a class="trigger-all">下拉框3<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup6">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup'], function(Popup){
    new Popup({
        trigger: '.trigger-all',
        element: '#popup6',
        effect: 'fade'
    });
});
````

## 范例7: 手动调用show方法

<div class="popup">
    <a id="triggerId7">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup7">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup'], function(Popup){
    new Popup({
        trigger: '#triggerId7',
        element: '#popup7'
    }).show();
});
````

## 范例8: 相对别的元素定位

<div class="popup">
    <a id="triggerId8">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup8">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
    <p id="other-element">别的元素</p>
</div>

````javascript
seajs.use(['popup'], function(Popup){
    new Popup({
        trigger: '#triggerId8',
        element: '#popup8',
        align: {
            baseElement: '#other-element'
        }
    });
});
````

## 范例9: 实现 tooltip 效果（无法移动到浮层上）

<div class="popup">
    <a id="triggerId9">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup9">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup'], function(Popup){
    new Popup({
        trigger: '#triggerId9',
        element: '#popup9',
        delay: -1
    });
});
````
