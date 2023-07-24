(()=>{"use strict";var e={869:(e,t,n)=>{n.r(t)},330:(e,t,n)=>{n.r(t)},667:(e,t,n)=>{n.r(t)},759:(e,t,n)=>{n.r(t)},131:(e,t,n)=>{n.r(t)},39:(e,t,n)=>{n.r(t)},395:(e,t,n)=>{n.r(t)},618:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(414));n(869);const r=n(996);n(43);const o=$(".js-panel__example").slider();document.querySelectorAll(".js-panel__control").forEach(((e,t)=>{new r.Panel(e,o[t],s.default[t])}))},996:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Panel=void 0,n(330);const i=n(722);t.Panel=class{constructor(e,t,n){this.handleChangeInputElement=e=>{if(!(e.target instanceof HTMLInputElement))return;const t=e.target.plugin.name;if("from"===t||"to"===t){const e=Number(this.dom.from.value),t=Number(this.dom.to.value);this.slider.update({from:e,to:t})}else{const n=Number(e.target.value);this.slider.update({[t]:n})}(0,i.syncInputs)(this.slider,this.dom)},this.slider=t,this.handleClickCheckboxElement=this.handleClickCheckboxElement.bind(this),this.handleChangeInputElement=this.handleChangeInputElement.bind(this);const{dom:s}=this.init(e,n);this.dom=s}init(e,t){this.slider.update(t);const n=(0,i.searchElements)(e);return this.attachEventHandlers(n),(0,i.syncInputs)(this.slider,n),(0,i.attachCallback)(n,this.slider),{dom:n}}attachEventHandlers(e){const{range:t,vertical:n,scale:i,min:s,max:r,from:o,to:a,step:l,tip:c}=e;return t.addEventListener("click",this.handleClickCheckboxElement),n.addEventListener("click",this.handleClickCheckboxElement),c.addEventListener("click",this.handleClickCheckboxElement),i.addEventListener("click",this.handleClickCheckboxElement),s.addEventListener("change",this.handleChangeInputElement),r.addEventListener("change",this.handleChangeInputElement),o.addEventListener("change",this.handleChangeInputElement),a.addEventListener("change",this.handleChangeInputElement),l.addEventListener("change",this.handleChangeInputElement),this}handleClickCheckboxElement(e){if(!(e.target instanceof HTMLInputElement))return;const t=e.target.checked,n=e.target.plugin.name;this.slider.update({[n]:t}),(0,i.syncInputs)(this.slider,this.dom)}}},722:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.attachCallback=t.syncInputs=t.searchElements=void 0,t.searchElements=e=>{const t=e.querySelector(".panel__input_name-range");if(!(t instanceof HTMLInputElement))throw Error();t.plugin={name:"isRange"};const n=e.querySelector(".panel__input_name-vertical");if(!(n instanceof HTMLInputElement))throw Error();n.plugin={name:"isVertical"};const i=e.querySelector(".panel__input_name-scale");if(!(i instanceof HTMLInputElement))throw Error();i.plugin={name:"hasScale"};const s=e.querySelector(".panel__input_name-min");if(!(s instanceof HTMLInputElement))throw Error();s.plugin={name:"min"};const r=e.querySelector(".panel__input_name-max");if(!(r instanceof HTMLInputElement))throw Error();r.plugin={name:"max"};const o=e.querySelector(".panel__input_name-from");if(!(o instanceof HTMLInputElement))throw Error();o.plugin={name:"from"};const a=e.querySelector(".panel__input_name-to");if(!(a instanceof HTMLInputElement))throw Error();a.plugin={name:"to"};const l=e.querySelector(".panel__input_name-step");if(!(l instanceof HTMLInputElement))throw Error();l.plugin={name:"step"};const c=e.querySelector(".panel__input_name-tip");if(!(c instanceof HTMLInputElement))throw Error();return c.plugin={name:"hasTip"},{root:e,range:t,vertical:n,scale:i,min:s,max:r,from:o,to:a,step:l,tip:c}},t.syncInputs=(e,t)=>{const n=e.getOptions();if(void 0===n)return;const{isRange:i,isVertical:s,from:r,to:o,min:a,max:l,hasScale:c,hasTip:d,step:u}=n;t.range.checked=i,t.vertical.checked=s,t.min.value=String(a),t.max.value=String(l),t.from.value=String(r),t.to.value=String(o),t.step.value=String(u),t.tip.checked=d,t.scale.checked=c},t.attachCallback=(e,t)=>{const n=e;t.update({onChange:({from:e,to:t})=>{n.from.value=String(e),n.to.value=String(t)}})}},833:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(620),s=n(89);t.App=class{constructor(e,t){this.callbacks={onChange:()=>{}},this.presenter=this.init(e,t)}update(e){this.updateCallbacks(e),this.presenter.updateOptions(e)}getOptions(){return this.presenter.getOptions()}init(e,t){const n=Object.assign({},s.defaultConfig),r=new i.Model(n,t),o=new i.View(e),a=new i.Presenter(o,r);return this.attachEventEmitters(a),this.updateCallbacks(t),a}attachEventEmitters(e){e.subscribe("onChange",(e=>{this.callbacks.onChange(e)}))}updateCallbacks(e){void 0!==e&&void 0!==e.onChange&&(this.callbacks={onChange:e.onChange})}}},20:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const i=n(995),s=n(538),r=n(143);class o extends i.EventEmitter{constructor(e,t){super(),this.options=(0,s.validate)(e,t)}updateOptions(e){this.options=(0,s.validate)(this.options,e),this.emit("UpdatedModelOptions",this.options)}getOptions(){return this.options}calculateValueUsingFraction({position:e,type:t}){this.options=(0,r.calculateValue)(e,this.options,t),this.emit("UpdatedModelValues",this.options)}calculateNearValueUsingFraction(e){this.options=(0,r.calculateValue)(e,this.options),this.emit("UpdatedModelValues",this.options)}updateNearValue(e){this.options=(0,r.updateNearValue)(e,this.options),this.emit("UpdatedModelValues",this.options)}updateValueByStep({type:e,touchRoute:t}){this.options=(0,r.updateOptionsByStep)(t,this.options,e),this.emit("UpdatedModelValues",this.options)}}t.Model=o},143:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateNearValue=t.calculateValue=t.updateOptionsByStep=void 0;const n=({from:e,to:t,min:n,max:i,isRange:s},r)=>["from"!==r&&s?e:n,"from"===r?t:i],i=(e,{step:t,from:i,to:s,min:r,max:o,isRange:a},l)=>{const[c,d]=n({from:i,to:s,min:r,max:o,isRange:a},l),u="from"===l?i:s,p=Math.abs(e-u),h=p%t;return((e,t)=>{const[,n]=String(t).split(".");return void 0===n?e:Number(e.toFixed(n.length))})(e<c?c:e>d?d:p<t/2?u:h<t/2?e>u?e-h:e+h:e+h-t<c?c:e-h+t>d?d:e>u?e-h+t:e+h-t,t)},s=(e,{isRange:t,from:n,to:i})=>{if(!t)return"to";const s=Math.abs(n-e),r=Math.abs(i-e);return s===r?n>e?"from":"to":s<r?"from":"to"};t.updateOptionsByStep=(e,t,i)=>{const s="up"===e?t[i]+t.step:t[i]-t.step,[r,o]=n(t,i);return s<r?Object.assign(Object.assign({},t),{[i]:r}):s>o?Object.assign(Object.assign({},t),{[i]:o}):Object.assign(Object.assign({},t),{[i]:s})},t.calculateValue=(e,t,n)=>{const r=(({x:e,y:t},{min:n,max:i,isVertical:s})=>(i-n)*(s?t:e)+n)(e,t);if(void 0!==n)return Object.assign(Object.assign({},t),{[n]:i(r,t,n)});const o=s(r,t);return Object.assign(Object.assign({},t),{[o]:i(r,t,o)})},t.updateNearValue=(e,t)=>{const n=s(e,t);return Object.assign(Object.assign({},t),{[n]:e})}},538:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;const n=(e,t)=>-1!==String(t).search(/^(-|\+)?([0-9]+)?(\.|,)?([0-9]+)$/)?Number(t):e;t.validate=(e,t)=>{const i="boolean"==typeof(null==t?void 0:t.isRange)?t.isRange:e.isRange,s="boolean"==typeof(null==t?void 0:t.isVertical)?t.isVertical:e.isVertical,r="boolean"==typeof(null==t?void 0:t.hasTip)?t.hasTip:e.hasTip,o="boolean"==typeof(null==t?void 0:t.hasScale)?t.hasScale:e.hasScale,{min:a,max:l}=((e,t)=>{const i=n(e.min,null==t?void 0:t.min),s=n(e.max,null==t?void 0:t.max);if(i===s)return{min:i,max:s+1};const[r,o]=[i,s].sort(((e,t)=>e-t));return{min:r,max:o}})(e,t),{from:c,to:d}=((e,t,i,s)=>{const r=n(e.from,null==s?void 0:s.from),o=n(e.to,null==s?void 0:s.to),[a,l]=[r,o].sort(((e,t)=>e-t)),c=((e,t,n)=>n>t?t:n<e?e:n)(t,i,l);return{from:((e,t,n)=>n<e?e:n>t?t:n)(t,c,a),to:c}})(e,a,l,t);return{from:c,to:d,min:a,max:l,step:((e,t,i,s)=>{const r=n(e.step,null==s?void 0:s.step);if(r<=0)return 1;const o=i-t;return r<o?r:o})(e,a,l,t),isRange:i,isVertical:s,hasScale:o,hasTip:r}}},867:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const i=n(995);class s extends i.EventEmitter{constructor(e,t){super(),this.view=e,this.model=t,this.attachEventEmittersToModel().attachEventEmittersToView()}updateOptions(e){this.model.updateOptions(e)}getOptions(){return this.model.getOptions()}attachEventEmittersToModel(){const e=({position:e,type:t})=>{this.model.calculateValueUsingFraction({position:e,type:t})},t=({type:e,touchRoute:t})=>{this.model.updateValueByStep({type:e,touchRoute:t})},n=({position:e})=>{this.model.calculateNearValueUsingFraction(e)};return this.view.subViews.scale.subscribe("ClickScale",(({targetNumber:e})=>{this.model.updateNearValue(e)})),this.view.subViews.runnerFrom.subscribe("ChangedRunnerPosition",e),this.view.subViews.runnerTo.subscribe("ChangedRunnerPosition",e),this.view.subViews.runnerFrom.subscribe("ChangedRunnerPositionStep",t),this.view.subViews.runnerTo.subscribe("ChangedRunnerPositionStep",t),this.view.subViews.runnerFrom.subscribe("ChangedNearRunnerPosition",n),this.view.subViews.runnerTo.subscribe("ChangedNearRunnerPosition",n),this.view.subViews.tip.subscribe("ChangedNearRunnerPosition",n),this.view.subViews.tip.subscribe("ChangedRunnerPosition",e),this}attachEventEmittersToView(){return this.model.subscribe("UpdatedModelOptions",(e=>{this.view.render(e),this.emit("onChange",e)})),this.model.subscribe("UpdatedModelValues",(e=>{this.view.update(e),this.emit("onChange",e)})),this}}t.Presenter=s},341:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0,n(395);const i=n(995),s=n(766);class r extends i.EventEmitter{constructor(e){super(),this.props={target:"from"};const{dom:t,subViews:n}=this.init(e);this.dom=t,this.subViews=n}render(e){const{isVertical:t,isRange:n}=e;this.props=(0,s.calculateTarget)(e),(0,s.toggleVertical)(this.dom,t),this.subViews.tip.render(e),this.subViews.runnerFrom.render(n),this.subViews.runnerTo.render(n),this.subViews.range.render(),this.subViews.scale.render(e),this.updateSubViews(e)}update(e){this.updateSubViews(e)}init(e){const t=(0,s.createElements)(e),n=(0,s.initSubViews)(t);return this.subscribeToRunnerAndTip(n),{dom:t,subViews:n}}subscribeToRunnerAndTip({runnerFrom:e,runnerTo:t,tip:n}){const i=({type:e})=>{this.props={target:e}};return e.subscribe("ChangedRunnerPosition",i),t.subscribe("ChangedRunnerPosition",i),n.subscribe("ChangedRunnerPosition",i),this}updateSubViews(e){return this.subViews.tip.update(e),this.subViews.range.update(e),this.subViews.runnerFrom.update(e,this.props.target),this.subViews.runnerTo.update(e,this.props.target),this}}t.View=r},766:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleVertical=t.calculateTarget=t.createElements=t.initSubViews=void 0;const i=n(195);t.createElements=e=>{const t=document.createElement("div");t.classList.add("slider");const n=document.createElement("div");return n.classList.add("slider__bar-container"),e.appendChild(t),t.appendChild(n),{root:e,barContainer:n,slider:t}},t.initSubViews=e=>({tip:new i.Tip(e.slider),range:new i.Range(e.barContainer),scale:new i.Scale(e.slider),runnerFrom:new i.Runner(e.barContainer,"from"),runnerTo:new i.Runner(e.barContainer,"to")}),t.calculateTarget=({from:e,min:t,max:n})=>{const{abs:i}=Math;return{target:i(t-e)/i(n-t)<.5?"to":"from"}},t.toggleVertical=({slider:e},t)=>{t?e.classList.add("slider_vertical"):e.classList.remove("slider_vertical")}},49:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={range:"slider__range"}},512:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0,n(667);const i=n(594);t.Range=class{constructor(e){const{dom:t}=(0,i.init)(e);this.dom=t}render(){this.dom.root.appendChild(this.dom.range)}update(e){(0,i.changeDimensions)(this.dom.range,e)}}},594:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeDimensions=t.init=void 0;const i=n(868),s=n(49);t.init=e=>({dom:(e=>({root:e,range:i.helpers.createElement(s.cssSelectors.range)}))(e)}),t.changeDimensions=(e,{min:t,max:n,isVertical:s,isRange:r,from:o,to:a})=>{const l=e,c=r?i.helpers.calculatePercent(o,t,n):0,d=i.helpers.calculatePercent(a,t,n);l.style.cssText=s?`top: ${c}%; bottom: ${100-d}%`:`left: ${c}%; right: ${100-d}%`}},86:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={runner:"slider__runner",targetedRunner:"slider__runner_targeted"}},546:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0,n(759);const i=n(995),s=n(868),r=n(827);class o extends i.EventEmitter{constructor(e,t){super(),this.handlePointerdownRunner=this.handlePointerdownRunner.bind(this),this.handleKeydownRunner=this.handleKeydownRunner.bind(this);const{dom:n,props:i}=this.init(e,t);this.dom=n,this.props=i}render(e){"from"!==this.props.type||e?this.dom.root.appendChild(this.dom.runner):(0,r.destroy)(this.dom)}update(e,t){(0,r.toggleTarget)(this.props,this.dom,t),(0,r.move)(this.dom,this.props,e)}init(e,t){const n=(0,r.createElements)(e),i=(0,r.initProps)(t);return this.attachEventHandlers(n),{dom:n,props:i}}attachEventHandlers(e){e.runner.addEventListener("pointerdown",this.handlePointerdownRunner),e.runner.addEventListener("keydown",this.handleKeydownRunner)}handleKeydownRunner(e){const{code:t}=e,n=t=>{e.preventDefault();const{type:n}=this.props;this.emit("ChangedRunnerPositionStep",{type:n,touchRoute:t})};"ArrowDown"!==t&&"ArrowRight"!==t||n("up"),"ArrowUp"!==t&&"ArrowLeft"!==t||n("down")}handlePointerdownRunner(){const e=e=>{e.preventDefault(),this.dom.runner.ondragstart=()=>!1;const{type:t}=this.props,n=s.helpers.getPosition(this.dom.root,e);this.emit("ChangedRunnerPosition",{position:n,type:t})},t=()=>{document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",t)};document.addEventListener("pointermove",e),document.addEventListener("pointerup",t)}}t.Runner=o},827:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.move=t.toggleTarget=t.destroy=t.initProps=t.createElements=void 0;const i=n(868),s=n(86);t.createElements=e=>({root:e,runner:i.helpers.createElement(s.cssSelectors.runner)}),t.initProps=e=>({type:e}),t.destroy=({runner:e})=>{e.remove()},t.toggleTarget=({type:e},{runner:t},n)=>{n!==e?t.classList.remove(s.cssSelectors.targetedRunner):t.classList.add(s.cssSelectors.targetedRunner)},t.move=({runner:e},{type:t},{min:n,max:s,from:r,to:o,isVertical:a})=>{const l=e,c="from"===t?r:o,d=i.helpers.calculatePercent(c,n,s),u=a?`top:${d}%;`:`left:${d}%;`;l.style.cssText=u}},760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={scale:"slider__scale",mark:"slider__mark"}},561:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0,n(131);const i=n(995),s=n(366);class r extends i.EventEmitter{constructor(e){super(),this.props={min:0,max:0,isVertical:!1},this.handlePointerdownScale=this.handlePointerdownScale.bind(this),this.handleWindowsResize=this.handleWindowsResize.bind(this);const{dom:t}=this.init(e);this.dom=t}render({min:e,max:t,isVertical:n,hasScale:i}){i?(this.props={min:e,max:t,isVertical:n},this.dom.root.appendChild(this.dom.scale),(0,s.update)(this.dom,this.props)):(0,s.destroy)(this.dom)}init(e){const t=(0,s.createElement)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({scale:e}){return e.addEventListener("pointerdown",this.handlePointerdownScale),window.addEventListener("resize",this.handleWindowsResize),this}handlePointerdownScale(e){if(!(e.target instanceof HTMLSpanElement))return;if(!("customValue"in e.target))return;const t=Number(e.target.customValue);this.emit("ClickScale",{targetNumber:t})}handleWindowsResize(){(0,s.update)(this.dom,this.props)}}t.Scale=r},366:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.destroy=t.getScalePercents=t.createElement=void 0;const i=n(868),s=n(760);t.createElement=e=>({root:e,scale:i.helpers.createElement(s.cssSelectors.scale)});const r=e=>e>800?[0,10,20,30,40,50,60,70,80,90,100]:e>500?[0,20,40,60,80,100]:e>300?[0,33,66,100]:[0,100];t.getScalePercents=r,t.destroy=({scale:e})=>{e.remove()},t.update=(e,t)=>{(({scale:e})=>{for(;null!==e.firstChild;)e.removeChild(e.firstChild)})(e),(({scale:e},{isVertical:t},n)=>{n.forEach((n=>{const{percent:i,value:r}=n,o=t?`top: ${i}%`:`left: ${i}%`,a=document.createElement("span");a.classList.add(s.cssSelectors.mark),a.style.cssText=o,a.innerText=String(r),a.customValue=Number(r),e.appendChild(a)}))})(e,t,(({max:e,min:t,isVertical:n},{scale:i})=>{const{offsetHeight:s,offsetWidth:o}=i,a=r(n?s:o),l=Math.abs(e-t);return a.map((e=>({percent:e,value:Number((t+l*e/100).toFixed(1).replace(/\.?0+$/,""))})))})(t,e))}},880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={tip:"slider__tip",hiddenTip:"slider__tip_hidden",tipLine:"slider__tip-line",verticalTipLine:"slider__tip-line_vertical"}},875:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0,n(39);const i=n(995),s=n(868),r=n(626),o=n(880);class a extends i.EventEmitter{constructor(e){super(),this.handlePointerdownTip=this.handlePointerdownTip.bind(this);const{dom:t}=this.init(e);this.dom=t}render({hasTip:e,isRange:t,isVertical:n}){e?(this.dom.root.insertAdjacentElement("afterbegin",this.dom.tipLine),t?(this.dom.tipLine.appendChild(this.dom.tipFrom),this.dom.tipLine.appendChild(this.dom.tipBoth)):(this.dom.tipFrom.remove(),this.dom.tipBoth.remove()),this.dom.tipLine.appendChild(this.dom.tipTo),n?this.dom.tipLine.classList.add(o.cssSelectors.verticalTipLine):this.dom.tipLine.classList.remove(o.cssSelectors.verticalTipLine)):(0,r.destroy)(this.dom)}update(e){const{dom:t}=this;(0,r.changeText)(e,t),(0,r.changePosition)(e,t),(0,r.toggleDisplay)(e,t)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({tipFrom:e,tipTo:t,tipBoth:n}){return e.addEventListener("pointerdown",this.handlePointerdownTip),t.addEventListener("pointerdown",this.handlePointerdownTip),n.addEventListener("pointerdown",this.handlePointerdownTip),this}handlePointerdownTip({target:e}){if(null===e)return;if(!("customType"in e))return;const{customType:t}=e,n=e=>{e.preventDefault();const n=e.target;if(!(n instanceof HTMLElement))return;n.ondragstart=()=>!1;const i=s.helpers.getPosition(this.dom.root,e);"both"!==t?"from"!==t&&"to"!==t||this.emit("ChangedRunnerPosition",{position:i,type:t}):this.emit("ChangedNearRunnerPosition",{position:i})},i=()=>{document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",i)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",i)}}t.Tip=a},626:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeText=t.destroy=t.changePosition=t.toggleDisplay=t.createElements=void 0;const i=n(868),s=n(880);t.createElements=e=>{const t=i.helpers.createElement(s.cssSelectors.tipLine),n=i.helpers.createElement(s.cssSelectors.tip),r=i.helpers.createElement(s.cssSelectors.tip),o=i.helpers.createElement(s.cssSelectors.tip);return n.customType="from",r.customType="both",o.customType="to",{root:e,tipLine:t,tipFrom:n,tipBoth:r,tipTo:o}},t.toggleDisplay=({isRange:e,isVertical:t},{tipFrom:n,tipTo:i,tipBoth:r})=>{if(!e)return void i.classList.remove(s.cssSelectors.hiddenTip);const{x:o,y:a,height:l,width:c}=n.getBoundingClientRect(),d=i.getBoundingClientRect();if(t?a+l>=d.y:o+c>=d.x)return n.classList.add(s.cssSelectors.hiddenTip),r.classList.remove(s.cssSelectors.hiddenTip),void i.classList.add(s.cssSelectors.hiddenTip);n.classList.remove(s.cssSelectors.hiddenTip),r.classList.add(s.cssSelectors.hiddenTip),i.classList.remove(s.cssSelectors.hiddenTip)},t.changePosition=({min:e,max:t,isVertical:n,from:s,to:r,isRange:o},{tipBoth:a,tipFrom:l,tipTo:c})=>{const d=c,u=i.helpers.calculatePercent(r,e,t),p=n?`top: ${u}%;`:`left: ${u}%;`;if(d.style.cssText=p,!o)return;const h=l,m=a,g=i.helpers.calculatePercent(s,e,t),v=n?`top: ${g}%;`:`left: ${g}%;`,b=n?`top: ${(g+u)/2}%;`:`left: ${(g+u)/2}%;`;h.style.cssText=v,m.style.cssText=b},t.destroy=({tipLine:e})=>{e.remove()},t.changeText=({from:e,to:t,isRange:n},{tipFrom:i,tipTo:s,tipBoth:r})=>{if(s.innerText=String(t),!n)return;const o=i,a=r,l=e===t?String(t):`${e} - ${t}`;o.innerText=String(e),a.innerText=l}},195:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=t.Scale=t.Runner=t.Range=void 0;const i=n(512);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return i.Range}});const s=n(546);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return s.Runner}});const r=n(561);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return r.Scale}});const o=n(875);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return o.Tip}})},620:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=t.View=t.Model=void 0;const i=n(20);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return i.Model}});const s=n(341);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return s.View}});const r=n(867);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return r.Presenter}})},89:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultConfig=void 0,t.defaultConfig={isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:0,max:100,from:40,to:70}},995:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this.events={}}subscribe(e,t){const n=this.events[e];this.events[e]=void 0===n?[t]:[...n,t]}unsubscribe(e,t){var n;this.events[e]=null===(n=this.events[e])||void 0===n?void 0:n.filter((e=>t!==e))}emit(e,t){var n;null===(n=this.events[e])||void 0===n||n.forEach((e=>e(t)))}}},12:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calculatePercent=void 0,t.calculatePercent=(e,t,n)=>(e-t)/(n-t)*100},109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=void 0,t.createElement=e=>{const t=document.createElement("div");return t.classList.add(e),t}},212:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getPosition=void 0,t.getPosition=(e,t)=>{const{height:n,width:i,left:s,top:r}=e.getBoundingClientRect(),{clientX:o,clientY:a}=t;return{x:(o-s)/i,y:(a-r)/n}}},868:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=void 0;const i=n(109),s=n(212),r=n(12),o={createElement:i.createElement,getPosition:s.getPosition,calculatePercent:r.calculatePercent};t.helpers=o},43:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(833);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return i.App}}),$.fn.slider=function(e){return this.map(((t,n)=>new i.App(n,e)))}},414:e=>{e.exports=JSON.parse('[{"isRange":true,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-100,"max":100,"from":-50,"to":40},{"isRange":true,"isVertical":true,"hasTip":true,"hasScale":true,"step":10,"min":100,"max":200,"from":100,"to":150},{"isRange":false,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-100,"max":100,"from":-50,"to":40},{"isRange":true,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-1000,"max":100000,"from":-50,"to":4000}]')}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(618)})();