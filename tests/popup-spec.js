define(function(require) {

    var $ = require('$');
    var Popup = require('popup');
    var expect = require('expect');

    describe('popup', function() {
        var template = '<div>' +
                            '<a href="#" id="trigger1" class="trigger">popup</a>' +
                            '<ul id="element1" style="display:none;">' +
                                '<li>那些年，我们一起写过的单元测试...</li>' +
                                '<li>卖萌是一种风格...</li>' +
                            '</ul>' +
                      '</div>';
        var pop;

        beforeEach(function() {
            element = $(template).appendTo(document.body);
        });

        afterEach(function() {
            pop && pop.destroy();
            pop = null;
            element && element.remove();
        });

        it('instance', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                effect: 'fade'
            });
            var trigger = pop.get('trigger');
            var align = pop.get('align');
            expect(trigger.attr('id')).to.be('trigger1');
            expect(pop.element.attr('id')).to.be('element1');
            expect(pop.get('triggerType')).to.be('hover');
            expect(align.baseXY).to.eql([0, '100%']);
            expect(align.selfXY).to.eql([0, 0]);
            expect(pop.get('effect')).to.be('fade');
            pop.set('align', null);
            expect(pop.get('align').baseElement[0].id).to.be('trigger1');
        });

        it('hover event', function(done) {
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
            $('#trigger1').mouseover();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(true);

                // 鼠标移出                
                $('#trigger1').mouseout();

                setTimeout(function() {
                    expect(pop.element.is(':visible')).to.be(false);
                    done();
                }, 80);
            }, 80);

        });

        it('hover elment make it visible', function(done) {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1'
            });

            // 鼠标移入
            $('#trigger1').mouseover();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(true);

                // 鼠标移出
                $('#trigger1').mouseout();
                $('#element1').mouseover();

                setTimeout(function() {
                    expect(pop.element.is(':visible')).to.be(true);
                    done();
                }, 80);
            }, 80);

        });

        it('click event', function() {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                triggerType: 'click'
            });
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
            input.focus();
            expect(pop.element.is(':visible')).to.be(true);
            input.blur();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(false);
                input.remove();
                done();
            }, 100);
        });

        it('blur when click element', function(done) {
            var input = $('<input type="text" />');
            input.appendTo(document.body);
            pop = new Popup({
                trigger: 'input',
                element: '#element1',
                triggerType: 'focus'
            });
            pop.render();
            expect(pop.element.is(':visible')).to.be(false);
            input.focus();
            expect(pop.element.is(':visible')).to.be(true);
            pop.element.mousedown();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(true);
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
            pop.set('align', {
                baseXY: ['60%', -3],
                selfXY: [0, '20%']
            });
            align = pop.get('align');
            expect(align.baseXY).to.eql(['60%', -3]);
            expect(align.selfXY).to.eql([0, '20%']);
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
            expect(pop.get('align').baseElement[0].id).to.be('trigger1');
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

        it('delegate event', function(done) {
            pop = new Popup({
                trigger: '.trigger',
                element: '#element1',
                delegateNode: element
            });

            // 动态加入节点
            element.append('<a href="#" id="trigger2" class="trigger">popup</a>');
            // 鼠标移入
            $('#trigger2').mouseover();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(true);

                // 鼠标移出                
                $('#trigger2').mouseout();

                setTimeout(function() {
                    expect(pop.element.is(':visible')).to.be(false);
                    done();
                }, 80);
            }, 80);

        });

        it('blur hide & triggers', function() {
            // 加入节点
            element.append('<a href="#" id="trigger2" class="trigger">popup</a>');
            
            pop = new Popup({
                trigger: '.trigger',
                triggerType: 'click',
                element: '#element1'
            });
            
            // 都不是激活状态
            expect(pop.element.is(':visible')).to.be(false);
            expect($('#trigger1')[0]._active).not.to.be.ok();
            expect($('#trigger2')[0]._active).not.to.be.ok();

            // 点击1，element 出现
            $('#trigger1').click();
            expect(pop.element.is(':visible')).to.be(true);
            expect($('#trigger1')[0]._active).to.be(true);
            expect($('#trigger2')[0]._active).to.be(false);

            // 点击2，element 出现
            $('#trigger2').click();
            expect(pop.element.is(':visible')).to.be(true);
            expect($('#trigger1')[0]._active).to.be(false);
            expect($('#trigger2')[0]._active).to.be(true);
            
            // 点击body，element 消失 
            $('body').click();
            expect(pop.element.is(':visible')).to.be(false);
            expect($('#trigger1')[0]._active).to.be(false);
            expect($('#trigger2')[0]._active).to.be(false);

            // 点击2，element 再次出现 
            $('#trigger2').click();
            expect(pop.element.is(':visible')).to.be(true);
            expect($('#trigger1')[0]._active).to.be(false);
            expect($('#trigger2')[0]._active).to.be(true);

            // 点击2，element 再次消失
            $('#trigger2').click();
            expect(pop.element.is(':visible')).to.be(false);
            expect($('#trigger1')[0]._active).to.be(false);
            expect($('#trigger2')[0]._active).to.be(false);

        });

        it('animate show & hide', function(done) {
            pop = new Popup({
                trigger: '#trigger1',
                element: '#element1',
                effect: 'fade',
                duration: 30
            });

            // 鼠标移入
            $('#trigger1').mouseover();
            setTimeout(function() {
                expect(pop.element.is(':visible')).to.be(true);

                // 鼠标移出                
                $('#trigger1').mouseout();

                setTimeout(function() {
                    expect(pop.element.is(':visible')).to.be(true);

                    setTimeout(function() {
                        expect(pop.element.is(':visible')).to.be(false);                    
                        done();                    
                    }, 80);
                }, 80);
            }, 80);

        });

    });

});
