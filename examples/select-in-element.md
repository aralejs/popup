# select in element

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
.ui-popup li {
    list-style: none;
}
</style>

当弹出层中有 select 时，IE 中在 select 选项上移动时会意外隐藏浮层。https://github.com/aralejs/popup/issues/23

于是在 1.1.6 中进行了修复，统一使所有浏览器下在 select 选项上移出时始终不触发隐藏行为。

在实践中，请尽量保证 select 的选项层始终包含在浮层中。

<div class="popup">
    <a href="#popup2" id="triggerId2">下拉框<span class="icon">▼</span></a>
    <ul class="fn-hide ui-popup" id="popup2">
        <li><a href="http://aralejs.org#1">内容1</a></li>
        <li><a href="http://aralejs.org#2">内容2</a></li>
        <li><a href="http://aralejs.org#3">内容3</a></li>
        <li><a href="http://aralejs.org#4">内容4</a></li>
        <select>
            <option>我有仙心一颗</option>
            <option>久被尘劳封锁</option>
            <option>何日尘尽光生</option>
            <option>照破山河万朵</option>
        </select>
    </ul>
</div>

````javascript
seajs.use(['popup'], function(Popup) {
    var example2 = new Popup({
        trigger: '#triggerId2',
        element: '#popup2'
    })
});
````
