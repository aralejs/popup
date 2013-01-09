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
        var pop;

        beforeEach(function() {
            element = $(element).appendTo(document.body);
        });

        afterEach(function() {
            pop && pop.destroy();
            pop = null;
            element.remove();
        });

        it('instance', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1'
            });
            var trigger = pop.get('trigger');
            var align = pop.get('align');
            expect(trigger.attr('id')).to.be('trigger1');
            expect(pop.element.attr('id')).to.be('element1');
            expect(pop.get('triggerType')).to.be('hover');
            expect(align.baseXY).to.eql([0, '100%']);
            expect(align.selfXY).to.eql([0, 0]);
        });

        it('hover event', function() {
            var event1;
            var event2;
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1'
            });

            var showText = 'pop is shown';
            var hideText = 'pop is hidden';
            // 订阅事件
            pop.on('shown', function() {
                event1 = showText;
            }).on('hidden', function() {
                event2 = hideText;
            });
            // 发布事件
            pop.trigger('shown').trigger('hidden');
            // 测试值
            expect(event1).to.be(showText);
            expect(event2).to.be(hideText);

            // 鼠标移入
            $('#trigger1').trigger('mouseover');
            pop.after('show', function() {
                expect(pop.get('trigger').is(':visible')).to.be(true);
                expect(pop.element.is(':visible')).to.be(true);
            });

            // 鼠标移出
            $('#trigger1').trigger('mouseout');

            pop.after('hide', function() {
                expect(pop.get('trigger').is(':visible')).to.be(true);
                expect(pop.element.is(':hidden')).to.be(true);
            });

        });

        it('click event', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                triggerType: 'click'
            });
            pop.render();
            expect(pop.element.is(':visible')).to.be(false);            
            $('#trigger1').click();
            expect(pop.element.is(':visible')).to.be(true);
            $('#trigger1').click();
            expect(pop.element.is(':visible')).to.be(false);
        });

        it('focus & blur event', function(done) {
            var input = $('<input type="text" />');
            input.appendTo(document.body);
            pop = new Popup({
                trigger: 'input',
                element: '#element1',
                triggerType: 'focus'
            });
            pop.render();
            expect(pop.element.is(':visible')).to.be(false);
            input[0].focus();
            expect(pop.element.is(':visible')).to.be(true);
            input[0].blur();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(false);
                input.remove();
                done();
            }, 100);
        });

        it('delay = -1', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                delay: -1
            });
            pop.render();
            expect(pop.element.is(':visible')).to.be(false);
            $('#trigger1').trigger('mouseover');
            expect(pop.element.is(':visible')).to.be(true);
            $('#trigger1').trigger('mouseout');
            expect(pop.element.is(':visible')).to.be(false);
        });

        it('change align XY', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                align: {
                    baseXY: ['40%', 0],
                    selfXY: [34, 120]
                }
            });
            var align = pop.get('align');
            expect(align.baseXY).to.eql(['40%', 0]);
            expect(align.selfXY).to.eql([34, 120]);
        });

        it('change align baseElement', function() {
            var pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                align: {
                    baseElement: 'body'
                }
            });
            var align = pop.get('align');
            expect(align.baseElement).to.eql('body');
        });

        it('change align baseElement after show', function() {
            var pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                align: {
                    baseElement: 'body'
                }
            });
            pop.show();
            var align = pop.get('align');
            expect(align.baseElement).to.eql('body');
        });

        it('change specified BaseElement', function() {
            var pop = new Popup({
                trigger: '#trigger1',
                element: '#element1'
            });
            expect(pop.get('align').baseElement._id).to.be('VIEWPORT');
            expect(pop._specifiedBaseElement).to.be(undefined);
            pop.set('align', {
                baseElement: 'body'
            });
            expect(pop._specifiedBaseElement).to.be(true);
            expect(pop.get('align').baseElement).to.be('body');
        });

        it('disable', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                triggerType: 'click',
                disabled: true
            });
            pop.render();
            expect(pop.element.is(':visible')).to.be(false);
            $('#trigger1').click();
            expect(pop.element.is(':visible')).to.be(false);
            pop.set('disabled', false);
            $('#trigger1').click();
            expect(pop.element.is(':visible')).to.be(true);
            $('#trigger1').click();
            expect(pop.element.is(':visible')).to.be(false);
        });

    });

});
