define("arale/popup/0.9.9/popup-debug", ["$-debug", "arale/overlay/0.9.12/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.2/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug"], function(require, exports, module) {

    var $ = require('$-debug');
    var Overlay = require('arale/overlay/0.9.12/overlay-debug');


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
            triggerType: 'hover', // or click or focus

            // 默认的定位参数
            align: {
                baseXY: [0, '100%'],
                selfXY: [0, 0]
            },

            // 是否能够触发
            // 可以通过set('disabled', true)关闭
            disabled: false
        },

        setup: function() {
            Popup.superclass.setup.call(this);
            this._bindTrigger();
            this._blurHide([this.get('trigger')]);
        },

        show: function() {
            // 若从未渲染，则调用 render
            (!this.rendered) && this.render();
            this.set('visible', true);

            var align = this.get('align');
            align.baseElement = this.activeTrigger;
            this.set('align', align);
        },

        toggle: function() {
            if (this.get('disabled')) {
                return;
            }
            this[this.get('visible') ? 'hide' : 'show']();
        },

        _bindTrigger: function() {
            var trigger = this.get('trigger');
            var triggerType = this.get('triggerType');

            // 延迟触发和隐藏时间
            var delay = 100;

            var showTimer, hideTimer;
            var that = this;

            if (triggerType === 'click') {
                trigger.on(triggerType, function(e) {
                    e.preventDefault();

                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    that.toggle();
                });
            }
            else if (triggerType === 'focus') {
                trigger.on('focus blur', function() {
                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    that.toggle();
                });
            }
            // 默认是 hover
            else {
                trigger.hover(function() {
                    clearTimeout(hideTimer);

                    if (!that.get('visible')) {
                        // 标识当前点击的元素
                        that.activeTrigger = $(this);
                        showTimer = setTimeout(function() {
                            that.toggle();
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
                        that.toggle();
                    }, delay);
                }
            }
        }
    });

    module.exports = Popup;

});
