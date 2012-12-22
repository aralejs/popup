define(function(require) {

    var $ = require('$');
    var Popup = require('../src/popup');

    describe('popup', function() {
        var element = '<div>' +
                            '<a href="#" id="trigger1">popup</a>' +
                            '<ul id="element1">' +
                                '<li>那些年，我们一起写过的单元测试...</li>' +
                                '<li>卖萌是一种风格...</li>' +
                            '</ul>' +
                      '</div>';
        beforeEach(function() {
            element = $(element).appendTo(document.body);
        });

        afterEach(function() {
            element.remove();
        });

        it('instance', function() {
            var test1 = new Popup({
                trigger: '#trigger1',
                element: '#element1'
            });
            var trigger = test1.get('trigger');
            var align = test1.get('align');
            expect(trigger.attr('id')).to.be('trigger1');
            expect(test1.element.attr('id')).to.be('element1');
            expect(test1.get('triggerType')).to.be('hover');
            expect(align.baseXY).to.eql([0,'100%']);
            expect(align.selfXY).to.eql([0,0]);
        });

        it('event', function() {
            var event1;
            var event2;
            var test2 = new Popup({
                trigger: '#trigger1',
                element: '#element1'
            });

            var showText = 'test2 is shown';
            var hideText = 'test2 is hidden';
            // 订阅事件
            test2.on('shown', function() {
                event1 = showText;
            }).on('hidden', function() {
                event2 = hideText;
            });
            // 发布事件
            test2.trigger('shown').trigger('hidden');
            // 测试值
            expect(event1).to.be(showText);
            expect(event2).to.be(hideText);

            // 鼠标移入
            $('#trigger1').trigger('mouseover');
            test2.after('show', function(){
                expect(test2.get('trigger').is(':visible')).to.be(true);
                expect(test2.element.is(':visible')).to.be(true);
            });

            // 鼠标移出
            $('#trigger1').trigger('mouseout');

            test2.after('hide', function() {
                expect(test2.get('trigger').is(':visible')).to.be(true);
                expect(test2.element.is(':hidden')).to.be(true);
            });

        });

        it('change align XY', function() {
            var test1 = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                align: {
                    baseXY: ['40%', 0],
                    selfXY: [34, 120]
                }
            });
            var align = test1.get('align');
            expect(align.baseXY).to.eql(['40%', 0]);
            expect(align.selfXY).to.eql([34, 120]);
        });

        it('change align baseElement', function() {
            var test1 = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                align: {
                    baseElement: 'body'
                }
            });
            var align = test1.get('align');
            expect(align.baseElement).to.eql('body');
        });

        it('change align baseElement after show', function() {
            var test1 = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                align: {
                    baseElement: 'body'
                }
            });
            test1.show();
            var align = test1.get('align');
            expect(align.baseElement).to.eql('body');
        });

    });

});
