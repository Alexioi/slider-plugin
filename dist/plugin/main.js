(()=>{"use strict";var e={935:(e,t,n)=>{n.r(t)},182:(e,t,n)=>{n.r(t)},588:(e,t,n)=>{n.r(t)},188:(e,t,n)=>{n.r(t)},337:(e,t,n)=>{n.r(t)},317:(e,t,n)=>{n.r(t)},927:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const s=n(620),i=n(89);t.App=class{constructor(e,t){this.callbacks={onChange:()=>{}},this.presenter=this.init(e,t)}update(e){this.updateCallbacks(e),this.presenter.updateOptions(e)}getOptions(){return this.presenter.getOptions()}init(e,t){const n=Object.assign({},i.defaultConfig),r=new s.Model(n,t),o=new s.View(e),a=new s.Presenter(o,r);return this.attachEventEmitters(a),this.updateCallbacks(t),a}attachEventEmitters(e){e.subscribe("onChange",(e=>{this.callbacks.onChange(e)}))}updateCallbacks(e){void 0!==e&&void 0!==e.onChange&&(this.callbacks={onChange:e.onChange})}}},833:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const s=n(927);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return s.App}})},747:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const s=n(995),i=n(538),r=n(143);class o extends s.EventEmitter{constructor(e,t){super(),this.options=(0,i.validate)(e,t)}updateOptions(e){this.options=(0,i.validate)(this.options,e),this.emit("UpdateModelOptions",this.options)}getOptions(){return this.options}calculateValueUsingFraction({position:e,type:t},n){this.options=(0,r.calculateValue)(e,this.options,n,t),this.emit("UpdateModelValues",this.options)}calculateNearValueUsingFraction(e,t){this.options=(0,r.calculateValue)(e,this.options,t),this.emit("UpdateModelValues",this.options)}updateNearValue(e){this.options=(0,r.updateNearValue)(e,this.options),this.emit("UpdateModelValues",this.options)}updateValueByStep({type:e,touchRoute:t}){this.options=(0,r.updateOptionsByStep)(t,this.options,e),this.emit("UpdateModelValues",this.options)}}t.Model=o},20:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const s=n(747);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return s.Model}})},143:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateNearValue=t.calculateValue=t.updateOptionsByStep=void 0;const n=(e,t)=>{const[,n]=String(t).split(".");return void 0===n?e:Number(e.toFixed(n.length))},s=({from:e,to:t,min:n,max:s,isRange:i},r)=>["from"!==r&&i?e:n,"from"===r?t:s],i=(e,{step:t,from:i,to:r,min:o,max:a,isRange:c},d,l)=>{const[u,p]=s({from:i,to:r,min:o,max:a,isRange:c},d),h="from"===d?i:r,m=Math.abs(e-h),v=m%t;return e<u?n(u,t):e>p?n(p,t):l?((e,t,s,i,r,o,a)=>n(e<t/2?s:r<t/2?i>s?i-r:i+r:i+r-t<o?o:i-r+t>a?a:i>s?i-r+t:i+r-t,t))(m,t,h,e,v,u,p):n(e>h?e-v:e+v,t)},r=(e,{isRange:t,from:n,to:s})=>{if(!t)return"to";const i=Math.abs(n-e),r=Math.abs(s-e);return i===r?n>e?"from":"to":i<r?"from":"to"};t.updateOptionsByStep=(e,t,n)=>{const i="up"===e?t[n]+t.step:t[n]-t.step,[r,o]=s(t,n);return i<r?Object.assign(Object.assign({},t),{[n]:r}):i>o?Object.assign(Object.assign({},t),{[n]:o}):Object.assign(Object.assign({},t),{[n]:i})},t.calculateValue=(e,t,n,s)=>{const o=(({x:e,y:t},{min:n,max:s,isVertical:i})=>(s-n)*(i?t:e)+n)(e,t);if(void 0!==s)return Object.assign(Object.assign({},t),{[s]:i(o,t,s,n)});const a=r(o,t);return Object.assign(Object.assign({},t),{[a]:i(o,t,a,n)})},t.updateNearValue=(e,t)=>{const n=r(e,t);return Object.assign(Object.assign({},t),{[n]:e})}},538:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;const n=(e,t)=>-1!==String(t).search(/^(-|\+)?([0-9]+)?(\.|,)?([0-9]+)$/)?Number(t):e;t.validate=(e,t)=>{const s="boolean"==typeof(null==t?void 0:t.isRange)?t.isRange:e.isRange,i="boolean"==typeof(null==t?void 0:t.isVertical)?t.isVertical:e.isVertical,r="boolean"==typeof(null==t?void 0:t.hasTip)?t.hasTip:e.hasTip,o="boolean"==typeof(null==t?void 0:t.hasScale)?t.hasScale:e.hasScale,{min:a,max:c}=((e,t)=>{const s=n(e.min,null==t?void 0:t.min),i=n(e.max,null==t?void 0:t.max);if(s===i)return{min:s,max:i+1};const[r,o]=[s,i].sort(((e,t)=>e-t));return{min:r,max:o}})(e,t),{from:d,to:l}=((e,t,s,i)=>{const r=n(e.from,null==i?void 0:i.from),o=n(e.to,null==i?void 0:i.to),[a,c]=[r,o].sort(((e,t)=>e-t)),d=((e,t,n)=>n>t?t:n<e?e:n)(t,s,c);return{from:((e,t,n)=>n<e?e:n>t?t:n)(t,d,a),to:d}})(e,a,c,t);return{from:d,to:l,min:a,max:c,step:((e,t,s,i)=>{const r=n(e.step,null==i?void 0:i.step);if(r<=0)return 1;const o=s-t;return r<o?r:o})(e,a,c,t),isRange:s,isVertical:i,hasScale:o,hasTip:r}}},750:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const s=n(995);class i extends s.EventEmitter{constructor(e,t){super(),this.view=e,this.model=t,this.attachEventEmittersToModel().attachEventEmittersToView()}updateOptions(e){this.model.updateOptions(e)}getOptions(){return this.model.getOptions()}attachEventEmittersToModel(){const e=({position:e,type:t})=>{this.model.calculateValueUsingFraction({position:e,type:t},!1)},t=({type:e,touchRoute:t})=>{this.model.updateValueByStep({type:e,touchRoute:t})},n=({position:e})=>{this.model.calculateNearValueUsingFraction(e,!1)};return this.view.subscribeSubCViewToEvents("scale","ClickScale",(({targetNumber:e})=>{this.model.updateNearValue(e)})),this.view.subscribeSubCViewToEvents("runnerFrom","ChangeRunnerPosition",e),this.view.subscribeSubCViewToEvents("runnerTo","ChangeRunnerPosition",e),this.view.subscribeSubCViewToEvents("runnerFrom","ChangeRunnerPositionByStep",t),this.view.subscribeSubCViewToEvents("runnerTo","ChangeRunnerPositionByStep",t),this.view.subscribeSubCViewToEvents("runnerFrom","ChangeNearRunnerPosition",n),this.view.subscribeSubCViewToEvents("runnerTo","ChangeNearRunnerPosition",n),this.view.subscribeSubCViewToEvents("tip","ChangeNearRunnerPosition",n),this.view.subscribeSubCViewToEvents("tip","ChangeRunnerPosition",e),this.view.subscribeSubCViewToEvents("bar","ChangeNearRunnerPosition",(({position:e})=>{this.model.calculateNearValueUsingFraction(e,!0)})),this}attachEventEmittersToView(){return this.model.subscribe("UpdateModelOptions",(e=>{this.view.render(e),this.emit("onChange",e)})),this.model.subscribe("UpdateModelValues",(e=>{this.view.update(e),this.emit("onChange",e)})),this}}t.Presenter=i},867:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const s=n(750);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return s.Presenter}})},296:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const s=n(995),i=n(766);class r extends s.EventEmitter{constructor(e){super(),this.props={target:"from"};const{dom:t,subViews:n}=this.init(e);this.dom=t,this.subViews=n}render(e){const{isVertical:t,isRange:n}=e;this.props=(0,i.calculateTarget)(e),(0,i.toggleVertical)(this.dom,t),this.subViews.bar.render(),this.subViews.tip.render(e),this.subViews.runnerFrom.render(n),this.subViews.runnerTo.render(n),this.subViews.range.render(),this.subViews.scale.render(e),this.updateSubViews(e)}update(e){this.updateSubViews(e)}subscribeSubCViewToEvents(e,t,n){this.subViews[e].subscribe(t,n)}init(e){const t=(0,i.createElements)(e),n=(0,i.initSubViews)(t);return this.subscribeToRunnerAndTip(n),{dom:t,subViews:n}}subscribeToRunnerAndTip({runnerFrom:e,runnerTo:t,tip:n}){const s=({type:e})=>{this.props={target:e}};return e.subscribe("ChangeRunnerPosition",s),t.subscribe("ChangeRunnerPosition",s),n.subscribe("ChangeRunnerPosition",s),this}updateSubViews(e){return this.subViews.tip.update(e),this.subViews.range.update(e),this.subViews.runnerFrom.update(e,this.props.target),this.subViews.runnerTo.update(e,this.props.target),this}}t.View=r},341:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const s=n(296);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return s.View}}),n(935)},766:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleVertical=t.calculateTarget=t.createElements=t.initSubViews=void 0;const s=n(195);t.createElements=e=>{const t=document.createElement("div");return t.classList.add("slider"),e.append(t),{root:e,slider:t}},t.initSubViews=e=>{const t=new s.Tip(e.slider),n=new s.Bar(e.slider),i=n.getBarNode();return{tip:t,range:new s.Range(i),scale:new s.Scale(e.slider),runnerFrom:new s.Runner(i,"from"),runnerTo:new s.Runner(i,"to"),bar:n}},t.calculateTarget=({from:e,min:t,max:n})=>{const{abs:s}=Math;return{target:s(t-e)/s(n-t)<.5?"to":"from"}},t.toggleVertical=({slider:e},t)=>{t?e.classList.add("slider_vertical"):e.classList.remove("slider_vertical")}},497:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const s=n(995),i=n(868),r=n(749);class o extends s.EventEmitter{constructor(e){super(),this.handlePointerdownRunner=this.handlePointerdownRunner.bind(this);const{dom:t}=this.init(e);this.dom=t}getBarNode(){return this.dom.bar}render(){this.dom.root.append(this.dom.bar)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers(e){e.bar.addEventListener("pointerdown",this.handlePointerdownRunner)}handlePointerdownRunner(e){e.preventDefault();const t=i.helpers.getPosition(this.dom.bar,e);this.emit("ChangeNearRunnerPosition",{position:t})}}t.Bar=o},7:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={bar:"slider__bar"}},98:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const s=n(497);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return s.Bar}}),n(182)},749:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElements=void 0;const s=n(868),i=n(7);t.createElements=e=>({root:e,bar:s.helpers.createElement(i.cssSelectors.bar)})},979:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const s=n(594);t.Range=class{constructor(e){const{dom:t}=(0,s.init)(e);this.dom=t}render(){this.dom.root.append(this.dom.range)}update(e){(0,s.changeDimensions)(this.dom.range,e)}}},49:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={range:"slider__range"}},512:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const s=n(979);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return s.Range}}),n(588)},594:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeDimensions=t.init=void 0;const s=n(868),i=n(49);t.init=e=>({dom:(e=>({root:e,range:s.helpers.createElement(i.cssSelectors.range)}))(e)}),t.changeDimensions=(e,{min:t,max:n,isVertical:i,isRange:r,from:o,to:a})=>{const c=e,d=r?s.helpers.calculatePercent(o,t,n):0,l=s.helpers.calculatePercent(a,t,n);c.style.cssText=i?`top: ${d}%; bottom: ${100-l}%`:`left: ${d}%; right: ${100-l}%`}},966:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const s=n(995),i=n(868),r=n(827);class o extends s.EventEmitter{constructor(e,t){super(),this.handlePointerdownRunner=this.handlePointerdownRunner.bind(this),this.handleKeydownRunner=this.handleKeydownRunner.bind(this);const{dom:n,props:s}=this.init(e,t);this.dom=n,this.props=s}render(e){"from"!==this.props.type||e?this.dom.root.append(this.dom.runner):(0,r.destroy)(this.dom)}update(e,t){(0,r.toggleTarget)(this.props,this.dom,t),(0,r.move)(this.dom,this.props,e)}init(e,t){const n=(0,r.createElements)(e),s=(0,r.initProps)(t);return this.attachEventHandlers(n),{dom:n,props:s}}attachEventHandlers(e){e.runner.addEventListener("pointerdown",this.handlePointerdownRunner),e.runner.addEventListener("keydown",this.handleKeydownRunner)}handleKeydownRunner(e){const{code:t}=e,n=t=>{e.preventDefault();const{type:n}=this.props;this.emit("ChangeRunnerPositionByStep",{type:n,touchRoute:t})};"ArrowDown"!==t&&"ArrowRight"!==t||n("up"),"ArrowUp"!==t&&"ArrowLeft"!==t||n("down")}handlePointerdownRunner(){const e=e=>{e.preventDefault(),this.dom.runner.ondragstart=()=>!1;const{type:t}=this.props,n=i.helpers.getPosition(this.dom.root,e);this.emit("ChangeRunnerPosition",{position:n,type:t})},t=()=>{document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",t)};document.addEventListener("pointermove",e),document.addEventListener("pointerup",t)}}t.Runner=o},86:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={runner:"slider__runner",targetedRunner:"slider__runner_targeted"}},546:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const s=n(966);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return s.Runner}}),n(188)},827:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.move=t.toggleTarget=t.destroy=t.initProps=t.createElements=void 0;const s=n(868),i=n(86);t.createElements=e=>{const t=s.helpers.createElement(i.cssSelectors.runner);return t.tabIndex=0,{root:e,runner:t}},t.initProps=e=>({type:e}),t.destroy=({runner:e})=>{e.remove()},t.toggleTarget=({type:e},{runner:t},n)=>{n!==e?t.classList.remove(i.cssSelectors.targetedRunner):t.classList.add(i.cssSelectors.targetedRunner)},t.move=({runner:e},{type:t},{min:n,max:i,from:r,to:o,isVertical:a})=>{const c=e,d="from"===t?r:o,l=s.helpers.calculatePercent(d,n,i),u=a?`top:${l}%;`:`left:${l}%;`;c.style.cssText=u}},768:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const s=n(995),i=n(366);class r extends s.EventEmitter{constructor(e){super(),this.props={min:0,max:0,isVertical:!1},this.handlePointerdownScale=this.handlePointerdownScale.bind(this),this.handleWindowsResize=this.handleWindowsResize.bind(this);const{dom:t}=this.init(e);this.dom=t}render({min:e,max:t,isVertical:n,hasScale:s}){s?(this.props={min:e,max:t,isVertical:n},this.dom.root.append(this.dom.scale),(0,i.update)(this.dom,this.props)):(0,i.destroy)(this.dom)}init(e){const t=(0,i.createElement)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({scale:e}){return e.addEventListener("pointerdown",this.handlePointerdownScale),window.addEventListener("resize",this.handleWindowsResize),this}handlePointerdownScale(e){if(!(e.target instanceof HTMLSpanElement))return;if(!("customValue"in e.target))return;const t=Number(e.target.customValue);this.emit("ClickScale",{targetNumber:t})}handleWindowsResize(){(0,i.update)(this.dom,this.props)}}t.Scale=r},760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={scale:"slider__scale",mark:"slider__mark"}},561:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const s=n(768);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return s.Scale}}),n(337)},366:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.destroy=t.getScalePercents=t.createElement=void 0;const s=n(868),i=n(760);t.createElement=e=>({root:e,scale:s.helpers.createElement(i.cssSelectors.scale)});const r=e=>e>800?[0,10,20,30,40,50,60,70,80,90,100]:e>500?[0,20,40,60,80,100]:e>300?[0,33,66,100]:[0,100];t.getScalePercents=r,t.destroy=({scale:e})=>{e.remove()},t.update=(e,t)=>{(({scale:e})=>{for(;null!==e.firstChild;)e.firstChild.remove()})(e),(({scale:e},{isVertical:t},n)=>{n.forEach((n=>{const{percent:s,value:r}=n,o=t?`top: ${s}%`:`left: ${s}%`,a=document.createElement("span");a.classList.add(i.cssSelectors.mark),a.style.cssText=o,a.innerText=String(r),a.customValue=Number(r),e.append(a)}))})(e,t,(({max:e,min:t,isVertical:n},{scale:s})=>{const{offsetHeight:i,offsetWidth:o}=s,a=r(n?i:o),c=Math.abs(e-t);return a.map((e=>({percent:e,value:Number((t+c*e/100).toFixed(1).replace(/\.?0+$/,""))})))})(t,e))}},321:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const s=n(995),i=n(868),r=n(626);class o extends s.EventEmitter{constructor(e){super(),this.handlePointerdownTip=this.handlePointerdownTip.bind(this);const{dom:t}=this.init(e);this.dom=t}render({hasTip:e,isRange:t}){e?(this.dom.root.insertAdjacentElement("afterbegin",this.dom.tipLine),t?(this.dom.tipLine.append(this.dom.tipFrom),this.dom.tipLine.append(this.dom.tipBoth)):(this.dom.tipFrom.remove(),this.dom.tipBoth.remove()),this.dom.tipLine.append(this.dom.tipTo)):(0,r.destroy)(this.dom)}update(e){const{dom:t}=this;(0,r.changeText)(e,t),(0,r.changePosition)(e,t),(0,r.toggleDisplay)(e,t)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({tipFrom:e,tipTo:t,tipBoth:n}){return e.addEventListener("pointerdown",this.handlePointerdownTip),t.addEventListener("pointerdown",this.handlePointerdownTip),n.addEventListener("pointerdown",this.handlePointerdownTip),this}handlePointerdownTip({target:e}){if(null===e)return;if(!("customType"in e))return;const{customType:t}=e,n=e=>{e.preventDefault();const n=e.target;if(!(n instanceof HTMLElement))return;n.ondragstart=()=>!1;const s=i.helpers.getPosition(this.dom.root,e);"both"!==t?"from"!==t&&"to"!==t||this.emit("ChangeRunnerPosition",{position:s,type:t}):this.emit("ChangeNearRunnerPosition",{position:s})},s=()=>{document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",s)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",s)}}t.Tip=o},880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={tip:"slider__tip",hiddenTip:"slider__tip_hidden",tipLine:"slider__tip-line"}},875:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const s=n(321);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return s.Tip}}),n(317)},626:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeText=t.destroy=t.changePosition=t.toggleDisplay=t.createElements=void 0;const s=n(868),i=n(880);t.createElements=e=>{const t=s.helpers.createElement(i.cssSelectors.tipLine),n=s.helpers.createElement(i.cssSelectors.tip),r=s.helpers.createElement(i.cssSelectors.tip),o=s.helpers.createElement(i.cssSelectors.tip);return n.customType="from",r.customType="both",o.customType="to",{root:e,tipLine:t,tipFrom:n,tipBoth:r,tipTo:o}},t.toggleDisplay=({isRange:e,isVertical:t},{tipFrom:n,tipTo:s,tipBoth:r})=>{if(!e)return void s.classList.remove(i.cssSelectors.hiddenTip);const{x:o,y:a,height:c,width:d}=n.getBoundingClientRect(),l=s.getBoundingClientRect();if(t?a+c>=l.y:o+d>=l.x)return n.classList.add(i.cssSelectors.hiddenTip),r.classList.remove(i.cssSelectors.hiddenTip),void s.classList.add(i.cssSelectors.hiddenTip);n.classList.remove(i.cssSelectors.hiddenTip),r.classList.add(i.cssSelectors.hiddenTip),s.classList.remove(i.cssSelectors.hiddenTip)},t.changePosition=({min:e,max:t,isVertical:n,from:i,to:r,isRange:o},{tipBoth:a,tipFrom:c,tipTo:d})=>{const l=d,u=s.helpers.calculatePercent(r,e,t),p=n?`top: ${u}%;`:`left: ${u}%;`;if(l.style.cssText=p,!o)return;const h=c,m=a,v=s.helpers.calculatePercent(i,e,t),b=n?`top: ${v}%;`:`left: ${v}%;`,g=n?`top: ${(v+u)/2}%;`:`left: ${(v+u)/2}%;`;h.style.cssText=b,m.style.cssText=g},t.destroy=({tipLine:e})=>{e.remove()},t.changeText=({from:e,to:t,isRange:n},{tipFrom:s,tipTo:i,tipBoth:r})=>{if(i.innerText=String(t),!n)return;const o=s,a=r,c=e===t?String(t):`${e} - ${t}`;o.innerText=String(e),a.innerText=c}},195:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=t.Tip=t.Scale=t.Runner=t.Range=void 0;const s=n(512);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return s.Range}});const i=n(546);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return i.Runner}});const r=n(561);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return r.Scale}});const o=n(875);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return o.Tip}});const a=n(98);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return a.Bar}})},620:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=t.View=t.Model=void 0;const s=n(20);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return s.Model}});const i=n(341);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return i.View}});const r=n(867);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return r.Presenter}})},89:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultConfig=void 0,t.defaultConfig={isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:0,max:100,from:40,to:70}},995:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this.events={}}subscribe(e,t){const n=this.events[e];this.events[e]=void 0===n?[t]:[...n,t]}unsubscribe(e,t){var n;this.events[e]=null===(n=this.events[e])||void 0===n?void 0:n.filter((e=>t!==e))}emit(e,t){var n;null===(n=this.events[e])||void 0===n||n.forEach((e=>e(t)))}}},12:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calculatePercent=void 0,t.calculatePercent=(e,t,n)=>(e-t)/(n-t)*100},109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=void 0,t.createElement=e=>{const t=document.createElement("div");return t.classList.add(e),t}},212:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getPosition=void 0,t.getPosition=(e,t)=>{const{height:n,width:s,left:i,top:r}=e.getBoundingClientRect(),{clientX:o,clientY:a}=t;return{x:(o-i)/s,y:(a-r)/n}}},868:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=void 0;const s=n(109),i=n(212),r=n(12),o={createElement:s.createElement,getPosition:i.getPosition,calculatePercent:r.calculatePercent};t.helpers=o}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,n),r.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const e=n(833);$.fn.slider=function(t){return this.map(((n,s)=>new e.App(s,t)))}})()})();