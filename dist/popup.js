define("#popup/0.9.6/popup",["$","#overlay/0.9.8/overlay","#iframe-shim/0.9.3/iframe-shim","#position/0.9.2/position","#widget/0.9.16/widget","#base/0.9.16/base","#events/0.9.1/events","#class/0.9.2/class"],function(e,t,n){var r=e("$"),i=e("#overlay/0.9.8/overlay"),s=i.extend({attrs:{trigger:{value:null,getter:function(e){return r(e)}},triggerType:"hover",delay:100,ifTriggerDisabled:function(){var e=this.trigger[0];return e.tagName==="INPUT"&&e.disabled}},setup:function(){s.superclass.setup.call(this),this._bindTrigger(),this._tweakAlignDefaultValue()},show:function(){s.superclass.show.call(this),this._setPosition()},toggle:function(){this[this.get("visible")?"hide":"show"]()},_tweakAlignDefaultValue:function(){var e=this.get("align");e.baseXY.toString()===[0,0].toString()&&(e.baseXY=[0,"100%"]),e.baseElement._id==="VIEWPORT"&&(e.baseElement=this.get("trigger")),this.set("align",e)},_bindTrigger:function(){function o(){clearTimeout(r),s.get("visible")&&(i=setTimeout(function(){s.hide()},n))}var e=this.get("trigger"),t=this.get("triggerType"),n=this.get("delay"),r,i,s=this;t==="click"?e.on(t,function(e){e.preventDefault(),s.toggle()}):t==="focus"?e.on("focus blur",function(){s.toggle()}):(e.hover(function(){clearTimeout(i),s.get("visible")||(r=setTimeout(function(){s.show()},n))},o),this.element.hover(function(){clearTimeout(i)},o))}});n.exports=s});