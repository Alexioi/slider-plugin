(()=>{"use strict";var e={2904:(e,t,n)=>{n.r(t)},6588:(e,t,n)=>{n.r(t)},935:(e,t,n)=>{n.r(t)},3182:(e,t,n)=>{n.r(t)},8588:(e,t,n)=>{n.r(t)},3188:(e,t,n)=>{n.r(t)},4337:(e,t,n)=>{n.r(t)},5317:(e,t,n)=>{n.r(t)},4512:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={example:".js-panel__example",control:".js-panel__control"}},3509:function(e,t,n){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(6043);const i=n(1996),r=s(n(2095)),o=n(4512);n(2904);const a=$(o.cssSelectors.example).slider();document.querySelectorAll(o.cssSelectors.control).forEach(((e,t)=>{new i.Panel(e,a[t],r.default[t])}))},1996:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Panel=void 0;const s=n(3722);n(6588),t.Panel=class{constructor(e,t,n){this.handleChangeInputElement=({target:e})=>{if(!(e instanceof HTMLInputElement))return;if(!("customName"in e))return;const{customName:t}=e;if("string"!=typeof t)return;const n=Number(e.value);"step"===t&&0===n?this.slider.update({step:"none"}):this.slider.update({[t]:n}),(0,s.syncInputs)(this.slider,this.dom)},this.slider=t,this.handleClickCheckboxElement=this.handleClickCheckboxElement.bind(this),this.handleChangeInputElement=this.handleChangeInputElement.bind(this),this.handleChangeFormat=this.handleChangeFormat.bind(this);const{dom:i}=this.init(e,n);this.dom=i}init(e,t){this.slider.update(t);const n=(0,s.searchElements)(e);return(0,s.addOptionsToFormat)(n),this.attachEventHandlers(n),(0,s.syncInputs)(this.slider,n),(0,s.attachCallback)(n,this.slider),{dom:n}}attachEventHandlers(e){const{range:t,vertical:n,scale:s,min:i,max:r,from:o,to:a,step:c,tip:l,format:d}=e;return t.addEventListener("click",this.handleClickCheckboxElement),n.addEventListener("click",this.handleClickCheckboxElement),l.addEventListener("click",this.handleClickCheckboxElement),s.addEventListener("click",this.handleClickCheckboxElement),i.addEventListener("change",this.handleChangeInputElement),r.addEventListener("change",this.handleChangeInputElement),o.addEventListener("change",this.handleChangeInputElement),a.addEventListener("change",this.handleChangeInputElement),c.addEventListener("change",this.handleChangeInputElement),d.addEventListener("change",this.handleChangeFormat),this}handleClickCheckboxElement({target:e}){if(!(e instanceof HTMLInputElement))return;const t=e.checked;if(!("customName"in e))return;const n=e.customName;"string"==typeof n&&(this.slider.update({[n]:t}),(0,s.syncInputs)(this.slider,this.dom))}handleChangeFormat({target:e}){if(!(e instanceof HTMLSelectElement))return;const t=e.options[e.selectedIndex];if(!("customName"in t))return;const{customName:n}=t;"before"!==n?"after"!==n?"x2"!==n?"toFixed0"!==n?"toFixed2"!==n?"toFixed4"!==n?this.slider.update({format:e=>String(e)}):this.slider.update({format:e=>String(Number(e.toFixed(4)))}):this.slider.update({format:e=>String(Number(e.toFixed(2)))}):this.slider.update({format:e=>e.toFixed(0)}):this.slider.update({format:e=>String(2*e)}):this.slider.update({format:e=>`${e} $`}):this.slider.update({format:e=>`$ ${e}`})}}},3675:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={range:".js-panel__input_name-range",vertical:".js-panel__input_name-vertical",scale:".js-panel__input_name-scale",min:".js-panel__input_name-min",max:".js-panel__input_name-max",from:".js-panel__input_name-from",to:".js-panel__input_name-to",step:".js-panel__input_name-step",tip:".js-panel__input_name-tip",indicator:".js-panel__indicator",decoratedIndicator:"panel__indicator_decorated",format:".js-panel__select_name-format"}},3722:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addOptionsToFormat=t.attachCallback=t.syncInputs=t.searchElements=void 0;const s=n(3675);t.searchElements=e=>{const t=e.querySelector(".panel__input_name-range");if(!(t instanceof HTMLInputElement))throw Error();t.customName="isRange";const n=e.querySelector(s.cssSelectors.vertical);if(!(n instanceof HTMLInputElement))throw Error();n.customName="isVertical";const i=e.querySelector(s.cssSelectors.scale);if(!(i instanceof HTMLInputElement))throw Error();i.customName="hasScale";const r=e.querySelector(s.cssSelectors.min);if(!(r instanceof HTMLInputElement))throw Error();r.customName="min";const o=e.querySelector(s.cssSelectors.max);if(!(o instanceof HTMLInputElement))throw Error();o.customName="max";const a=e.querySelector(s.cssSelectors.from);if(!(a instanceof HTMLInputElement))throw Error();a.customName="from";const c=e.querySelector(s.cssSelectors.to);if(!(c instanceof HTMLInputElement))throw Error();c.customName="to";const l=e.querySelector(s.cssSelectors.step);if(!(l instanceof HTMLInputElement))throw Error();l.customName="step";const d=e.querySelector(s.cssSelectors.tip);if(!(d instanceof HTMLInputElement))throw Error();d.customName="hasTip";const u=e.querySelector(s.cssSelectors.indicator);if(null===u)throw Error();const p=e.querySelector(s.cssSelectors.format);if(!(p instanceof HTMLSelectElement))throw Error();return p.customName="format",{root:e,range:t,vertical:n,scale:i,min:r,max:o,from:a,to:c,step:l,tip:d,indicator:u,format:p}},t.syncInputs=(e,t)=>{const n=t,s=e.getOptions();if(void 0===s)return;const{isRange:i,isVertical:r,from:o,to:a,min:c,max:l,hasScale:d,hasTip:u,step:p}=s;n.range.checked=i,n.vertical.checked=r,n.min.value=String(c),n.max.value=String(l),n.from.value=String(Number(o.toFixed(3))),n.to.value=String(Number(a.toFixed(3))),n.step.value="none"===p?"0":String(p),n.tip.checked=u,n.scale.checked=d},t.attachCallback=(e,t)=>{const n=e,i=()=>{n.indicator.classList.remove(s.cssSelectors.decoratedIndicator)};let r=setTimeout((()=>{}),0);t.update({onChange:({from:e,to:t})=>{clearTimeout(r),n.from.value=String(Number(e.toFixed(3))),n.to.value=String(Number(t.toFixed(3))),n.indicator.classList.add(s.cssSelectors.decoratedIndicator),r=setTimeout(i,300)}})},t.addOptionsToFormat=({format:e})=>{const t=e;[{name:"none"},{name:"before"},{name:"after"},{name:"x2"},{name:"toFixed0"},{name:"toFixed2"},{name:"toFixed4"}].forEach((n=>{const s=new Option(n.name);s.customName=n.name,t.options[e.options.length]=s}))}},1927:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const s=n(2620),i=n(3089);t.App=class{constructor(e,t){this.callbacks={onChange:()=>{}},this.presenter=this.init(e,t)}update(e){this.updateCallbacks(e),this.presenter.updateOptions(e)}getOptions(){return this.presenter.getOptions()}init(e,t){const n=Object.assign({},i.defaultConfig),r=new s.Model(n,t),o=new s.View(e,t),a=new s.Presenter(o,r);return this.attachEventEmitters(a),this.updateCallbacks(t),a}attachEventEmitters(e){e.subscribe("onChange",(e=>{this.callbacks.onChange(e)}))}updateCallbacks(e){void 0!==e&&void 0!==e.onChange&&(this.callbacks={onChange:e.onChange})}}},833:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const s=n(1927);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return s.App}})},9747:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const s=n(5995),i=n(7538),r=n(5143);class o extends s.EventEmitter{constructor(e,t){super(),this.options=(0,i.validate)(e,t)}updateOptions(e){this.options=(0,i.validate)(this.options,e),this.emit("UpdateModelOptions",this.options)}getOptions(){return this.options}calculateValueUsingFraction({position:e,type:t},n){this.options=(0,r.calculateValue)(e,this.options,n,t),this.emit("UpdateModelValues",this.options)}calculateNearValueUsingFraction(e,t){this.options=(0,r.calculateValue)(e,this.options,t),this.emit("UpdateModelValues",this.options)}updateNearValue(e){this.options=(0,r.updateNearValue)(e,this.options),this.emit("UpdateModelValues",this.options)}updateValueByStep({type:e,touchRoute:t}){this.options=(0,r.updateOptionsByStep)(t,this.options,e),this.emit("UpdateModelValues",this.options)}}t.Model=o},5020:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const s=n(9747);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return s.Model}})},5143:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateNearValue=t.calculateValue=t.updateOptionsByStep=void 0;const n=(e,t)=>{const[,n]=String(t).split(".");if(void 0===n)return Number(e.toFixed(0));const s=Number(e.toFixed(n.length)),i=Math.pow(10,n.length);return Math.round(s*i)/i},s=({from:e,to:t,min:n,max:s,isRange:i},r)=>["from"!==r&&i?e:n,"from"===r?t:s],i=(e,{step:t,from:i,to:r,min:o,max:a,isRange:c},l,d)=>{const[u,p]=s({from:i,to:r,min:o,max:a,isRange:c},l);if("none"===t)return e<u?u:e>p?p:e;const h="from"===l?i:r,m=Math.abs(e-h),v=Math.floor(m/t)*t;return e<u?u:e>p?p:d?((e,t,s,i,r,o,a)=>e<s/2?i:r-s<o?o:r+s>a?a:n(e<s?r>i?i+s:i-s:e%s>s/2?r>i?i+t+s:i-t-s:r>i?i+t:i-t,s))(m,v,t,h,e,u,p):n(e>h?h+v:h-v,t)},r=(e,{isRange:t,from:n,to:s})=>t&&Math.abs(n-e)<Math.abs(s-e)?"from":"to";t.updateOptionsByStep=(e,t,n)=>{const i="none"===t.step?(t.max-t.min)/10:t.step,r="up"===e?t[n]+i:t[n]-i,[o,a]=s(t,n);return r<o?Object.assign(Object.assign({},t),{[n]:o}):r>a?Object.assign(Object.assign({},t),{[n]:a}):Object.assign(Object.assign({},t),{[n]:r})},t.calculateValue=(e,t,n,s)=>{const o=(({x:e,y:t},{min:n,max:s,isVertical:i})=>(s-n)*(i?t:e)+n)(e,t);if(void 0!==s)return Object.assign(Object.assign({},t),{[s]:i(o,t,s,n)});const a=r(o,t);return Object.assign(Object.assign({},t),{[a]:i(o,t,a,n)})},t.updateNearValue=(e,t)=>{const n=r(e,t);return Object.assign(Object.assign({},t),{[n]:e})}},7538:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;const n=(e,t)=>void 0!==t?t:e;t.validate=(e,t)=>{const s="boolean"==typeof(null==t?void 0:t.isRange)?t.isRange:e.isRange,i="boolean"==typeof(null==t?void 0:t.isVertical)?t.isVertical:e.isVertical,r="boolean"==typeof(null==t?void 0:t.hasTip)?t.hasTip:e.hasTip,o="boolean"==typeof(null==t?void 0:t.hasScale)?t.hasScale:e.hasScale,{min:a,max:c}=((e,t)=>{const s=n(e.min,null==t?void 0:t.min),i=n(e.max,null==t?void 0:t.max);if(s===i)return{min:s,max:i+1};const[r,o]=[s,i].sort(((e,t)=>e-t));return{min:r,max:o}})(e,t),{from:l,to:d}=((e,t,s,i)=>{const r=n(e.from,null==i?void 0:i.from),o=n(e.to,null==i?void 0:i.to),[a,c]=[r,o].sort(((e,t)=>e-t)),l=((e,t,n)=>n>t?t:n<e?e:n)(t,s,c);return{from:((e,t,n)=>n<e?e:n)(t,0,a),to:l}})(e,a,c,t);return{from:l,to:d,min:a,max:c,step:((e,t,n,s)=>{const i=void 0===(null==s?void 0:s.step)?e.step:null==s?void 0:s.step;if("none"===i)return"none";if(i<=0)return"none";const r=n-t;return i<r?i:r})(e,a,c,t),isRange:s,isVertical:i,hasScale:o,hasTip:r}}},9750:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const s=n(5995);class i extends s.EventEmitter{constructor(e,t){super(),this.view=e,this.model=t,this.attachEventEmittersToModel().attachEventEmittersToView()}updateOptions(e){this.view.updateLibs(e),this.model.updateOptions(e)}getOptions(){return this.model.getOptions()}attachEventEmittersToModel(){const e=({position:e,type:t})=>{this.model.calculateValueUsingFraction({position:e,type:t},!1)},t=({type:e,touchRoute:t})=>{this.model.updateValueByStep({type:e,touchRoute:t})},n=({position:e})=>{this.model.calculateNearValueUsingFraction(e,!1)};return this.view.subscribeSubCViewToEvents("scale","ClickScale",(({targetNumber:e})=>{this.model.updateNearValue(e)})),this.view.subscribeSubCViewToEvents("runnerFrom","ChangeRunnerPosition",e),this.view.subscribeSubCViewToEvents("runnerTo","ChangeRunnerPosition",e),this.view.subscribeSubCViewToEvents("runnerFrom","ChangeRunnerPositionByStep",t),this.view.subscribeSubCViewToEvents("runnerTo","ChangeRunnerPositionByStep",t),this.view.subscribeSubCViewToEvents("runnerFrom","ChangeNearRunnerPosition",n),this.view.subscribeSubCViewToEvents("runnerTo","ChangeNearRunnerPosition",n),this.view.subscribeSubCViewToEvents("tip","ChangeNearRunnerPosition",n),this.view.subscribeSubCViewToEvents("tip","ChangeRunnerPosition",e),this.view.subscribeSubCViewToEvents("bar","ChangeNearRunnerPosition",(({position:e})=>{this.model.calculateNearValueUsingFraction(e,!0)})),this}attachEventEmittersToView(){return this.model.subscribe("UpdateModelOptions",(e=>{this.view.render(e),this.emit("onChange",e)})),this.model.subscribe("UpdateModelValues",(e=>{this.view.update(e),this.emit("onChange",e)})),this}}t.Presenter=i},7867:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const s=n(9750);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return s.Presenter}})},2296:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const s=n(5995),i=n(5766);n(935);class r extends s.EventEmitter{constructor(e,t){super(),this.props={target:"from"};const{dom:n,subViews:s,libs:i}=this.init(e,t);this.dom=n,this.subViews=s,this.libs=i}updateLibs(e){void 0!==(null==e?void 0:e.format)&&(this.libs={format:e.format})}render(e){this.props=(0,i.calculateTarget)(e),(0,i.toggleVertical)(this.dom,e.isVertical),this.subViews.bar.render(),this.subViews.tip.render(e),this.subViews.runnerFrom.render(e),this.subViews.runnerTo.render(e),this.subViews.range.render(),this.subViews.scale.render(e),this.updateSubViews(e)}update(e){this.updateSubViews(e)}subscribeSubCViewToEvents(e,t,n){this.subViews[e].subscribe(t,n)}init(e,t){const n=(0,i.createElements)(e),s=(0,i.initSubViews)(n);return this.subscribeToRunnerAndTip(s),{dom:n,subViews:s,libs:void 0!==(null==t?void 0:t.format)?{format:t.format}:{format:e=>String(e)}}}subscribeToRunnerAndTip({runnerFrom:e,runnerTo:t,tip:n}){const s=({type:e})=>{this.props={target:e}};return e.subscribe("ChangeRunnerPosition",s),t.subscribe("ChangeRunnerPosition",s),n.subscribe("ChangeRunnerPosition",s),this}updateSubViews(e){const t={from:this.libs.format(e.from),to:this.libs.format(e.to)};return this.subViews.tip.update(e,t),this.subViews.range.update(e),this.subViews.runnerFrom.update(e,this.props.target,t),this.subViews.runnerTo.update(e,this.props.target,t),this}}t.View=r},5341:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const s=n(2296);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return s.View}})},5766:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleVertical=t.calculateTarget=t.createElements=t.initSubViews=void 0;const s=n(8195);t.createElements=e=>{const t=document.createElement("div");return t.classList.add("slider"),e.append(t),{root:e,slider:t}},t.initSubViews=e=>{const t=new s.Tip(e.slider),n=new s.Bar(e.slider),i=n.getBarNode();return{tip:t,range:new s.Range(i),scale:new s.Scale(e.slider),runnerFrom:new s.Runner(i,"from"),runnerTo:new s.Runner(i,"to"),bar:n}},t.calculateTarget=({from:e,min:t,max:n})=>{const{abs:s}=Math;return{target:s(t-e)/s(n-t)<.5?"to":"from"}},t.toggleVertical=({slider:e},t)=>{t?e.classList.add("slider_vertical"):e.classList.remove("slider_vertical")}},109:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const s=n(5995),i=n(1868),r=n(7749);n(3182);class o extends s.EventEmitter{constructor(e){super(),this.handlePointerdownRunner=this.handlePointerdownRunner.bind(this);const{dom:t}=this.init(e);this.dom=t}getBarNode(){return this.dom.bar}render(){this.dom.root.append(this.dom.bar)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers(e){e.bar.addEventListener("pointerdown",this.handlePointerdownRunner)}handlePointerdownRunner(e){e.preventDefault();const t=i.helpers.getPosition(this.dom.bar,e);this.emit("ChangeNearRunnerPosition",{position:t})}}t.Bar=o},8007:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={bar:"slider__bar"}},9098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const s=n(109);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return s.Bar}})},7749:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElements=void 0;const s=n(1868),i=n(8007);t.createElements=e=>({root:e,bar:s.helpers.createElement(i.cssSelectors.bar)})},6979:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const s=n(3594);n(8588),t.Range=class{constructor(e){const{dom:t}=(0,s.init)(e);this.dom=t}render(){this.dom.root.append(this.dom.range)}update(e){(0,s.changeDimensions)(this.dom.range,e)}}},2049:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={range:"slider__range"}},512:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const s=n(6979);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return s.Range}})},3594:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeDimensions=t.init=void 0;const s=n(1868),i=n(2049);t.init=e=>({dom:(e=>({root:e,range:s.helpers.createElement(i.cssSelectors.range)}))(e)}),t.changeDimensions=(e,{min:t,max:n,isVertical:i,isRange:r,from:o,to:a})=>{const c=e,l=r?s.helpers.calculatePercent(o,t,n):0,d=s.helpers.calculatePercent(a,t,n);c.style.cssText=i?`top: ${l}%; bottom: ${100-d}%`:`left: ${l}%; right: ${100-d}%`}},4966:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const s=n(5995),i=n(1868),r=n(3827);n(3188);class o extends s.EventEmitter{constructor(e,t){super(),this.handlePointerdownRunner=this.handlePointerdownRunner.bind(this),this.handleKeydownRunner=this.handleKeydownRunner.bind(this);const{dom:n,props:s}=this.init(e,t);this.dom=n,this.props=s}render({isRange:e,isVertical:t,min:n,max:s}){"from"!==this.props.type||e?((0,r.changeAria)(this.dom,t,n,s),this.dom.root.append(this.dom.runner)):(0,r.destroy)(this.dom)}update(e,t,n){(0,r.toggleTarget)(this.props,this.dom,t),(0,r.move)(this.dom,this.props,e,n)}init(e,t){const n=(0,r.createElements)(e),s=(0,r.initProps)(t);return this.attachEventHandlers(n),{dom:n,props:s}}attachEventHandlers(e){e.runner.addEventListener("pointerdown",this.handlePointerdownRunner),e.runner.addEventListener("keydown",this.handleKeydownRunner)}handlePointerdownRunner(){const e=e=>{e.preventDefault(),this.dom.runner.ondragstart=()=>!1;const{type:t}=this.props,n=i.helpers.getPosition(this.dom.root,e);this.emit("ChangeRunnerPosition",{position:n,type:t})},t=()=>{document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",t)};document.addEventListener("pointermove",e),document.addEventListener("pointerup",t)}handleKeydownRunner(e){const{code:t}=e,n=t=>{e.preventDefault();const{type:n}=this.props;this.emit("ChangeRunnerPositionByStep",{type:n,touchRoute:t})};"ArrowDown"!==t&&"ArrowRight"!==t||n("up"),"ArrowUp"!==t&&"ArrowLeft"!==t||n("down")}}t.Runner=o},5086:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={runner:"slider__runner",targetedRunner:"slider__runner_targeted"}},4546:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const s=n(4966);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return s.Runner}})},3827:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeAria=t.move=t.toggleTarget=t.destroy=t.initProps=t.createElements=void 0;const s=n(1868),i=n(5086);t.createElements=e=>{const t=s.helpers.createElement(i.cssSelectors.runner);return t.tabIndex=0,t.role="slider",t.ariaLabel="slider runner",{root:e,runner:t}},t.initProps=e=>({type:e}),t.destroy=({runner:e})=>{e.remove()},t.toggleTarget=({type:e},{runner:t},n)=>{n!==e?t.classList.remove(i.cssSelectors.targetedRunner):t.classList.add(i.cssSelectors.targetedRunner)},t.move=({runner:e},{type:t},{min:n,max:i,from:r,to:o,isVertical:a},c)=>{const l=e,d="from"===t?r:o;l.ariaValueNow=String(d),l.ariaValueText=c[t];const u=s.helpers.calculatePercent(d,n,i),p=a?`top:${u}%;`:`left:${u}%;`;l.style.cssText=p},t.changeAria=({runner:e},t,n,s)=>{const i=e;i.ariaOrientation=t?"vertical":"horizontal",i.ariaValueMin=String(n),i.ariaValueMax=String(s)}},6768:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const s=n(5995),i=n(7366);n(4337);class r extends s.EventEmitter{constructor(e){super(),this.props={min:0,max:0,isVertical:!1},this.handlePointerdownScale=this.handlePointerdownScale.bind(this),this.handleWindowsResize=this.handleWindowsResize.bind(this);const{dom:t}=this.init(e);this.dom=t}render({min:e,max:t,isVertical:n,hasScale:s}){s?(this.props={min:e,max:t,isVertical:n},this.dom.root.append(this.dom.scale),(0,i.update)(this.dom,this.props)):(0,i.destroy)(this.dom)}init(e){const t=(0,i.createElement)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({scale:e}){return e.addEventListener("pointerdown",this.handlePointerdownScale),window.addEventListener("resize",this.handleWindowsResize),this}handlePointerdownScale({target:e}){if(!(e instanceof HTMLDivElement))return;if(!("customValue"in e))return;const t=Number(e.customValue);this.emit("ClickScale",{targetNumber:t})}handleWindowsResize(){(0,i.update)(this.dom,this.props)}}t.Scale=r},5760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={scale:"slider__scale",mark:"slider__mark"}},6561:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const s=n(6768);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return s.Scale}})},7366:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.destroy=t.getScalePercents=t.createElement=void 0;const s=n(1868),i=n(5760);t.createElement=e=>({root:e,scale:s.helpers.createElement(i.cssSelectors.scale)});const r=e=>e>800?[0,10,20,30,40,50,60,70,80,90,100]:e>500?[0,20,40,60,80,100]:e>300?[0,33,66,100]:[0,100];t.getScalePercents=r,t.destroy=({scale:e})=>{e.remove()},t.update=(e,t)=>{(({scale:e})=>{for(;null!==e.firstChild;)e.firstChild.remove()})(e),(({scale:e},{isVertical:t},n)=>{let s=0;const r=e;n.forEach(((n,o)=>{const{percent:a,value:c}=n,l=t?`top: ${a}%`:`left: ${a}%`,d=document.createElement("div");if(d.classList.add(i.cssSelectors.mark),d.style.cssText=l,d.innerText=String(c),d.customValue=Number(c),e.append(d),t){const{width:e}=d.getBoundingClientRect();e>s&&(s=e,r.style.cssText=`width: ${s}px`)}else if(0===o){const{height:e}=d.getBoundingClientRect();r.style.cssText=`height: ${e}px`}}))})(e,t,(({max:e,min:t,isVertical:n},{scale:s})=>{const{offsetHeight:i,offsetWidth:o}=s,a=r(n?i:o),c=Math.abs(e-t);return a.map((e=>({percent:e,value:Number((t+c*e/100).toFixed(1).replace(/\.?0+$/,""))})))})(t,e))}},5321:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const s=n(5995),i=n(1868),r=n(8626);n(5317);class o extends s.EventEmitter{constructor(e){super(),this.handlePointerdownTip=this.handlePointerdownTip.bind(this);const{dom:t}=this.init(e);this.dom=t}render({hasTip:e,isRange:t}){e?(this.dom.root.insertAdjacentElement("afterbegin",this.dom.tipLine),t?(this.dom.tipLine.append(this.dom.tipFrom),this.dom.tipLine.append(this.dom.tipBoth)):(this.dom.tipFrom.remove(),this.dom.tipBoth.remove()),this.dom.tipLine.append(this.dom.tipTo)):(0,r.destroy)(this.dom)}update(e,t){const{dom:n}=this;(0,r.changeText)(e,n,t),(0,r.changePosition)(e,n),(0,r.toggleDisplay)(e,n)}init(e){const t=(0,r.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({tipFrom:e,tipTo:t,tipBoth:n}){return e.addEventListener("pointerdown",this.handlePointerdownTip),t.addEventListener("pointerdown",this.handlePointerdownTip),n.addEventListener("pointerdown",this.handlePointerdownTip),this}handlePointerdownTip({target:e}){if(null===e)return;if(!("customType"in e))return;const{customType:t}=e,n=e=>{e.preventDefault();const n=e.target;if(!(n instanceof HTMLElement))return;n.ondragstart=()=>!1;const s=i.helpers.getPosition(this.dom.root,e);"both"!==t?"from"!==t&&"to"!==t||this.emit("ChangeRunnerPosition",{position:s,type:t}):this.emit("ChangeNearRunnerPosition",{position:s})},s=()=>{document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",s)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",s)}}t.Tip=o},6880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.cssSelectors=void 0,t.cssSelectors={tip:"slider__tip",hiddenTip:"slider__tip_hidden",tipLine:"slider__tip-line"}},8875:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const s=n(5321);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return s.Tip}})},8626:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeText=t.destroy=t.changePosition=t.toggleDisplay=t.createElements=void 0;const s=n(1868),i=n(6880);t.createElements=e=>{const t=s.helpers.createElement(i.cssSelectors.tipLine),n=s.helpers.createElement(i.cssSelectors.tip),r=s.helpers.createElement(i.cssSelectors.tip),o=s.helpers.createElement(i.cssSelectors.tip);return n.customType="from",r.customType="both",o.customType="to",{root:e,tipLine:t,tipFrom:n,tipBoth:r,tipTo:o}},t.toggleDisplay=({isRange:e,isVertical:t},{tipFrom:n,tipTo:s,tipBoth:r})=>{if(!e)return void s.classList.remove(i.cssSelectors.hiddenTip);const{x:o,y:a,height:c,width:l}=n.getBoundingClientRect(),d=s.getBoundingClientRect();if(t?a+c>=d.y:o+l>=d.x)return n.classList.add(i.cssSelectors.hiddenTip),r.classList.remove(i.cssSelectors.hiddenTip),void s.classList.add(i.cssSelectors.hiddenTip);n.classList.remove(i.cssSelectors.hiddenTip),r.classList.add(i.cssSelectors.hiddenTip),s.classList.remove(i.cssSelectors.hiddenTip)},t.changePosition=({min:e,max:t,isVertical:n,from:i,to:r,isRange:o},{tipBoth:a,tipFrom:c,tipTo:l})=>{const d=l,u=s.helpers.calculatePercent(r,e,t),p=n?`top: ${u}%;`:`left: ${u}%;`;if(d.style.cssText=p,!o)return;const h=c,m=a,v=s.helpers.calculatePercent(i,e,t),f=n?`top: ${v}%;`:`left: ${v}%;`,b=n?`top: ${(v+u)/2}%;`:`left: ${(v+u)/2}%;`;h.style.cssText=f,m.style.cssText=b},t.destroy=({tipLine:e})=>{e.remove()},t.changeText=({from:e,to:t,isRange:n},{tipFrom:s,tipTo:i,tipBoth:r},o)=>{if(i.innerText=o.to,!n)return;const a=s,c=r,l=e===t?o.to:`${o.from} - ${o.to}`;a.innerText=o.from,c.innerText=l}},8195:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=t.Tip=t.Scale=t.Runner=t.Range=void 0;const s=n(512);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return s.Range}});const i=n(4546);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return i.Runner}});const r=n(6561);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return r.Scale}});const o=n(8875);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return o.Tip}});const a=n(9098);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return a.Bar}})},2620:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=t.View=t.Model=void 0;const s=n(5020);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return s.Model}});const i=n(5341);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return i.View}});const r=n(7867);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return r.Presenter}})},3089:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultConfig=void 0,t.defaultConfig={isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:0,max:100,from:40,to:70}},5995:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this.events={}}subscribe(e,t){const n=this.events[e];this.events[e]=void 0===n?[t]:[...n,t]}unsubscribe(e,t){var n;this.events[e]=null===(n=this.events[e])||void 0===n?void 0:n.filter((e=>t!==e))}emit(e,t){var n;null===(n=this.events[e])||void 0===n||n.forEach((e=>e(t)))}}},3012:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calculatePercent=void 0,t.calculatePercent=(e,t,n)=>(e-t)/(n-t)*100},1109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=void 0,t.createElement=e=>{const t=document.createElement("div");return t.classList.add(e),t}},7212:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getPosition=void 0,t.getPosition=(e,t)=>{const{height:n,width:s,left:i,top:r}=e.getBoundingClientRect(),{clientX:o,clientY:a}=t;return{x:(o-i)/s,y:(a-r)/n}}},1868:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=void 0;const s=n(1109),i=n(7212),r=n(3012),o={createElement:s.createElement,getPosition:i.getPosition,calculatePercent:r.calculatePercent};t.helpers=o},6043:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const s=n(833);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return s.App}}),$.fn.slider=function(e){return this.map(((t,n)=>new s.App(n,e)))}},2095:e=>{e.exports=JSON.parse('[{"isRange":true,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-100,"max":100,"from":-50,"to":40},{"isRange":true,"isVertical":true,"hasTip":true,"hasScale":true,"step":10,"min":100,"max":200,"from":100,"to":150},{"isRange":false,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-100,"max":100,"from":-50,"to":40},{"isRange":true,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-1000,"max":100000,"from":-50,"to":4000}]')}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(3509)})();