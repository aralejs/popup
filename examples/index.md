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
    .ui-popup ul{
        margin: 0;
    }
    .ui-popup li {
        list-style: none;
    }
</style>

## 范例1: data-api

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
seajs.use(['jquery','popup', '#widget/1.0.2/widget'], function($, Popup, Widget){
    // example1
    // data-api 自动渲染
    Widget.autoRenderAll();
});
````

## 范例2: 默认行为与表现

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
seajs.use(['popup'], function(Popup){

    var example2 = new Popup({
        trigger: '#triggerId2',
        element: '#popup2',
        align: {
            baseXY: [0, '100%']
        }
    });
    example2.render();
    // 订阅事件
    example2.after('show', function(){
        console.log('example2 is shown');
    }).after('hide', function(){
        console.log('example2 is hidden');
    });
    // 触发事件
    // example2.trigger('shown');
});
````

## 范例3: 自定义行为(click)

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
    example3.render();
});
````

## 范例4: 自定义动画效果以及延时触发效果

<div class="popup">
    <a href="#popup4" id="triggerId4" title="400ms 后出现, 请稍安勿躁">下拉框<span class="icon">▼</span></a> 
    <ul class="fn-hide ui-popup" id="popup4">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup'], function(Popup){
    var animPopup = Popup.extend({
        // 此处定义动画效果存疑; 是否应该覆盖私有方法？
        _onChangeVisible: function(val){
            if (val) {
                //this.element.fadeIn(); //淡入效果
                this.element.animate({'height': 'toggle', 'opacity':'show'}, 200);
            } else {
                //this.element.fadeOut(); //淡出效果
                this.element.animate({'height': 'toggle', 'opacity':'hide'}, 200);
            }
        }
    });
    var example4 = new animPopup({
        trigger: '#triggerId4',
        align: {
            baseXY: [5,20]
        },
        delay: 400,
        element: '#popup4'
    });
    example4.render();
});
````

## 范例5: 自定义Template、Align并设置回调函数

<div class="popup">
    <a href="#" id="triggerId5">下拉框<span class="icon">▼</span></a>
    <a href="#" id="releated5" style="float:right;">我是无辜的被定位元素</a>
</div>

````javascript
seajs.use(['popup','jquery'], function(Popup, $){

    var example5 = new Popup({
        trigger: '#triggerId5',
        align: {
            baseElement: $('#releated5')[0],
            selfXY: [-10,-10],
            baseXY: [0,20]
        },
        template: '<div class="ui-popup fn-hide"><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul></div>'
    });
    example5.after('show', function(){
        $('#triggerId5').text('三秒后改变浮层位置');
        window.setTimeout(function() {
            example5.set('align', { baseXY: [0, -115] });
        }, 3000);
    });
    example5.render();
    
});
````

范例6: 简单的自动完成组件

<div class="popup">
    <input id="triggerId6" placeholder="请输入..." />
    <ul class="fn-hide ui-popup" id="popup6">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup','jquery'], function(Popup, $) {

    var example6 = new Popup({
        trigger: '#triggerId6',
        triggerType: 'focus',
        element: '#popup6',
        align: {
            baseXY: [0, '100%+12']
        }
    });
    example6.render();
    example6.element.find('a').click(function(e) {
        e.preventDefault();
        example6.get('trigger').val($(this).text());
        example6.set('visible', false);
    });
    
});
````

