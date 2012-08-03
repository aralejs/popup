define("#popup/0.9.6/popup-debug", ["$-debug", "#overlay/0.9.9/overlay-debug", "#iframe-shim/0.9.3/iframe-shim-debug", "#position/0.9.2/position-debug", "#widget/0.9.16/widget-debug", "#base/0.9.16/base-debug", "#events/0.9.1/events-debug", "#class/0.9.2/class-debug"], function(require, exports, module) {

    var $ = require('$-debug');
    var Overlay = require('#overlay/0.9.9/overlay-debug');


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
        },

        show: function() {
            Popup.superclass.show.call(this);
            this._setPosition();
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
                    ev.stopPropagation();
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
