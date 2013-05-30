# 多 triggers 的情况

- order: 2

---

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


## 范例1: 多个 Trigger 共享一个实例

<div class="popup">
    <a class="trigger-all">下拉框1<span class="icon">▼</span></a>
    <a class="trigger-all">下拉框2<span class="icon">▼</span></a>
    <a class="trigger-all">下拉框3<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup1">
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
        element: '#popup1',
        effect: 'fade'
    });
});
````

## 范例2: 委托事件

<div class="popup" id="delegateNode">
    <button id="addNewNode">增加一个节点</button>
    <a class="triggerClass2">下拉框<span class="icon">▼</span></a>
    <a class="triggerClass2">下拉框<span class="icon">▼</span></a>  
    <ul class="fn-hide ui-popup" id="popup2">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup', '$'], function(Popup, $){
    new Popup({
        trigger: '.triggerClass2',      // 用了 delegateNode 时，trigger 参数必须为 selector!
        element: '#popup2',
        delegateNode: '#delegateNode'
    });
    // 新增节点，观察是否绑定了popup事件
    $('#addNewNode').click(function() {
        $('<a class="triggerClass2">动态增加的节点<span class="icon">▼</span></a>')
            .appendTo('#delegateNode');
    });
});
````

## 范例3: 多 Triggers 和 blurHide 共存的问题

> 当点击一个trigger弹出浮层后，再点击另一个trigger时，应该要正确弹出浮层。

<div class="popup">
    <a class="triggerClass3">下拉框1<span class="icon">▼</span></a>
    <a class="triggerClass3">下拉框2<span class="icon">▼</span></a>
    <a class="triggerClass3">下拉框3<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup3">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````javascript
seajs.use(['popup', '$'], function(Popup, $){
    new Popup({
        trigger: '.triggerClass3',
        triggerType: 'click',
        element: '#popup3'
    });
});
````
