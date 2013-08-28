# 动画弹出层效果

- order: 3

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

## 1. 渐隐效果 `effect: 'fade'`

<div class="popup">
    <a href="#popup1" id="triggerId1">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup1">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````js
seajs.use(['popup'], function(Popup) {
    var example1 = new Popup({
        trigger: '#triggerId1',
        element: '#popup1',
        effect: 'fade'
    });
});
````

## 2. 延展效果 `effect: 'slide'`

<div class="popup">
    <a href="#popup2" id="triggerId2">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup2">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````js
seajs.use(['popup'], function(Popup) {
    var example2 = new Popup({
        trigger: '#triggerId2',
        element: '#popup2',
        effect: 'slide'
    });
    example2.on('animated', function() {
        console.log('animated');
    });
});
````

## 3. 渐隐 + 延展 `effect: 'fade slide'`

<div class="popup">
    <a href="#popup3" id="triggerId3">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup3">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````js
seajs.use(['popup'], function(Popup) {
    var example3 = new Popup({
        trigger: '#triggerId3',
        element: '#popup3',
        effect: 'fade slide'
    });
});
````

## 4. 自定义动画效果

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
seajs.use(['popup'], function(Popup) {
    var animPopup = Popup.extend({
        _onRenderVisible: function(val) {
            if (val) {
                this.element.animate({'height': 'toggle', 'opacity':'0.8'}, 400);
            } else {
                this.element.animate({'height': 'toggle', 'opacity':'hide'}, 600);
            }
        }
    });
    var t1 = (new Date).getTime();
    var example4 = new animPopup({
        trigger: '#triggerId4',
        align: {
            baseXY: [5,20]
        },
        element: '#popup4'
    });
    var t2 = (new Date).getTime();
});
````

## 5. 多个元素快速切换（多个实例，同一个element的情况）

<div class="popup">
    <a href="#popup5" id="triggerId5-1">下拉框1<span class="icon">▼</span></a>
    <a href="#popup5" id="triggerId5-2">下拉框2<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup5">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

````js
seajs.use(['popup'], function(Popup) {
    new Popup({
        trigger: '#triggerId5-1',
        element: '#popup5',
        effect: 'fade'
    });
    new Popup({
        trigger: '#triggerId5-2',
        element: '#popup5',
        effect: 'fade'
    });
});
````

## 6. 动画 & template 配合

<div class="popup">
    <a href="javascript:;" id="triggerId6">下拉框<span class="icon">▼</span></a>
</div>

````js
seajs.use(['popup'], function(Popup) {
    var example2 = new Popup({
        trigger: '#triggerId6',
        template: '<div style="background:#fff;border:1px solid #ccc;padding:6px;height:120px;">xxxxx</div>',
        effect: 'slide'
    });
});
````
