define(function(require, exports, module) {

    var $ = require('$');
    var Overlay = require('overlay');


    // Popup 是可触发 Overlay 型 UI 组件
    var Popup = Overlay.extend({

        attrs: {
            // 触发元素
            trigger: {
                value: null, // required
                getter: function(val) {
                    return $(val);
                }
            },
            // 触发类型
            triggerType: 'hover', // or click

            // 延迟触发和隐藏时间
            delay: 100,

            // 判断何时 trigger 为不响应事件的情况
            ifTriggerDisabled: function() {
                var n = this.trigger[0];
                return (n.tagName === 'INPUT' && n.disabled);
            }
        },

        setup: function() {
            Popup.superclass.setup.call(this);
            this._bindTrigger();
            this._tweakAlignDefaultValue();
            this._blurHide([this.get('trigger')]);
        },

        toggle: function() {
            this[this.get('visible') ? 'hide' : 'show']();
        },

        // 调整 align 属性的默认值
        _tweakAlignDefaultValue: function() {
            var align = this.get('align');

            // 默认坐标在目标元素左下角
            if (align.baseXY.toString() === [0, 0].toString()) {
                align.baseXY = [0, '100%'];
            }

            // 默认基准定位元素为 trigger
            if (align.baseElement._id === 'VIEWPORT') {
                align.baseElement = this.get('trigger');
            }

            this.set('align', align);
        },

        _bindTrigger: function() {
            var trigger = this.get('trigger');
            var triggerType = this.get('triggerType');
            var delay = this.get('delay');

            var showTimer, hideTimer;
            var that = this;

            if (triggerType === 'click') {
                trigger.on(triggerType, function(ev) {
                    ev.preventDefault();
                    that.toggle();
                });
            }
            else if (triggerType === 'focus') {
                trigger.on('focus blur', function() {
                    that.toggle();
                });
            }
            // 默认是 hover
            else {
                trigger.hover(function() {
                    clearTimeout(hideTimer);

                    if (!that.get('visible')) {
                        showTimer = setTimeout(function() {
                            that.show();
                        }, delay);
                    }
                }, leaveHandler);

                // 鼠标在悬浮层上时不消失
                this.element.hover(function() {
                    clearTimeout(hideTimer);
                }, leaveHandler);
            }

            function leaveHandler() {
                clearTimeout(showTimer);

                if (that.get('visible')) {
                    hideTimer = setTimeout(function() {
                        that.hide();
                    }, delay);
                }
            }
        }
    });

    module.exports = Popup;
    
});
