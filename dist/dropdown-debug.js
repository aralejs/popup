define("#popup/0.9.6/dropdown-debug", ["./popup-debug", "$-debug", "#overlay/0.9.8/overlay-debug", "#iframe-shim/0.9.3/iframe-shim-debug", "#position/0.9.2/position-debug", "#widget/0.9.16/widget-debug", "#base/0.9.16/base-debug", "#events/0.9.1/events-debug", "#class/0.9.2/class-debug"], function(require, exports, module) {

    var Popup = require('./popup-debug');


    var Dropdown = Popup.extend({

        setup: function() {
            Dropdown.superclass.setup.call(this);
            this._tweakAlignDefaultValue();
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
        }
    });

    module.exports = Dropdown;

});
