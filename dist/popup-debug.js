define("arale/popup/1.0.0/popup-debug", [ "$-debug", "arale/overlay/1.0.0/overlay-debug", "arale/position/1.0.0/position-debug", "arale/iframe-shim/1.0.0/iframe-shim-debug", "arale/widget/1.0.3/widget-debug", "arale/base/1.0.1/base-debug", "arale/class/1.0.0/class-debug", "arale/events/1.0.0/events-debug" ], function(require, exports, module) {
    var $ = require("$-debug");
    var Overlay = require("arale/overlay/1.0.0/overlay-debug");
    // Popup 是可触发 Overlay 型 UI 组件
    var Popup = Overlay.extend({
        attrs: {
            // 触发元素
            trigger: {
                value: null,
                // required
                getter: function(val) {
                    return $(val);
                }
            },
            // 触发类型
            triggerType: "hover",
            // or click or focus
            // 默认的定位参数
            align: {
                value: {
                    baseXY: [ 0, "100%" ],
                    selfXY: [ 0, 0 ]
                },
                setter: function(val) {
                    if (!val) {
                        return;
                    }
                    if (val.baseElement) {
                        this._specifiedBaseElement = true;
                    } else if (this.activeTrigger) {
                        // 若给的定位元素未指定基准元素
                        // 就给一个...
                        val.baseElement = this.activeTrigger;
                    }
                    return val;
                },
                getter: function(val) {
                    // 若未指定基准元素，则按照当前的触发元素进行定位
                    return $.extend({}, val, this._specifiedBaseElement ? {} : {
                        baseElement: this.activeTrigger
                    });
                }
            },
            // 延迟触发和隐藏时间
            delay: 70,
            // 是否能够触发
            // 可以通过set('disabled', true)关闭
            disabled: false,
            // 基本的动画效果，可选 fade|slide
            effect: "",
            // 动画的持续时间
            duration: 250
        },
        setup: function() {
            Popup.superclass.setup.call(this);
            this._bindTrigger();
            this._blurHide(this.get("trigger"));
            // 默认绑定activeTrigger为第一个元素
            // for https://github.com/aralejs/popup/issues/6
            this.activeTrigger = this.get("trigger").eq(0);
        },
        show: function() {
            if (this.get("disabled")) {
                return;
            }
            return Popup.superclass.show.call(this);
        },
        toggle: function() {
            this[this.get("visible") ? "hide" : "show"]();
        },
        _bindTrigger: function() {
            var trigger = this.get("trigger");
            var triggerType = this.get("triggerType");
            var delay = this.get("delay");
            var showTimer, hideTimer;
            var that = this;
            if (triggerType === "click") {
                trigger.on(triggerType, function(e) {
                    e.preventDefault();
                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    that.toggle();
                });
            } else if (triggerType === "focus") {
                trigger.on("focus", function() {
                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    that.show();
                }).on("blur", function() {
                    setTimeout(function() {
                        !that._downOnElement && that.hide();
                        that._downOnElement = false;
                    }, delay);
                });
                // 为了当input blur时能够选择和操作弹出层上的内容
                this.element.on("mousedown", function() {
                    that._downOnElement = true;
                });
            } else {
                // 当 delay 为负数时
                // popup 变成 tooltip 的效果
                if (delay < 0) {
                    trigger.hover(function() {
                        // 标识当前点击的元素
                        that.activeTrigger = $(this);
                        that.show();
                    }, function() {
                        that.hide();
                    });
                    return;
                }
                trigger.hover(function() {
                    clearTimeout(hideTimer);
                    hideTimer = null;
                    // 标识当前点击的元素
                    that.activeTrigger = $(this);
                    showTimer = setTimeout(function() {
                        that.show();
                    }, delay);
                }, leaveHandler);
                // 鼠标在悬浮层上时不消失
                this.element.hover(function() {
                    clearTimeout(hideTimer);
                }, leaveHandler);
            }
            function leaveHandler() {
                clearTimeout(showTimer);
                showTimer = null;
                if (that.get("visible")) {
                    hideTimer = setTimeout(function() {
                        that.hide();
                    }, delay);
                }
            }
        },
        _onRenderVisible: function(val) {
            var fade = this.get("effect").indexOf("fade") !== -1;
            var slide = this.get("effect").indexOf("slide") !== -1;
            var animConfig = {};
            slide && (animConfig.height = val ? "show" : "hide");
            fade && (animConfig.opacity = val ? "show" : "hide");
            if (fade || slide) {
                this.element.stop(true, true).animate(animConfig, this.get("duration")).css({
                    visibility: "visible"
                });
            } else {
                this.element[val ? "show" : "hide"]();
            }
        }
    });
    module.exports = Popup;
});