(()=>{"use strict";var t={497:(t,e,i)=>{i.d(e,{Z:()=>r});var n=i(645),o=i.n(n)()((function(t){return t[1]}));o.push([t.id,"*{box-sizing:border-box}html,body{margin:0;padding:0}body{height:100%}.container{display:flex;flex-wrap:wrap;gap:20px;margin:20px;height:900px}",""]);const r=o},61:(t,e,i)=>{i.d(e,{Z:()=>r});var n=i(645),o=i.n(n)()((function(t){return t[1]}));o.push([t.id,".panel{display:flex;min-width:500px;width:calc(50% - 20px);height:calc(50% - 20px);flex-grow:1;border:2px solid gray;border-radius:4px;background-color:#deb887}.panel__example{display:flex;align-items:center;justify-content:center;flex-grow:1}.panel__control{display:flex;width:200px;flex-wrap:wrap;padding:20px;display:flex;flex-wrap:wrap;gap:20px;border-right:2px solid gray}.panel__label{display:flex;justify-content:center;align-items:center;flex-direction:column;width:50px}.panel__input{width:100%}",""]);const r=o},531:(t,e,i)=>{i.d(e,{Z:()=>r});var n=i(645),o=i.n(n)()((function(t){return t[1]}));o.push([t.id,".slider__runner{box-sizing:border-box;position:absolute;z-index:2;top:-0.5rem;border:2px solid #fff;height:1.5rem;width:1.5rem;border-radius:50%;background-color:green;transform:translateX(-50%);cursor:pointer}",""]);const r=o},496:(t,e,i)=>{i.d(e,{Z:()=>r});var n=i(645),o=i.n(n)()((function(t){return t[1]}));o.push([t.id,".slider__tip-line{height:25px;user-select:none}.slider__tip{position:absolute}",""]);const r=o},317:(t,e,i)=>{i.d(e,{Z:()=>r});var n=i(645),o=i.n(n)()((function(t){return t[1]}));o.push([t.id,".slider{display:flex;position:relative;flex-direction:column;box-sizing:border-box;width:100%;margin:40px}.slider_vertical{flex-direction:row-reverse;width:auto;height:100%}.slider__bar-container{box-sizing:border-box;width:100%;height:.75rem;border:1px solid #000;background-color:#999;border-radius:3px;position:relative}.slider_vertical .slider__bar-container{width:.75rem;height:100%}.slider__range{position:absolute;border-radius:3px;background-color:green;height:100%}.slider_vertical .slider__range{width:100%;height:auto}.slider_vertical .slider__runner{right:-0.5rem;transform:translateY(-50%)}.slider__tip{line-height:16px;border:1px solid #000;border-radius:3px;padding:2px;position:absolute;background-color:green;top:-150%;left:50%;transform:translateX(-50%);user-select:none}.slider_vertical .slider__tip{transform:translateY(-50%);top:50%;left:150%}.slider__scale{position:relative;top:150%}.slider_vertical .slider__scale{display:flex;justify-content:end;height:100%;top:0;right:200%}.slider__mark{font-weight:bold;cursor:pointer;position:absolute;transform:translateX(-50%);user-select:none}.slider_vertical .slider__mark{transform:translateY(-50%)}",""]);const r=o},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=t(e);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,n){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(o[s]=!0)}for(var a=0;a<t.length;a++){var l=[].concat(t[a]);n&&o[l[0]]||(i&&(l[2]?l[2]="".concat(i," and ").concat(l[2]):l[2]=i),e.push(l))}},e}},298:(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(379),o=i.n(n),r=i(497);o()(r.Z,{insert:"head",singleton:!1});const s=r.Z.locals||{}},713:(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(379),o=i.n(n),r=i(61);o()(r.Z,{insert:"head",singleton:!1});const s=r.Z.locals||{}},451:(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(379),o=i.n(n),r=i(531);o()(r.Z,{insert:"head",singleton:!1});const s=r.Z.locals||{}},618:(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(379),o=i.n(n),r=i(496);o()(r.Z,{insert:"head",singleton:!1});const s=r.Z.locals||{}},164:(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(379),o=i.n(n),r=i(317);o()(r.Z,{insert:"head",singleton:!1});const s=r.Z.locals||{}},379:(t,e,i)=>{var n,o=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),r=[];function s(t){for(var e=-1,i=0;i<r.length;i++)if(r[i].identifier===t){e=i;break}return e}function a(t,e){for(var i={},n=[],o=0;o<t.length;o++){var a=t[o],l=e.base?a[0]+e.base:a[0],c=i[l]||0,h="".concat(l," ").concat(c);i[l]=c+1;var u=s(h),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(r[u].references++,r[u].updater(p)):r.push({identifier:h,updater:m(p,e),references:1}),n.push(h)}return n}function l(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var r=i.nc;r&&(n.nonce=r)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var s=o(t.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var c,h=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function u(t,e,i,n){var o=i?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=h(e,o);else{var r=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function p(t,e,i){var n=i.css,o=i.media,r=i.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var d=null,f=0;function m(t,e){var i,n,o;if(e.singleton){var r=f++;i=d||(d=l(e)),n=u.bind(null,i,r,!1),o=u.bind(null,i,r,!0)}else i=l(e),n=p.bind(null,i,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n));var i=a(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<i.length;n++){var o=s(i[n]);r[o].references--}for(var l=a(t,e),c=0;c<i.length;c++){var h=s(i[c]);0===r[h].references&&(r[h].updater(),r.splice(h,1))}i=l}}}},179:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),i(298);var o=n(i(130));i(544);var r=$(".js-panel__example").slider(),s=[{isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:-100,max:100,from:-50,to:40},{isRange:!0,isVertical:!0,hasTip:!0,hasScale:!0,step:10,min:100,max:200,from:-50,to:40},{isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:-100,max:100,from:-50,to:40},{isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:-100,max:100,from:-50,to:40}];$(".panel__control").each((function(t,e){new o.default($(e),r[t],s[t])}))},130:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),i(713);var n=function(){function t(t,e,i){var n=this;this.changeTextValue=function(t,e){var i,o=Number(t.val());n.slider.update(((i={})[e]=o,i)),n.verifyInput()},this.$element=t,this.slider=e,this.slider.update(i),this.searchElements(),this.attachEventHandler(),this.verifyInput(),this.attachCallback()}return t.prototype.attachCallback=function(){var t=this;this.slider.update({onChange:function(e){t.$from.val(e.from),t.$to.val(e.to)}})},t.prototype.searchElements=function(){this.$range=this.$element.find(".panel__input_name-range"),this.$vertical=this.$element.find(".panel__input_name-vertical"),this.$scale=this.$element.find(".panel__input_name-scale"),this.$min=this.$element.find(".panel__input_name-min"),this.$max=this.$element.find(".panel__input_name-max"),this.$from=this.$element.find(".panel__input_name-from"),this.$to=this.$element.find(".panel__input_name-to"),this.$step=this.$element.find(".panel__input_name-step"),this.$tip=this.$element.find(".panel__input_name-tip")},t.prototype.attachEventHandler=function(){this.$range.on("click",this.changeCheckboxValue.bind(this,this.$range,"isRange")),this.$vertical.on("click",this.changeCheckboxValue.bind(this,this.$vertical,"isVertical")),this.$tip.on("click",this.changeCheckboxValue.bind(this,this.$tip,"hasTip")),this.$scale.on("click",this.changeCheckboxValue.bind(this,this.$scale,"hasScale")),this.$min.on("change",this.changeTextValue.bind(this,this.$min,"min")),this.$max.on("change",this.changeTextValue.bind(this,this.$max,"max")),this.$from.on("change",this.changeTextValue.bind(this,this.$from,"from")),this.$to.on("change",this.changeTextValue.bind(this,this.$to,"to")),this.$step.on("change",this.changeTextValue.bind(this,this.$step,"step"))},t.prototype.changeCheckboxValue=function(t,e){var i,n=t.prop("checked");this.slider.update(((i={})[e]=n,i)),this.verifyInput()},t.prototype.verifyInput=function(){var t=this.slider.getOptions();this.$range.prop("checked",t.isRange),this.$vertical.prop("checked",t.isVertical),this.$min.val(t.min),this.$max.val(t.max),this.$from.val(t.from),this.$to.val(t.to),this.$step.val(t.step),this.$tip.prop("checked",t.hasTip),this.$scale.prop("checked",t.hasScale)},t}();e.default=n},111:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.events={}}return t.prototype.subscribe=function(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)},t.prototype.unsubscribe=function(t,e){this.events[t]=this.events[t].filter((function(t){return e!==t}))},t.prototype.emit=function(t,e){var i=this.events[t];i&&i.forEach((function(t){return t.call(null,e)}))},t}();e.default=i},328:function(t,e,i){var n=this&&this.__assign||function(){return(n=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var r=o(i(111)),s=o(i(371)),a=o(i(315)),l=o(i(883)),c=o(i(195)),h=function(){function t(t,e){this.callbacks=n({},c.default.callbacks),this.eventEmitter=new r.default,this.model=new s.default(c.default.defaultConfig,this.eventEmitter),this.view=new a.default(t,this.eventEmitter),this.presenter=new l.default(this.view,this.model,this.eventEmitter),this.attachEventEmitters(),this.update(e)}return t.prototype.update=function(t){void 0!==t&&(void 0!==t.onChange&&(this.callbacks.onChange=t.onChange),this.presenter.updateOptions(t))},t.prototype.getOptions=function(){return this.presenter.getOptions()},t.prototype.attachEventEmitters=function(){var t=this;this.eventEmitter.subscribe("onChange",(function(e){t.callbacks.onChange(e)}))},t}();e.default=h},428:(t,e)=>{var i;Object.defineProperty(e,"__esModule",{value:!0}),e.ENameOfEvent=void 0,function(t){t.UpdatedModelFrom="UpdatedModelFrom",t.UpdatedModelTo="UpdatedModelTo",t.UpdatedModelOptions="UpdatedModelOptions",t.ClickScale="ClickScale",t.ChangedRunnerPosition="ChangedRunnerPosition",t.ChangedRunnerFromPosition="ChangedRunnerFromPosition",t.ChangedRunnerToPosition="ChangedRunnerToPosition"}(i||(i={})),e.ENameOfEvent=i},525:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,i){var n="<"+e+' class="'+i+'"></'+e+">";return t.append(n),t.find("."+i).last()}},371:function(t,e,i){var n=this&&this.__assign||function(){return(n=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=i(428),r=function(){function t(t,e){this.eventEmitter=e,this.options=n({},t)}return t.prototype.updateOptions=function(t){var e,i,n=t.isRange,r=t.isVertical,s=t.hasTip,a=t.hasScale,l=t.min,c=t.max,h=t.from,u=t.to,p=t.step;this.options.isRange=this.verifyBooleanOption("isRange",n),this.options.isVertical=this.verifyBooleanOption("isVertical",r),this.options.hasTip=this.verifyBooleanOption("hasTip",s),this.options.hasScale=this.verifyBooleanOption("hasScale",a),e=this.verifyMinAndMax(l,c),this.options.min=e[0],this.options.max=e[1],i=this.verifyFromAndTo(h,u),this.options.from=i[0],this.options.to=i[1],this.options.step=this.verifyStep(p),this.eventEmitter.emit(o.ENameOfEvent.UpdatedModelOptions,this.options)},t.prototype.getOptions=function(){return this.options},t.prototype.calculateFromUsingFraction=function(t){var e=t.x,i=t.y,n=this.options,o=n.isVertical,r=n.from,s=n.min,a=(n.max-s)*(o?i:e)+s;a=this.checkFrom(a),a=this.calculateValueDependingOnStep(r,a),(a=this.checkFrom(a))!==r&&this.updateFrom(a)},t.prototype.calculateToUsingFraction=function(t){var e=t.x,i=t.y,n=this.options,o=n.isVertical,r=n.to,s=n.min,a=(n.max-s)*(o?i:e)+s;a=this.checkTo(a),a=this.calculateValueDependingOnStep(r,a),(a=this.checkTo(a))!==r&&this.updateTo(a)},t.prototype.updateNearValue=function(t){var e=this.options,i=e.isRange,n=e.from,o=e.to,r=Math.abs(n-t);Math.abs(o-t)<=r?this.updateTo(t):i?this.updateFrom(t):this.updateTo(t)},t.prototype.updateFrom=function(t){this.options.from=t,this.eventEmitter.emit(o.ENameOfEvent.UpdatedModelFrom,this.options)},t.prototype.updateTo=function(t){this.options.to=t,this.eventEmitter.emit(o.ENameOfEvent.UpdatedModelTo,this.options)},t.prototype.verifyBooleanOption=function(t,e){var i=this.options[t];return void 0===e||"boolean"!=typeof e?i:e},t.prototype.verifyNumberOption=function(t,e){var i=this.options[t];return void 0===e||"number"!=typeof e?i:e},t.prototype.verifyMinAndMax=function(t,e){var i=this.options,n=i.min,o=i.max,r=t,s=e;return(r=this.verifyNumberOption("min",r))<(s=this.verifyNumberOption("max",s))?[r,s]:n<s?[n,s]:[n,o]},t.prototype.verifyFromAndTo=function(t,e){var i=this.options,n=i.min,o=i.max,r=i.from,s=i.to,a=t,l=e;return a=this.verifyNumberOption("from",a),((l=this.verifyNumberOption("to",l))>o||l<n)&&(l=s),(s>o||s<n)&&(l=o),(a>o||a<n)&&(a=r),(r>o||r<n)&&(a=n),a>l&&(a=l),[a,l]},t.prototype.verifyStep=function(t){var e=this.options,i=e.min,n=e.max,o=t,r=Math.abs(n-i);return(o=this.verifyNumberOption("step",o))<r?o:r},t.prototype.calculateValueDependingOnStep=function(t,e){var i=this.options.step,n=t-e,o=t-(n-n%i);return Math.abs(n)<i/2?o:n<0?o+i:o-i},t.prototype.checkFrom=function(t){var e=this.options,i=e.to,n=e.min;return t>i?i:t<n?n:t},t.prototype.checkTo=function(t){var e=this.options,i=e.isRange,n=e.from,o=e.max,r=e.min;return t>o?o:t<r?r:i&&t<n?n:t},t}();e.default=r},883:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=i(428),o=function(){function t(t,e,i){this.view=t,this.model=e,this.eventEmitter=i,this.attachEventEmitters()}return t.prototype.updateOptions=function(t){this.model.updateOptions(t)},t.prototype.getOptions=function(){return this.model.getOptions()},t.prototype.attachEventEmitters=function(){var t=this;this.eventEmitter.subscribe(n.ENameOfEvent.UpdatedModelOptions,(function(e){t.view.update(e),t.eventEmitter.emit("onChange",e)})),this.eventEmitter.subscribe(n.ENameOfEvent.UpdatedModelFrom,(function(e){t.view.updatePositionFrom(e),t.eventEmitter.emit("onChange",e)})),this.eventEmitter.subscribe(n.ENameOfEvent.UpdatedModelTo,(function(e){t.view.updatePositionTo(e),t.eventEmitter.emit("onChange",e)})),this.eventEmitter.subscribe(n.ENameOfEvent.ClickScale,(function(e){t.model.updateNearValue(e)})),this.eventEmitter.subscribe(n.ENameOfEvent.ChangedRunnerFromPosition,(function(e){t.model.calculateFromUsingFraction(e)})),this.eventEmitter.subscribe(n.ENameOfEvent.ChangedRunnerToPosition,(function(e){t.model.calculateToUsingFraction(e)}))},t}();e.default=o},365:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(i(525)),r=function(){function t(t){this.$range=o.default(t,"div","slider__range")}return t.prototype.update=function(t){var e=t.isVertical,i=t.leftPosition,n=t.rightPosition;this.isVertical?this.$range.css({top:"",bottom:""}):this.$range.css({left:"",right:""}),this.isVertical=e,this.move({leftPosition:i,rightPosition:n})},t.prototype.move=function(t){var e=t.leftPosition,i=t.rightPosition;this.isVertical?this.$range.css({top:e+"%",bottom:100-i+"%"}):this.$range.css({left:e+"%",right:100-i+"%"})},t}();e.default=r},731:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),i(451);var o=i(428),r=n(i(525)),s=function(){function t(t,e,i){var n=this;this.attachEventMouseDown=function(){$(document).on("mousemove",n.attachEventMouseMove),$(document).on("mouseup",n.attachEventMouseUp)},this.attachEventMouseMove=function(){var t=n.getPosition(event);"from"===n.type&&n.eventEmitter.emit(o.ENameOfEvent.ChangedRunnerFromPosition,t),"to"===n.type&&n.eventEmitter.emit(o.ENameOfEvent.ChangedRunnerToPosition,t)},this.attachEventMouseUp=function(){$(document).off("mousemove")},this.type=t,this.$barContainer=e,this.eventEmitter=i,this.$runner=r.default(e,"div","slider__runner"),this.attachEvents()}return t.prototype.update=function(t,e,i){this.isVertical=t,e||"from"!==this.type?this.show():this.hide(),this.move({position:i})},t.prototype.move=function(t){var e=t.position;this.isVertical?this.$runner.css({top:e+"%",left:""}):this.$runner.css({left:e+"%",top:""})},t.prototype.hide=function(){this.$runner.css({display:"none"})},t.prototype.show=function(){this.$runner.css({display:""})},t.prototype.addClassTarget=function(){this.$runner.css({"z-index":3})},t.prototype.removeClassTarget=function(){this.$runner.css({"z-index":""})},t.prototype.attachEvents=function(){this.$runner.on("dragstart",!1),this.$runner.on("mousedown",this.attachEventMouseDown)},t.prototype.calculateSliderCharacterization=function(){var t=this.$barContainer.height(),e=this.$barContainer.offset().left,i=this.$barContainer.offset().top;return{height:t,width:this.$barContainer.width(),left:e,top:i}},t.prototype.getPosition=function(t){var e=this.calculateSliderCharacterization(),i=e.height,n=e.width,o=e.left,r=e.top;return{x:(t.clientX-o)/n,y:(t.clientY-r)/i}},t}();e.default=s},694:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=i(428),r=n(i(525)),s=function(){function t(t,e){var i=this;this.clickScale=function(t){var e=Number(t.target.innerHTML);i.eventEmitter.emit(o.ENameOfEvent.ClickScale,e)},this.eventEmitter=e,this.$scale=r.default(t,"div","slider__scale"),this.attachEvents()}return t.prototype.update=function(t){var e=t.hasScale,i=t.isVertical,n=t.min,o=t.max;this.removeMarks(),this.isVertical=i,e?this.$scale.css({display:""}):this.$scale.css({display:"none"}),this.addMarks({min:n,max:o})},t.prototype.addMarks=function(t){for(var e=t.min,i=t.max,n=Math.abs(i-e),o=0;o<=10;o+=1){var r=.1*o*1e3/10,s=$("<div>",{class:"slider__mark",text:""+(e+.1*n*o),style:(this.isVertical?"top":"left")+":"+r+"%"});this.$scale.append(s)}},t.prototype.removeMarks=function(){this.$scale.empty()},t.prototype.attachEvents=function(){this.$scale.on("click",this.clickScale)},t}();e.default=s},261:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),i(618);var o=n(i(525)),r=function(){function t(t){this.$tipLine=o.default(t,"div","slider__tip-line"),this.$tipFrom=o.default(this.$tipLine,"span","slider__tip"),this.$tipBoth=o.default(this.$tipLine,"span","slider__tip"),this.$tipTo=o.default(this.$tipLine,"span","slider__tip")}return t.prototype.update=function(t,e,i){var n=t.from,o=t.to,r=t.hasTip,s=t.isRange;this.changePosition(e,i),this.toggleDisplay(r,s),this.changeText(n,o)},t.prototype.changePosition=function(t,e){this.$tipFrom.css({left:t+"%",top:""}),this.$tipBoth.css({left:(t+e)/2+"%",top:""}),this.$tipTo.css({left:e+"%",top:""})},t.prototype.changeText=function(t,e){var i=t===e?e:t+" - "+e;this.$tipFrom.text(t),this.$tipTo.text(e),this.$tipBoth.text(i)},t.prototype.toggleDisplay=function(t,e){var i=t?"":"hidden";return this.$tipLine.css({visibility:i}),e?this.$tipFrom.offset().left+this.$tipFrom.outerWidth()>=this.$tipTo.offset().left?(this.$tipFrom.css({visibility:"hidden"}),this.$tipTo.css({visibility:"hidden"}),void this.$tipBoth.css({visibility:""})):(this.$tipFrom.css({visibility:""}),this.$tipTo.css({visibility:""}),void this.$tipBoth.css({visibility:"hidden"})):(this.$tipFrom.css({visibility:"hidden"}),void this.$tipBoth.css({visibility:"hidden"}))},t}();e.default=r},315:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(i(261)),r=n(i(525)),s=n(i(731)),a=n(i(365)),l=n(i(694)),c=function(){function t(t,e){this.$slider=r.default(t,"div","slider"),this.$barContainer=this.createBarContainer(),this.tip=new o.default(this.$slider),this.range=new a.default(this.$barContainer),this.runnerFrom=new s.default("from",this.$barContainer,e),this.runnerTo=new s.default("to",this.$barContainer,e),this.scale=new l.default(this.$slider,e)}return t.prototype.createBarContainer=function(){return this.$slider.append('<div class="slider__bar-container"></div>'),this.$slider.find(".slider__bar-container")},t.prototype.update=function(e){var i=e.isVertical,n=e.isRange,o=e.from,r=e.to,s=e.min,a=e.max,l=e.hasScale,c=t.calculatePosition(o,s,a),h=t.calculatePosition(r,s,a);i?this.addClassVertical():this.removeClassVertical(),this.runnerFrom.update(i,n,c),this.runnerTo.update(i,n,h),this.range.update({isVertical:i,leftPosition:c,rightPosition:h}),this.scale.update({hasScale:l,isVertical:i,min:s,max:a})},t.prototype.updatePositionFrom=function(e){var i=e.from,n=e.min,o=e.max,r=e.to,s=e.hasTip,a=e.isRange,l=t.calculatePosition(i,n,o),c=t.calculatePosition(r,n,o);this.tip.update({from:i,to:r,hasTip:s,isRange:a},l,c),this.runnerFrom.move({position:l}),this.range.move({leftPosition:l,rightPosition:c})},t.prototype.updatePositionTo=function(e){var i=e.from,n=e.to,o=e.hasTip,r=e.isRange,s=e.min,a=e.max,l=t.calculatePosition(i,s,a),c=t.calculatePosition(n,s,a);this.tip.update({from:i,to:n,hasTip:o,isRange:r},l,c),this.runnerTo.move({position:c}),this.range.move({leftPosition:l,rightPosition:c})},t.prototype.addClassVertical=function(){this.$slider.addClass("slider_vertical")},t.prototype.removeClassVertical=function(){this.$slider.removeClass("slider_vertical")},t.calculatePosition=function(t,e,i){return(t-e)/(i-e)*100},t}();e.default=c},544:function(t,e,i){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),i(164);var o=n(i(328));$.fn.slider=function(t){return this.map((function(e,i){return new o.default($(i),t)}))}},195:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default={defaultConfig:{isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:0,max:100,from:40,to:70},callbacks:{onChange:function(){}}}}},e={};function i(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={id:n,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(179)})();