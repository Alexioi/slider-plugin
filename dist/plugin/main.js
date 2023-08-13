(()=>{"use strict";var e={935:(e,t,n)=>{n.r(t)},182:(e,t,n)=>{n.r(t)},588:(e,t,n)=>{n.r(t)},188:(e,t,n)=>{n.r(t)},337:(e,t,n)=>{n.r(t)},317:(e,t,n)=>{n.r(t)},927:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(620),o=n(89);t.App=class{constructor(e,t){this.presenter=((e,t)=>{const n=Object.assign({},o.defaultOptions),r=new i.Model(n,t),s=new i.View(e);return new i.Presenter(s,r)})(e,t)}update(e){this.presenter.updateConfig(e)}getConfig(){return this.presenter.getConfig()}}},833:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(927);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return i.App}})},747:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const i=n(995),o=n(538),r=n(143);class s extends i.EventEmitter{constructor(e,t){super(),this.callbacks={onChange:()=>{}};const{newOptions:n,callbacks:i}=(0,o.validate)(e,this.callbacks,t);this.options=n,this.callbacks=i}updateConfig(e){const{newOptions:t,callbacks:n}=(0,o.validate)(this.options,this.callbacks,e);this.options=t,this.callbacks=n,this.callbacks.onChange(this.options),this.emit("UpdateModelOptions",this.options)}getConfig(){return Object.assign(Object.assign({},this.options),this.callbacks)}calculateValueUsingFraction({position:e,type:t},n){this.options=(0,r.calculateValue)(e,this.options,n,t),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}calculateNearValueUsingFraction(e,t){this.options=(0,r.calculateValue)(e,this.options,t),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}updateNearValue(e){this.options=(0,r.updateNearValue)(e,this.options),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}updateValueByStep({type:e,touchRoute:t}){this.options=(0,r.updateOptionsByStep)(t,this.options,e),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}}t.Model=s},20:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const i=n(747);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return i.Model}})},143:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateNearValue=t.calculateValue=t.updateOptionsByStep=void 0;const n=(e,t)=>{const[,n]=String(t).split(".");if(void 0===n)return Number(e.toFixed(0));const i=Number(e.toFixed(n.length)),o=Math.pow(10,n.length);return Math.round(i*o)/o},i=({from:e,to:t,min:n,max:i,isRange:o},r)=>({minimum:"from"!==r&&o?e:n,maximum:"from"===r?t:i}),o=(e,{step:t,from:o,to:r,min:s,max:a,isRange:l},c,d)=>{const{minimum:u,maximum:p}=i({from:o,to:r,min:s,max:a,isRange:l},c);if("none"===t)return e<u?u:e>p?p:e;const h="from"===c?o:r,m=Math.abs(e-h),g=Math.floor(m/t)*t;return e<u?u:e>p?p:d?((e,t,i,o,r,s,a)=>e<i/2?o:r-i<s?s:r+i>a?a:n(e<i?r>o?o+i:o-i:e%i>i/2?r>o?o+t+i:o-t-i:r>o?o+t:o-t,i))(m,g,t,h,e,u,p):n(e>h?h+g:h-g,t)},r=(e,{isRange:t,from:n,to:i})=>t&&Math.abs(n-e)<Math.abs(i-e)?"from":"to";t.updateOptionsByStep=(e,t,n)=>{const o="none"===t.step?(t.max-t.min)/10:t.step,r="up"===e?t[n]+o:t[n]-o,{minimum:s,maximum:a}=i(t,n);return r<s?Object.assign(Object.assign({},t),{[n]:s}):r>a?Object.assign(Object.assign({},t),{[n]:a}):Object.assign(Object.assign({},t),{[n]:r})},t.calculateValue=(e,t,n,i)=>{const s=(({x:e,y:t},{min:n,max:i,isVertical:o})=>(i-n)*(o?t:e)+n)(e,t);if(void 0!==i)return Object.assign(Object.assign({},t),{[i]:o(s,t,i,n)});const a=r(s,t);return Object.assign(Object.assign({},t),{[a]:o(s,t,a,n)})},t.updateNearValue=(e,t)=>{const n=r(e,t);return Object.assign(Object.assign({},t),{[n]:e})}},538:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;const n=(e,t)=>void 0!==t?t:e;t.validate=(e,t,i)=>{const o="boolean"==typeof(null==i?void 0:i.isRange)?i.isRange:e.isRange,r="boolean"==typeof(null==i?void 0:i.isVertical)?i.isVertical:e.isVertical,s="boolean"==typeof(null==i?void 0:i.hasTip)?i.hasTip:e.hasTip,a="boolean"==typeof(null==i?void 0:i.hasScale)?i.hasScale:e.hasScale,{min:l,max:c}=((e,t)=>{const i=n(e.min,null==t?void 0:t.min),o=n(e.max,null==t?void 0:t.max);if(i===o)return{min:i,max:o+1};const[r,s]=[i,o].sort(((e,t)=>e-t));return{min:r,max:s}})(e,i),{from:d,to:u}=((e,t,i,o)=>{const r=n(e.from,null==o?void 0:o.from),s=n(e.to,null==o?void 0:o.to),[a,l]=[r,s].sort(((e,t)=>e-t)),c=((e,t,n)=>n>t?t:n<e?e:n)(t,i,l);return{from:((e,t,n)=>n<e?e:n)(t,0,a),to:c}})(e,l,c,i);return{newOptions:{from:d,to:u,min:l,max:c,step:((e,t,n,i)=>{const o=void 0===(null==i?void 0:i.step)?e.step:null==i?void 0:i.step;if("none"===o)return"none";if(o<=0)return"none";const r=n-t;return o<r?o:r})(e,l,c,i),isRange:o,isVertical:r,hasScale:a,hasTip:s,format:void 0!==(null==i?void 0:i.format)?i.format:e.format},callbacks:{onChange:void 0!==(null==i?void 0:i.onChange)?i.onChange:t.onChange}}}},750:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0,t.Presenter=class{constructor(e,t){this.view=e,this.model=t,this.attachEventEmittersToModel().attachEventEmittersToView()}updateConfig(e){this.model.updateConfig(e)}getConfig(){return this.model.getConfig()}attachEventEmittersToModel(){return this.view.subscribe("ClickScale",(({targetNumber:e})=>{this.model.updateNearValue(e)})),this.view.subscribe("ChangeRunnerPosition",(({position:e,type:t})=>{this.model.calculateValueUsingFraction({position:e,type:t},!1)})),this.view.subscribe("ChangeRunnerPositionByStep",(({type:e,touchRoute:t})=>{this.model.updateValueByStep({type:e,touchRoute:t})})),this.view.subscribe("ChangeNearRunnerPosition",(({position:e})=>{this.model.calculateNearValueUsingFraction(e,!0)})),this}attachEventEmittersToView(){return this.model.subscribe("UpdateModelOptions",(e=>{this.view.render(e)})),this.model.subscribe("UpdateModelValues",(e=>{this.view.update(e)})),this}}},867:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const i=n(750);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return i.Presenter}})},296:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const i=n(995),o=n(766);n(935);class r extends i.EventEmitter{constructor(e){super(),this.props={target:"from"};const{dom:t,subViews:n}=this.init(e);this.dom=t,this.subViews=n}render(e){this.props=(0,o.calculateTarget)(e),(0,o.toggleVertical)(this.dom,e.isVertical),this.subViews.bar.render(),this.subViews.tip.render(e),this.subViews.runnerFrom.render(e),this.subViews.runnerTo.render(e),this.subViews.range.render(),this.subViews.scale.render(e),this.updateSubViews(e)}update(e){this.updateSubViews(e)}init(e){const t=(0,o.createElements)(e),n=(0,o.initSubViews)(t);return this.attachEventEmittersToSubView(n),{dom:t,subViews:n}}attachEventEmittersToSubView({runnerFrom:e,runnerTo:t,tip:n,bar:i,scale:o}){const r=({position:e,type:t})=>{this.props={target:t},this.emit("ChangeRunnerPosition",{position:e,type:t})},s=({type:e,touchRoute:t})=>{this.emit("ChangeRunnerPositionByStep",{type:e,touchRoute:t})};return e.subscribe("ChangeRunnerPosition",r),t.subscribe("ChangeRunnerPosition",r),e.subscribe("ChangeRunnerPositionByStep",s),t.subscribe("ChangeRunnerPositionByStep",s),n.subscribe("ChangeRunnerPosition",r),n.subscribe("ChangeRunnerPosition",r),n.subscribe("ChangeNearRunnerPosition",(({position:e})=>{this.emit("ChangeNearRunnerPosition",{position:e})})),i.subscribe("ChangeNearRunnerPosition",(({position:e})=>{this.emit("ChangeNearRunnerPosition",{position:e})})),o.subscribe("ClickScale",(({targetNumber:e})=>{this.emit("ClickScale",{targetNumber:e})})),this}updateSubViews(e){const t={from:e.format(e.from),to:e.format(e.to)};return this.subViews.tip.update(e,t),this.subViews.range.update(e),this.subViews.runnerFrom.update(e,this.props.target,t),this.subViews.runnerTo.update(e,this.props.target,t),this}}t.View=r},326:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={slider:"slider",sliderVertical:"slider_vertical"}},341:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const i=n(296);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return i.View}})},766:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleVertical=t.calculateTarget=t.createElements=t.initSubViews=void 0;const i=n(195),o=n(326);t.createElements=e=>{const t=document.createElement("div");return t.classList.add(o.CSSSelectors.slider),e.append(t),{root:e,slider:t}},t.initSubViews=e=>{const t=new i.Tip(e.slider),n=new i.Bar(e.slider),o=n.getBarNode();return{tip:t,range:new i.Range(o),scale:new i.Scale(e.slider),runnerFrom:new i.Runner(o,"from"),runnerTo:new i.Runner(o,"to"),bar:n}},t.calculateTarget=({from:e,min:t,max:n})=>{const{abs:i}=Math;return{target:i(t-e)/i(n-t)<.5?"to":"from"}},t.toggleVertical=({slider:e},t)=>{t?e.classList.add(o.CSSSelectors.sliderVertical):e.classList.remove(o.CSSSelectors.sliderVertical)}},497:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const i=n(995),o=n(868),r=n(749);n(182);class s extends i.EventEmitter{constructor(e){super(),this.handleRunnerPointerdown=this.handleRunnerPointerdown.bind(this);const{dom:t}=this.init(e);this.dom=t}getBarNode(){return this.dom.bar}render(){this.dom.root.append(this.dom.bar)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers(e){e.bar.addEventListener("pointerdown",this.handleRunnerPointerdown)}handleRunnerPointerdown(e){e.preventDefault();const t=o.helpers.getPosition(this.dom.bar,e);this.emit("ChangeNearRunnerPosition",{position:t})}}t.Bar=s},7:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={bar:"slider__bar"}},98:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const i=n(497);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return i.Bar}})},749:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElements=void 0;const i=n(868),o=n(7);t.createElements=e=>({root:e,bar:i.helpers.createElement(o.CSSSelectors.bar)})},979:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const i=n(594);n(588),t.Range=class{constructor(e){const{dom:t}=(0,i.init)(e);this.dom=t}render(){this.dom.root.append(this.dom.range)}update(e){(0,i.changeDimensions)(this.dom.range,e)}}},49:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={range:"slider__range"}},512:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const i=n(979);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return i.Range}})},594:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeDimensions=t.init=void 0;const i=n(868),o=n(49);t.init=e=>({dom:(e=>({root:e,range:i.helpers.createElement(o.CSSSelectors.range)}))(e)}),t.changeDimensions=(e,{min:t,max:n,isVertical:o,isRange:r,from:s,to:a})=>{const l=e,c=r?i.helpers.calculatePercent(s,t,n):0,d=i.helpers.calculatePercent(a,t,n);l.style.cssText=o?`top: ${c}%; bottom: ${100-d}%`:`left: ${c}%; right: ${100-d}%`}},966:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const i=n(995),o=n(868),r=n(827);n(188);class s extends i.EventEmitter{constructor(e,t){super(),this.handleRunnerPointerdown=this.handleRunnerPointerdown.bind(this),this.handleRunnerKeydown=this.handleRunnerKeydown.bind(this);const{dom:n,props:i}=this.init(e,t);this.dom=n,this.props=i}render({isRange:e,isVertical:t,min:n,max:i}){"from"!==this.props.type||e?((0,r.changeAria)(this.dom,t,n,i),this.dom.root.append(this.dom.runner)):(0,r.destroy)(this.dom)}update(e,t,n){(0,r.toggleTarget)(this.props,this.dom,t),(0,r.move)(this.dom,this.props,e,n)}init(e,t){const n=(0,r.createElements)(e),i=(0,r.initProps)(t);return this.attachEventHandlers(n),{dom:n,props:i}}attachEventHandlers(e){e.runner.addEventListener("pointerdown",this.handleRunnerPointerdown),e.runner.addEventListener("keydown",this.handleRunnerKeydown)}handleRunnerPointerdown(){const e=e=>{e.preventDefault(),this.dom.runner.ondragstart=()=>!1;const{type:t}=this.props,n=o.helpers.getPosition(this.dom.root,e);this.emit("ChangeRunnerPosition",{position:n,type:t})},t=()=>{document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",t)};document.addEventListener("pointermove",e),document.addEventListener("pointerup",t)}handleRunnerKeydown(e){const{code:t}=e,n=t=>{e.preventDefault();const{type:n}=this.props;this.emit("ChangeRunnerPositionByStep",{type:n,touchRoute:t})};"ArrowDown"!==t&&"ArrowRight"!==t||n("up"),"ArrowUp"!==t&&"ArrowLeft"!==t||n("down")}}t.Runner=s},86:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={runner:"slider__runner",targetedRunner:"slider__runner_targeted"}},546:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const i=n(966);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return i.Runner}})},827:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeAria=t.move=t.toggleTarget=t.destroy=t.initProps=t.createElements=void 0;const i=n(868),o=n(86);t.createElements=e=>{const t=i.helpers.createElement(o.CSSSelectors.runner);return t.tabIndex=0,t.role="slider",t.ariaLabel="slider runner",{root:e,runner:t}},t.initProps=e=>({type:e}),t.destroy=({runner:e})=>{e.remove()},t.toggleTarget=({type:e},{runner:t},n)=>{n!==e?t.classList.remove(o.CSSSelectors.targetedRunner):t.classList.add(o.CSSSelectors.targetedRunner)},t.move=({runner:e},{type:t},{min:n,max:o,from:r,to:s,isVertical:a},l)=>{const c=e,d="from"===t?r:s;c.ariaValueNow=String(d),c.ariaValueText=l[t];const u=i.helpers.calculatePercent(d,n,o),p=a?`top:${u}%;`:`left:${u}%;`;c.style.cssText=p},t.changeAria=({runner:e},t,n,i)=>{const o=e;o.ariaOrientation=t?"vertical":"horizontal",o.ariaValueMin=String(n),o.ariaValueMax=String(i)}},768:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const i=n(995),o=n(366);n(337);class r extends i.EventEmitter{constructor(e){super(),this.props={min:0,max:0,isVertical:!1},this.handleScalePointerdown=this.handleScalePointerdown.bind(this),this.handleWindowsResize=this.handleWindowsResize.bind(this);const{dom:t}=this.init(e);this.dom=t}render({min:e,max:t,isVertical:n,hasScale:i}){i?(this.props={min:e,max:t,isVertical:n},this.dom.root.append(this.dom.scale),(0,o.update)(this.dom,this.props)):(0,o.destroy)(this.dom)}init(e){const t=(0,o.createElement)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({scale:e}){return e.addEventListener("pointerdown",this.handleScalePointerdown),window.addEventListener("resize",this.handleWindowsResize),this}handleScalePointerdown({target:e}){if(!(e instanceof HTMLDivElement))return;if(!("customValue"in e))return;const t=Number(e.customValue);this.emit("ClickScale",{targetNumber:t})}handleWindowsResize(){(0,o.update)(this.dom,this.props)}}t.Scale=r},760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={scale:"slider__scale",mark:"slider__mark"}},561:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const i=n(768);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return i.Scale}})},366:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.destroy=t.getScalePercents=t.createElement=void 0;const i=n(868),o=n(760);t.createElement=e=>({root:e,scale:i.helpers.createElement(o.CSSSelectors.scale)});const r=e=>e>800?[0,10,20,30,40,50,60,70,80,90,100]:e>500?[0,20,40,60,80,100]:e>300?[0,33,66,100]:[0,100];t.getScalePercents=r,t.destroy=({scale:e})=>{e.remove()},t.update=(e,t)=>{(({scale:e})=>{e.innerHTML=""})(e),(({scale:e},{isVertical:t},n)=>{const i=e;let r=0;n.forEach(((n,s)=>{const{percent:a,value:l}=n,c=t?`top: ${a}%`:`left: ${a}%`,d=document.createElement("div");if(d.classList.add(o.CSSSelectors.mark),d.style.cssText=c,d.innerText=String(l),d.customValue=Number(l),e.append(d),t){const{width:e}=d.getBoundingClientRect();e>r&&(r=e,i.style.cssText=`width: ${r}px`)}else if(0===s){const{height:e}=d.getBoundingClientRect();i.style.cssText=`height: ${e}px`}}))})(e,t,(({max:e,min:t,isVertical:n},{scale:i})=>{const{offsetHeight:o,offsetWidth:s}=i,a=r(n?o:s),l=Math.abs(e-t);return a.map((e=>({percent:e,value:Number((t+l*e/100).toFixed(1).replace(/\.?0+$/,""))})))})(t,e))}},321:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const i=n(995),o=n(868),r=n(626);n(317);class s extends i.EventEmitter{constructor(e){super(),this.handleFromTipPointerdown=this.makeHandlePointerdownTip("from").bind(this),this.handleBothTipPointerdown=this.makeHandlePointerdownTip("both").bind(this),this.handleToTipPointerdown=this.makeHandlePointerdownTip("to").bind(this);const{dom:t}=this.init(e);this.dom=t}render({hasTip:e,isRange:t}){e?(this.dom.root.insertAdjacentElement("afterbegin",this.dom.tipLine),t?(this.dom.tipLine.append(this.dom.tipFrom),this.dom.tipLine.append(this.dom.tipBoth)):(this.dom.tipFrom.remove(),this.dom.tipBoth.remove()),this.dom.tipLine.append(this.dom.tipTo)):(0,r.destroy)(this.dom)}update(e,t){const{dom:n}=this;(0,r.changeText)(e,n,t),(0,r.changePosition)(e,n),(0,r.toggleDisplay)(e,n)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({tipFrom:e,tipTo:t,tipBoth:n}){return e.addEventListener("pointerdown",this.handleFromTipPointerdown),n.addEventListener("pointerdown",this.handleBothTipPointerdown),t.addEventListener("pointerdown",this.handleToTipPointerdown),this}makeHandlePointerdownTip(e){return({target:t})=>{if(null===t)return;const n=t=>{t.preventDefault();const n=t.target;if(!(n instanceof HTMLElement))return;n.ondragstart=()=>!1;const i=o.helpers.getPosition(this.dom.root,t);"both"!==e?"from"!==e&&"to"!==e||this.emit("ChangeRunnerPosition",{position:i,type:e}):this.emit("ChangeNearRunnerPosition",{position:i})},i=()=>{document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",i)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",i)}}}t.Tip=s},880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={tip:"slider__tip",hiddenTip:"slider__tip_hidden",tipLine:"slider__tip-line"}},875:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const i=n(321);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return i.Tip}})},626:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeText=t.destroy=t.changePosition=t.toggleDisplay=t.createElements=void 0;const i=n(868),o=n(880);t.createElements=e=>({root:e,tipLine:i.helpers.createElement(o.CSSSelectors.tipLine),tipFrom:i.helpers.createElement(o.CSSSelectors.tip),tipBoth:i.helpers.createElement(o.CSSSelectors.tip),tipTo:i.helpers.createElement(o.CSSSelectors.tip)}),t.toggleDisplay=({isRange:e,isVertical:t},{tipFrom:n,tipTo:i,tipBoth:r})=>{if(!e)return void i.classList.remove(o.CSSSelectors.hiddenTip);const{x:s,y:a,height:l,width:c}=n.getBoundingClientRect(),d=i.getBoundingClientRect();if(t?a+l>=d.y:s+c>=d.x)return n.classList.add(o.CSSSelectors.hiddenTip),r.classList.remove(o.CSSSelectors.hiddenTip),void i.classList.add(o.CSSSelectors.hiddenTip);n.classList.remove(o.CSSSelectors.hiddenTip),r.classList.add(o.CSSSelectors.hiddenTip),i.classList.remove(o.CSSSelectors.hiddenTip)},t.changePosition=({min:e,max:t,isVertical:n,from:o,to:r,isRange:s},{tipBoth:a,tipFrom:l,tipTo:c})=>{const d=c,u=i.helpers.calculatePercent(r,e,t),p=n?`top: ${u}%;`:`left: ${u}%;`;if(d.style.cssText=p,!s)return;const h=l,m=a,g=i.helpers.calculatePercent(o,e,t),b=n?`top: ${g}%;`:`left: ${g}%;`,v=n?`top: ${(g+u)/2}%;`:`left: ${(g+u)/2}%;`;h.style.cssText=b,m.style.cssText=v},t.destroy=({tipLine:e})=>{e.remove()},t.changeText=({from:e,to:t,isRange:n},{tipFrom:i,tipTo:o,tipBoth:r},s)=>{if(o.innerText=s.to,!n)return;const a=i,l=r,c=e===t?s.to:`${s.from} - ${s.to}`;a.innerText=s.from,l.innerText=c}},195:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=t.Tip=t.Scale=t.Runner=t.Range=void 0;const i=n(512);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return i.Range}});const o=n(546);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return o.Runner}});const r=n(561);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return r.Scale}});const s=n(875);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return s.Tip}});const a=n(98);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return a.Bar}})},620:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=t.View=t.Model=void 0;const i=n(20);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return i.Model}});const o=n(341);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return o.View}});const r=n(867);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return r.Presenter}})},89:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultOptions=void 0;const n={isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:0,max:100,from:40,to:70,format:e=>String(e)};t.defaultOptions=n},995:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this.events={}}subscribe(e,t){const n=this.events[e];this.events[e]=void 0===n?[t]:[...n,t]}unsubscribe(e,t){var n;this.events[e]=null===(n=this.events[e])||void 0===n?void 0:n.filter((e=>t!==e))}emit(e,t){var n;null===(n=this.events[e])||void 0===n||n.forEach((e=>e(t)))}}},12:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calculatePercent=void 0,t.calculatePercent=(e,t,n)=>(e-t)/(n-t)*100},109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=void 0,t.createElement=e=>{const t=document.createElement("div");return t.classList.add(e),t}},212:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getPosition=void 0,t.getPosition=(e,t)=>{const{height:n,width:i,left:o,top:r}=e.getBoundingClientRect(),{clientX:s,clientY:a}=t;return{x:(s-o)/i,y:(a-r)/n}}},868:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=void 0;const i=n(109),o=n(212),r=n(12),s={createElement:i.createElement,getPosition:o.getPosition,calculatePercent:r.calculatePercent};t.helpers=s}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=n(833);$.fn.slider=function(t){return this.map(((n,i)=>new e.App(i,t)))}})()})();