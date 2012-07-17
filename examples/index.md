<style>
    .fn-hide, .ui-dropdown {
        display: none;
    }

    .ui-dropdown {
        border: 1px solid #CCC;
        padding: 3px 5px;
        background: #EEE;
        margin: 0;
    }
    .ui-dropdown ul{
        margin: 0;
    }
    .ui-dropdown li {
        list-style: none;
    }
</style>

范例1: data-api

<div class="dropdown">
    点击链接
    <a href="#dropdown1" id="triggerId1">下拉框<span class="icon">▼</span></a>
    <ul class="ui-dropdown" id="dropdown1" data-widget="../src/dropdown" data-trigger="#triggerId1" data-trigger-type="click">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

```javascript
seajs.use(['jquery','../src/dropdown', '#widget/0.9.16/widget'], function($, Dropdown, Widget){
    // example1
    // data-api 自动渲染
    Widget.autoRenderAll();

});
```

范例2: 默认行为与表现

> 默认行为通过 hover 触发，可以不用传递参数 triggerType

<div class="dropdown">
    <a href="#dropdown2" id="triggerId2">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-dropdown" id="dropdown2">
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

```javascript
seajs.use(['../src/dropdown'], function(Dropdown){

    var example2 = new Dropdown({
        trigger: '#triggerId2',
        element: '#dropdown2'
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
```

范例3: 自定义行为(click)

<div class="dropdown">
    <a href="#dropdown3" id="triggerId3">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-dropdown" id="dropdown3">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#3">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

```javascript
seajs.use(['../src/dropdown'], function(Dropdown){
    var example3 = new Dropdown({
        trigger: '#triggerId3',
        triggerType: 'click',
        align: {
            baseXY: [0, -80]
        },
        element: '#dropdown3'
    });
    example3.render();
});
```

范例4: 自定义动画效果以及延时触发效果

<div class="dropdown">
    <a href="#dropdown4" id="triggerId4" title="400ms 后出现, 请稍安勿躁">下拉框<span class="icon">▼</span></a> 
    <ul class="fn-hide ui-dropdown" id="dropdown4">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

```javascript
seajs.use(['../src/dropdown'], function(Dropdown){
    var animDropdown = Dropdown.extend({
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
    var example4 = new animDropdown({
        trigger: '#triggerId4',
        align: {
            baseXY: [5,20]
        },
        delay: 400,
        element: '#dropdown4'
    });
    example4.render();
});
```

范例5: 自定义Template、Align并设置回调函数

<div class="dropdown">
    <a href="#" id="triggerId5">下拉框<span class="icon">▼</span></a>
    <a href="#" id="releated5" style="float:right;">我是无辜的被定位元素</a>
</div>

```javascript
seajs.use(['../src/dropdown','jquery'], function(Dropdown, $){

    var example5 = new Dropdown({
        trigger: '#triggerId5',
        align: {
            baseElement: $('#releated5')[0],
            selfXY: [-10,-10],
            baseXY: [0,20]
        },
        template: '<div class="ui-dropdown fn-hide"><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul></div>'
    });
    example5.after('show', function(){
        $('#triggerId5').text('三秒后改变浮层位置');
        window.setTimeout(function() {
            example5.set('align', { baseXY: [0, -115] });
        }, 3000);
    });
    example5.render();
    
});
```

范例6: 简单的自动完成组件

<div class="dropdown">
    <input id="triggerId6" placeholder="请输入..." />
    <ul class="fn-hide ui-dropdown" id="dropdown6">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
    </ul>
</div>

```javascript
seajs.use(['../src/dropdown','jquery'], function(Dropdown,$){

    var example6 = new Dropdown({
        trigger: '#triggerId6',
        triggerType: 'focus',
        element: '#dropdown6',
        align: {
            baseXY: [0, $('#triggerId6').height() + 12]
        }
    });
    example6.render();
    example6.element.find('a').click(function(e) {
        e.preventDefault();
        example6.get('trigger').val($(this).text());
        example6.set('visible', false);
    });
    
});
```

