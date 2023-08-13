(()=>{"use strict";var e={2904:(e,t,n)=>{n.r(t)},6588:(e,t,n)=>{n.r(t)},935:(e,t,n)=>{n.r(t)},3182:(e,t,n)=>{n.r(t)},8588:(e,t,n)=>{n.r(t)},3188:(e,t,n)=>{n.r(t)},4337:(e,t,n)=>{n.r(t)},5317:(e,t,n)=>{n.r(t)},4512:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={example:".js-panel__example",control:".js-panel__control"}},3509:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(6043);const r=n(1996),o=i(n(2095)),s=n(4512);n(2904);const a=$(s.CSSSelectors.example).slider();document.querySelectorAll(s.CSSSelectors.control).forEach(((e,t)=>{new r.Panel(e,a[t],o.default[t])}))},1996:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Panel=void 0;const i=n(3722);n(6588);const r=n(3675);t.Panel=class{constructor(e,t,n){this.slider=t,this.handleRangeClick=this.makeHandleClickCheckboxElement(r.name.isRange).bind(this),this.handleVerticalClick=this.makeHandleClickCheckboxElement(r.name.isVertical).bind(this),this.handleTipClick=this.makeHandleClickCheckboxElement(r.name.hasTip).bind(this),this.handleScaleClick=this.makeHandleClickCheckboxElement(r.name.hasScale).bind(this),this.handleMinChange=this.makeHandleChangeInputElement(r.name.min).bind(this),this.handleMaxChange=this.makeHandleChangeInputElement(r.name.max).bind(this),this.handleFromChange=this.makeHandleChangeInputElement(r.name.from).bind(this),this.handleToChange=this.makeHandleChangeInputElement(r.name.to).bind(this),this.handleStepChange=this.makeHandleChangeInputElement(r.name.step).bind(this),this.handleFormatChange=this.handleFormatChange.bind(this);const{dom:i}=this.init(e,n);this.dom=i}init(e,t){this.slider.update(t);const n=(0,i.searchElements)(e);return(0,i.addOptionsToFormat)(n),this.attachEventHandlers(n),(0,i.syncInputs)(this.slider,n),(0,i.attachCallback)(n,this.slider),{dom:n}}attachEventHandlers(e){const{range:t,vertical:n,scale:i,min:r,max:o,from:s,to:a,step:l,tip:c,format:d}=e;return t.addEventListener("click",this.handleRangeClick),n.addEventListener("click",this.handleVerticalClick),c.addEventListener("click",this.handleTipClick),i.addEventListener("click",this.handleScaleClick),r.addEventListener("change",this.handleMinChange),o.addEventListener("change",this.handleMaxChange),s.addEventListener("change",this.handleFromChange),a.addEventListener("change",this.handleToChange),l.addEventListener("change",this.handleStepChange),d.addEventListener("change",this.handleFormatChange),this}makeHandleClickCheckboxElement(e){return({target:t})=>{if(!(t instanceof HTMLInputElement))return;const n=t.checked;this.slider.update({[e]:n}),(0,i.syncInputs)(this.slider,this.dom)}}makeHandleChangeInputElement(e){return({target:t})=>{if(!(t instanceof HTMLInputElement))return;const n=Number(t.value);"step"===e&&0===n?this.slider.update({step:"none"}):this.slider.update({[e]:n}),(0,i.syncInputs)(this.slider,this.dom)}}handleFormatChange({target:e}){if(!(e instanceof HTMLSelectElement))return;const t=e.options[e.selectedIndex];if(!("customName"in t))return;const{customName:n}=t;n!==r.formatName.before?n!==r.formatName.after?n!==r.formatName.x2?n!==r.formatName.toFixed0?n!==r.formatName.toFixed2?n!==r.formatName.toFixed4?this.slider.update({format:e=>String(e)}):this.slider.update({format:e=>String(Number(e.toFixed(4)))}):this.slider.update({format:e=>String(Number(e.toFixed(2)))}):this.slider.update({format:e=>e.toFixed(0)}):this.slider.update({format:e=>String(2*e)}):this.slider.update({format:e=>`${e} $`}):this.slider.update({format:e=>`$ ${e}`})}}},3675:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.name=t.formatName=t.formatOptions=t.CSSSelectors=void 0,t.CSSSelectors={range:".js-panel__input_name-range",vertical:".js-panel__input_name-vertical",scale:".js-panel__input_name-scale",min:".js-panel__input_name-min",max:".js-panel__input_name-max",from:".js-panel__input_name-from",to:".js-panel__input_name-to",step:".js-panel__input_name-step",tip:".js-panel__input_name-tip",indicator:".js-panel__indicator",decoratedIndicator:"panel__indicator_decorated",format:".js-panel__select_name-format"},t.formatOptions=[{name:"none"},{name:"before"},{name:"after"},{name:"x2"},{name:"toFixed0"},{name:"toFixed2"},{name:"toFixed4"}],t.formatName={none:"none",before:"before",after:"after",x2:"x2",toFixed0:"toFixed0",toFixed2:"toFixed2",toFixed4:"toFixed4"},t.name={isRange:"isRange",isVertical:"isVertical",hasScale:"hasScale",min:"min",max:"max",from:"from",to:"to",step:"step",hasTip:"hasTip",indicator:"indicator",format:"format"}},3722:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.addOptionsToFormat=t.attachCallback=t.syncInputs=t.searchElements=void 0;const i=n(3675);t.searchElements=e=>{const t=e.querySelector(i.CSSSelectors.range);if(!(t instanceof HTMLInputElement))throw Error();const n=e.querySelector(i.CSSSelectors.vertical);if(!(n instanceof HTMLInputElement))throw Error();const r=e.querySelector(i.CSSSelectors.scale);if(!(r instanceof HTMLInputElement))throw Error();const o=e.querySelector(i.CSSSelectors.min);if(!(o instanceof HTMLInputElement))throw Error();const s=e.querySelector(i.CSSSelectors.max);if(!(s instanceof HTMLInputElement))throw Error();const a=e.querySelector(i.CSSSelectors.from);if(!(a instanceof HTMLInputElement))throw Error();const l=e.querySelector(i.CSSSelectors.to);if(!(l instanceof HTMLInputElement))throw Error();const c=e.querySelector(i.CSSSelectors.step);if(!(c instanceof HTMLInputElement))throw Error();const d=e.querySelector(i.CSSSelectors.tip);if(!(d instanceof HTMLInputElement))throw Error();const u=e.querySelector(i.CSSSelectors.indicator);if(null===u)throw Error();const p=e.querySelector(i.CSSSelectors.format);if(!(p instanceof HTMLSelectElement))throw Error();return p.customName=i.name.format,{root:e,range:t,vertical:n,scale:r,min:o,max:s,from:a,to:l,step:c,tip:d,indicator:u,format:p}},t.syncInputs=(e,t)=>{const n=t,i=e.getOptions();if(void 0===i)return;const{isRange:r,isVertical:o,from:s,to:a,min:l,max:c,hasScale:d,hasTip:u,step:p}=i;n.range.checked=r,n.vertical.checked=o,n.min.value=String(l),n.max.value=String(c),n.from.value=String(Number(s.toFixed(3))),n.to.value=String(Number(a.toFixed(3))),n.step.value="none"===p?"0":String(p),n.tip.checked=u,n.scale.checked=d},t.attachCallback=(e,t)=>{const n=e,r=()=>{n.indicator.classList.remove(i.CSSSelectors.decoratedIndicator)};let o=setTimeout((()=>{}),0);t.update({onChange:({from:e,to:t})=>{clearTimeout(o),n.from.value=String(Number(e.toFixed(3))),n.to.value=String(Number(t.toFixed(3))),n.indicator.classList.add(i.CSSSelectors.decoratedIndicator),o=setTimeout(r,300)}})},t.addOptionsToFormat=({format:e})=>{const t=e;i.formatOptions.forEach((n=>{const i=new Option(n.name);i.customName=n.name,t.options[e.options.length]=i}))}},1927:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(2620),r=n(3089);t.App=class{constructor(e,t){this.presenter=((e,t)=>{const n=Object.assign({},r.defaultOptions),o=new i.Model(n,t),s=new i.View(e);return new i.Presenter(s,o)})(e,t)}update(e){this.presenter.updateOptions(e)}getOptions(){return this.presenter.getOptions()}}},833:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(1927);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return i.App}})},9747:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const i=n(5995),r=n(7538),o=n(5143);class s extends i.EventEmitter{constructor(e,t){super(),this.callbacks={onChange:()=>{}},void 0!==(null==t?void 0:t.onChange)&&(this.callbacks={onChange:t.onChange}),this.options=(0,r.validate)(e,t)}updateOptions(e){this.options=(0,r.validate)(this.options,e),void 0!==(null==e?void 0:e.onChange)&&(this.callbacks={onChange:e.onChange}),this.callbacks.onChange(this.options),this.emit("UpdateModelOptions",this.options)}getOptions(){return this.options}calculateValueUsingFraction({position:e,type:t},n){this.options=(0,o.calculateValue)(e,this.options,n,t),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}calculateNearValueUsingFraction(e,t){this.options=(0,o.calculateValue)(e,this.options,t),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}updateNearValue(e){this.options=(0,o.updateNearValue)(e,this.options),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}updateValueByStep({type:e,touchRoute:t}){this.options=(0,o.updateOptionsByStep)(t,this.options,e),this.callbacks.onChange(this.options),this.emit("UpdateModelValues",this.options)}}t.Model=s},5020:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Model=void 0;const i=n(9747);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return i.Model}})},5143:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateNearValue=t.calculateValue=t.updateOptionsByStep=void 0;const n=(e,t)=>{const[,n]=String(t).split(".");if(void 0===n)return Number(e.toFixed(0));const i=Number(e.toFixed(n.length)),r=Math.pow(10,n.length);return Math.round(i*r)/r},i=({from:e,to:t,min:n,max:i,isRange:r},o)=>({minimum:"from"!==o&&r?e:n,maximum:"from"===o?t:i}),r=(e,{step:t,from:r,to:o,min:s,max:a,isRange:l},c,d)=>{const{minimum:u,maximum:p}=i({from:r,to:o,min:s,max:a,isRange:l},c);if("none"===t)return e<u?u:e>p?p:e;const h="from"===c?r:o,m=Math.abs(e-h),f=Math.floor(m/t)*t;return e<u?u:e>p?p:d?((e,t,i,r,o,s,a)=>e<i/2?r:o-i<s?s:o+i>a?a:n(e<i?o>r?r+i:r-i:e%i>i/2?o>r?r+t+i:r-t-i:o>r?r+t:r-t,i))(m,f,t,h,e,u,p):n(e>h?h+f:h-f,t)},o=(e,{isRange:t,from:n,to:i})=>t&&Math.abs(n-e)<Math.abs(i-e)?"from":"to";t.updateOptionsByStep=(e,t,n)=>{const r="none"===t.step?(t.max-t.min)/10:t.step,o="up"===e?t[n]+r:t[n]-r,{minimum:s,maximum:a}=i(t,n);return o<s?Object.assign(Object.assign({},t),{[n]:s}):o>a?Object.assign(Object.assign({},t),{[n]:a}):Object.assign(Object.assign({},t),{[n]:o})},t.calculateValue=(e,t,n,i)=>{const s=(({x:e,y:t},{min:n,max:i,isVertical:r})=>(i-n)*(r?t:e)+n)(e,t);if(void 0!==i)return Object.assign(Object.assign({},t),{[i]:r(s,t,i,n)});const a=o(s,t);return Object.assign(Object.assign({},t),{[a]:r(s,t,a,n)})},t.updateNearValue=(e,t)=>{const n=o(e,t);return Object.assign(Object.assign({},t),{[n]:e})}},7538:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validate=void 0;const n=(e,t)=>void 0!==t?t:e;t.validate=(e,t)=>{const i="boolean"==typeof(null==t?void 0:t.isRange)?t.isRange:e.isRange,r="boolean"==typeof(null==t?void 0:t.isVertical)?t.isVertical:e.isVertical,o="boolean"==typeof(null==t?void 0:t.hasTip)?t.hasTip:e.hasTip,s="boolean"==typeof(null==t?void 0:t.hasScale)?t.hasScale:e.hasScale,{min:a,max:l}=((e,t)=>{const i=n(e.min,null==t?void 0:t.min),r=n(e.max,null==t?void 0:t.max);if(i===r)return{min:i,max:r+1};const[o,s]=[i,r].sort(((e,t)=>e-t));return{min:o,max:s}})(e,t),{from:c,to:d}=((e,t,i,r)=>{const o=n(e.from,null==r?void 0:r.from),s=n(e.to,null==r?void 0:r.to),[a,l]=[o,s].sort(((e,t)=>e-t)),c=((e,t,n)=>n>t?t:n<e?e:n)(t,i,l);return{from:((e,t,n)=>n<e?e:n)(t,0,a),to:c}})(e,a,l,t);return{from:c,to:d,min:a,max:l,step:((e,t,n,i)=>{const r=void 0===(null==i?void 0:i.step)?e.step:null==i?void 0:i.step;if("none"===r)return"none";if(r<=0)return"none";const o=n-t;return r<o?r:o})(e,a,l,t),isRange:i,isVertical:r,hasScale:s,hasTip:o,format:void 0!==(null==t?void 0:t.format)?t.format:e.format}}},9750:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0,t.Presenter=class{constructor(e,t){this.view=e,this.model=t,this.attachEventEmittersToModel().attachEventEmittersToView()}updateOptions(e){this.model.updateOptions(e)}getOptions(){return this.model.getOptions()}attachEventEmittersToModel(){return this.view.subscribe("ClickScale",(({targetNumber:e})=>{this.model.updateNearValue(e)})),this.view.subscribe("ChangeRunnerPosition",(({position:e,type:t})=>{this.model.calculateValueUsingFraction({position:e,type:t},!1)})),this.view.subscribe("ChangeRunnerPositionByStep",(({type:e,touchRoute:t})=>{this.model.updateValueByStep({type:e,touchRoute:t})})),this.view.subscribe("ChangeNearRunnerPosition",(({position:e})=>{this.model.calculateNearValueUsingFraction(e,!0)})),this}attachEventEmittersToView(){return this.model.subscribe("UpdateModelOptions",(e=>{this.view.render(e)})),this.model.subscribe("UpdateModelValues",(e=>{this.view.update(e)})),this}}},7867:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=void 0;const i=n(9750);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return i.Presenter}})},2296:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const i=n(5995),r=n(5766);n(935);class o extends i.EventEmitter{constructor(e){super(),this.props={target:"from"};const{dom:t,subViews:n}=this.init(e);this.dom=t,this.subViews=n}render(e){this.props=(0,r.calculateTarget)(e),(0,r.toggleVertical)(this.dom,e.isVertical),this.subViews.bar.render(),this.subViews.tip.render(e),this.subViews.runnerFrom.render(e),this.subViews.runnerTo.render(e),this.subViews.range.render(),this.subViews.scale.render(e),this.updateSubViews(e)}update(e){this.updateSubViews(e)}init(e){const t=(0,r.createElements)(e),n=(0,r.initSubViews)(t);return this.attachEventEmittersToSubView(n),{dom:t,subViews:n}}attachEventEmittersToSubView({runnerFrom:e,runnerTo:t,tip:n,bar:i,scale:r}){const o=({position:e,type:t})=>{this.props={target:t},this.emit("ChangeRunnerPosition",{position:e,type:t})},s=({type:e,touchRoute:t})=>{this.emit("ChangeRunnerPositionByStep",{type:e,touchRoute:t})};return e.subscribe("ChangeRunnerPosition",o),t.subscribe("ChangeRunnerPosition",o),e.subscribe("ChangeRunnerPositionByStep",s),t.subscribe("ChangeRunnerPositionByStep",s),n.subscribe("ChangeRunnerPosition",o),n.subscribe("ChangeRunnerPosition",o),n.subscribe("ChangeNearRunnerPosition",(({position:e})=>{this.emit("ChangeNearRunnerPosition",{position:e})})),i.subscribe("ChangeNearRunnerPosition",(({position:e})=>{this.emit("ChangeNearRunnerPosition",{position:e})})),r.subscribe("ClickScale",(({targetNumber:e})=>{this.emit("ClickScale",{targetNumber:e})})),this}updateSubViews(e){const t={from:e.format(e.from),to:e.format(e.to)};return this.subViews.tip.update(e,t),this.subViews.range.update(e),this.subViews.runnerFrom.update(e,this.props.target,t),this.subViews.runnerTo.update(e,this.props.target,t),this}}t.View=o},4326:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={slider:"slider",sliderVertical:"slider_vertical"}},5341:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.View=void 0;const i=n(2296);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return i.View}})},5766:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleVertical=t.calculateTarget=t.createElements=t.initSubViews=void 0;const i=n(8195),r=n(4326);t.createElements=e=>{const t=document.createElement("div");return t.classList.add(r.CSSSelectors.slider),e.append(t),{root:e,slider:t}},t.initSubViews=e=>{const t=new i.Tip(e.slider),n=new i.Bar(e.slider),r=n.getBarNode();return{tip:t,range:new i.Range(r),scale:new i.Scale(e.slider),runnerFrom:new i.Runner(r,"from"),runnerTo:new i.Runner(r,"to"),bar:n}},t.calculateTarget=({from:e,min:t,max:n})=>{const{abs:i}=Math;return{target:i(t-e)/i(n-t)<.5?"to":"from"}},t.toggleVertical=({slider:e},t)=>{t?e.classList.add(r.CSSSelectors.sliderVertical):e.classList.remove(r.CSSSelectors.sliderVertical)}},109:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const i=n(5995),r=n(1868),o=n(7749);n(3182);class s extends i.EventEmitter{constructor(e){super(),this.handleRunnerPointerdown=this.handleRunnerPointerdown.bind(this);const{dom:t}=this.init(e);this.dom=t}getBarNode(){return this.dom.bar}render(){this.dom.root.append(this.dom.bar)}init(e){const t=(0,o.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers(e){e.bar.addEventListener("pointerdown",this.handleRunnerPointerdown)}handleRunnerPointerdown(e){e.preventDefault();const t=r.helpers.getPosition(this.dom.bar,e);this.emit("ChangeNearRunnerPosition",{position:t})}}t.Bar=s},8007:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={bar:"slider__bar"}},9098:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=void 0;const i=n(109);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return i.Bar}})},7749:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElements=void 0;const i=n(1868),r=n(8007);t.createElements=e=>({root:e,bar:i.helpers.createElement(r.CSSSelectors.bar)})},6979:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const i=n(3594);n(8588),t.Range=class{constructor(e){const{dom:t}=(0,i.init)(e);this.dom=t}render(){this.dom.root.append(this.dom.range)}update(e){(0,i.changeDimensions)(this.dom.range,e)}}},2049:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={range:"slider__range"}},512:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Range=void 0;const i=n(6979);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return i.Range}})},3594:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeDimensions=t.init=void 0;const i=n(1868),r=n(2049);t.init=e=>({dom:(e=>({root:e,range:i.helpers.createElement(r.CSSSelectors.range)}))(e)}),t.changeDimensions=(e,{min:t,max:n,isVertical:r,isRange:o,from:s,to:a})=>{const l=e,c=o?i.helpers.calculatePercent(s,t,n):0,d=i.helpers.calculatePercent(a,t,n);l.style.cssText=r?`top: ${c}%; bottom: ${100-d}%`:`left: ${c}%; right: ${100-d}%`}},4966:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const i=n(5995),r=n(1868),o=n(3827);n(3188);class s extends i.EventEmitter{constructor(e,t){super(),this.handleRunnerPointerdown=this.handleRunnerPointerdown.bind(this),this.handleRunnerKeydown=this.handleRunnerKeydown.bind(this);const{dom:n,props:i}=this.init(e,t);this.dom=n,this.props=i}render({isRange:e,isVertical:t,min:n,max:i}){"from"!==this.props.type||e?((0,o.changeAria)(this.dom,t,n,i),this.dom.root.append(this.dom.runner)):(0,o.destroy)(this.dom)}update(e,t,n){(0,o.toggleTarget)(this.props,this.dom,t),(0,o.move)(this.dom,this.props,e,n)}init(e,t){const n=(0,o.createElements)(e),i=(0,o.initProps)(t);return this.attachEventHandlers(n),{dom:n,props:i}}attachEventHandlers(e){e.runner.addEventListener("pointerdown",this.handleRunnerPointerdown),e.runner.addEventListener("keydown",this.handleRunnerKeydown)}handleRunnerPointerdown(){const e=e=>{e.preventDefault(),this.dom.runner.ondragstart=()=>!1;const{type:t}=this.props,n=r.helpers.getPosition(this.dom.root,e);this.emit("ChangeRunnerPosition",{position:n,type:t})},t=()=>{document.removeEventListener("pointermove",e),document.removeEventListener("pointerup",t)};document.addEventListener("pointermove",e),document.addEventListener("pointerup",t)}handleRunnerKeydown(e){const{code:t}=e,n=t=>{e.preventDefault();const{type:n}=this.props;this.emit("ChangeRunnerPositionByStep",{type:n,touchRoute:t})};"ArrowDown"!==t&&"ArrowRight"!==t||n("up"),"ArrowUp"!==t&&"ArrowLeft"!==t||n("down")}}t.Runner=s},5086:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={runner:"slider__runner",targetedRunner:"slider__runner_targeted"}},4546:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Runner=void 0;const i=n(4966);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return i.Runner}})},3827:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeAria=t.move=t.toggleTarget=t.destroy=t.initProps=t.createElements=void 0;const i=n(1868),r=n(5086);t.createElements=e=>{const t=i.helpers.createElement(r.CSSSelectors.runner);return t.tabIndex=0,t.role="slider",t.ariaLabel="slider runner",{root:e,runner:t}},t.initProps=e=>({type:e}),t.destroy=({runner:e})=>{e.remove()},t.toggleTarget=({type:e},{runner:t},n)=>{n!==e?t.classList.remove(r.CSSSelectors.targetedRunner):t.classList.add(r.CSSSelectors.targetedRunner)},t.move=({runner:e},{type:t},{min:n,max:r,from:o,to:s,isVertical:a},l)=>{const c=e,d="from"===t?o:s;c.ariaValueNow=String(d),c.ariaValueText=l[t];const u=i.helpers.calculatePercent(d,n,r),p=a?`top:${u}%;`:`left:${u}%;`;c.style.cssText=p},t.changeAria=({runner:e},t,n,i)=>{const r=e;r.ariaOrientation=t?"vertical":"horizontal",r.ariaValueMin=String(n),r.ariaValueMax=String(i)}},6768:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const i=n(5995),r=n(7366);n(4337);class o extends i.EventEmitter{constructor(e){super(),this.props={min:0,max:0,isVertical:!1},this.handleScalePointerdown=this.handleScalePointerdown.bind(this),this.handleWindowsResize=this.handleWindowsResize.bind(this);const{dom:t}=this.init(e);this.dom=t}render({min:e,max:t,isVertical:n,hasScale:i}){i?(this.props={min:e,max:t,isVertical:n},this.dom.root.append(this.dom.scale),(0,r.update)(this.dom,this.props)):(0,r.destroy)(this.dom)}init(e){const t=(0,r.createElement)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({scale:e}){return e.addEventListener("pointerdown",this.handleScalePointerdown),window.addEventListener("resize",this.handleWindowsResize),this}handleScalePointerdown({target:e}){if(!(e instanceof HTMLDivElement))return;if(!("customValue"in e))return;const t=Number(e.customValue);this.emit("ClickScale",{targetNumber:t})}handleWindowsResize(){(0,r.update)(this.dom,this.props)}}t.Scale=o},5760:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={scale:"slider__scale",mark:"slider__mark"}},6561:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Scale=void 0;const i=n(6768);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return i.Scale}})},7366:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.destroy=t.getScalePercents=t.createElement=void 0;const i=n(1868),r=n(5760);t.createElement=e=>({root:e,scale:i.helpers.createElement(r.CSSSelectors.scale)});const o=e=>e>800?[0,10,20,30,40,50,60,70,80,90,100]:e>500?[0,20,40,60,80,100]:e>300?[0,33,66,100]:[0,100];t.getScalePercents=o,t.destroy=({scale:e})=>{e.remove()},t.update=(e,t)=>{(({scale:e})=>{e.innerHTML=""})(e),(({scale:e},{isVertical:t},n)=>{const i=e;let o=0;n.forEach(((n,s)=>{const{percent:a,value:l}=n,c=t?`top: ${a}%`:`left: ${a}%`,d=document.createElement("div");if(d.classList.add(r.CSSSelectors.mark),d.style.cssText=c,d.innerText=String(l),d.customValue=Number(l),e.append(d),t){const{width:e}=d.getBoundingClientRect();e>o&&(o=e,i.style.cssText=`width: ${o}px`)}else if(0===s){const{height:e}=d.getBoundingClientRect();i.style.cssText=`height: ${e}px`}}))})(e,t,(({max:e,min:t,isVertical:n},{scale:i})=>{const{offsetHeight:r,offsetWidth:s}=i,a=o(n?r:s),l=Math.abs(e-t);return a.map((e=>({percent:e,value:Number((t+l*e/100).toFixed(1).replace(/\.?0+$/,""))})))})(t,e))}},5321:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const i=n(5995),r=n(1868),o=n(8626);n(5317);class s extends i.EventEmitter{constructor(e){super(),this.handleFromTipPointerdown=this.makeHandlePointerdownTip("from").bind(this),this.handleBothTipPointerdown=this.makeHandlePointerdownTip("both").bind(this),this.handleToTipPointerdown=this.makeHandlePointerdownTip("to").bind(this);const{dom:t}=this.init(e);this.dom=t}render({hasTip:e,isRange:t}){e?(this.dom.root.insertAdjacentElement("afterbegin",this.dom.tipLine),t?(this.dom.tipLine.append(this.dom.tipFrom),this.dom.tipLine.append(this.dom.tipBoth)):(this.dom.tipFrom.remove(),this.dom.tipBoth.remove()),this.dom.tipLine.append(this.dom.tipTo)):(0,o.destroy)(this.dom)}update(e,t){const{dom:n}=this;(0,o.changeText)(e,n,t),(0,o.changePosition)(e,n),(0,o.toggleDisplay)(e,n)}init(e){const t=(0,o.createElements)(e);return this.attachEventHandlers(t),{dom:t}}attachEventHandlers({tipFrom:e,tipTo:t,tipBoth:n}){return e.addEventListener("pointerdown",this.handleFromTipPointerdown),n.addEventListener("pointerdown",this.handleBothTipPointerdown),t.addEventListener("pointerdown",this.handleToTipPointerdown),this}makeHandlePointerdownTip(e){return({target:t})=>{if(null===t)return;const n=t=>{t.preventDefault();const n=t.target;if(!(n instanceof HTMLElement))return;n.ondragstart=()=>!1;const i=r.helpers.getPosition(this.dom.root,t);"both"!==e?"from"!==e&&"to"!==e||this.emit("ChangeRunnerPosition",{position:i,type:e}):this.emit("ChangeNearRunnerPosition",{position:i})},i=()=>{document.removeEventListener("pointermove",n),document.removeEventListener("pointerup",i)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",i)}}}t.Tip=s},6880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CSSSelectors=void 0,t.CSSSelectors={tip:"slider__tip",hiddenTip:"slider__tip_hidden",tipLine:"slider__tip-line"}},8875:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tip=void 0;const i=n(5321);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return i.Tip}})},8626:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.changeText=t.destroy=t.changePosition=t.toggleDisplay=t.createElements=void 0;const i=n(1868),r=n(6880);t.createElements=e=>({root:e,tipLine:i.helpers.createElement(r.CSSSelectors.tipLine),tipFrom:i.helpers.createElement(r.CSSSelectors.tip),tipBoth:i.helpers.createElement(r.CSSSelectors.tip),tipTo:i.helpers.createElement(r.CSSSelectors.tip)}),t.toggleDisplay=({isRange:e,isVertical:t},{tipFrom:n,tipTo:i,tipBoth:o})=>{if(!e)return void i.classList.remove(r.CSSSelectors.hiddenTip);const{x:s,y:a,height:l,width:c}=n.getBoundingClientRect(),d=i.getBoundingClientRect();if(t?a+l>=d.y:s+c>=d.x)return n.classList.add(r.CSSSelectors.hiddenTip),o.classList.remove(r.CSSSelectors.hiddenTip),void i.classList.add(r.CSSSelectors.hiddenTip);n.classList.remove(r.CSSSelectors.hiddenTip),o.classList.add(r.CSSSelectors.hiddenTip),i.classList.remove(r.CSSSelectors.hiddenTip)},t.changePosition=({min:e,max:t,isVertical:n,from:r,to:o,isRange:s},{tipBoth:a,tipFrom:l,tipTo:c})=>{const d=c,u=i.helpers.calculatePercent(o,e,t),p=n?`top: ${u}%;`:`left: ${u}%;`;if(d.style.cssText=p,!s)return;const h=l,m=a,f=i.helpers.calculatePercent(r,e,t),g=n?`top: ${f}%;`:`left: ${f}%;`,S=n?`top: ${(f+u)/2}%;`:`left: ${(f+u)/2}%;`;h.style.cssText=g,m.style.cssText=S},t.destroy=({tipLine:e})=>{e.remove()},t.changeText=({from:e,to:t,isRange:n},{tipFrom:i,tipTo:r,tipBoth:o},s)=>{if(r.innerText=s.to,!n)return;const a=i,l=o,c=e===t?s.to:`${s.from} - ${s.to}`;a.innerText=s.from,l.innerText=c}},8195:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bar=t.Tip=t.Scale=t.Runner=t.Range=void 0;const i=n(512);Object.defineProperty(t,"Range",{enumerable:!0,get:function(){return i.Range}});const r=n(4546);Object.defineProperty(t,"Runner",{enumerable:!0,get:function(){return r.Runner}});const o=n(6561);Object.defineProperty(t,"Scale",{enumerable:!0,get:function(){return o.Scale}});const s=n(8875);Object.defineProperty(t,"Tip",{enumerable:!0,get:function(){return s.Tip}});const a=n(9098);Object.defineProperty(t,"Bar",{enumerable:!0,get:function(){return a.Bar}})},2620:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Presenter=t.View=t.Model=void 0;const i=n(5020);Object.defineProperty(t,"Model",{enumerable:!0,get:function(){return i.Model}});const r=n(5341);Object.defineProperty(t,"View",{enumerable:!0,get:function(){return r.View}});const o=n(7867);Object.defineProperty(t,"Presenter",{enumerable:!0,get:function(){return o.Presenter}})},3089:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultOptions=void 0;const n={isRange:!0,isVertical:!1,hasTip:!0,hasScale:!0,step:10,min:0,max:100,from:40,to:70,format:e=>String(e)};t.defaultOptions=n},5995:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0,t.EventEmitter=class{constructor(){this.events={}}subscribe(e,t){const n=this.events[e];this.events[e]=void 0===n?[t]:[...n,t]}unsubscribe(e,t){var n;this.events[e]=null===(n=this.events[e])||void 0===n?void 0:n.filter((e=>t!==e))}emit(e,t){var n;null===(n=this.events[e])||void 0===n||n.forEach((e=>e(t)))}}},3012:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calculatePercent=void 0,t.calculatePercent=(e,t,n)=>(e-t)/(n-t)*100},1109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=void 0,t.createElement=e=>{const t=document.createElement("div");return t.classList.add(e),t}},7212:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getPosition=void 0,t.getPosition=(e,t)=>{const{height:n,width:i,left:r,top:o}=e.getBoundingClientRect(),{clientX:s,clientY:a}=t;return{x:(s-r)/i,y:(a-o)/n}}},1868:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.helpers=void 0;const i=n(1109),r=n(7212),o=n(3012),s={createElement:i.createElement,getPosition:r.getPosition,calculatePercent:o.calculatePercent};t.helpers=s},6043:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(833);Object.defineProperty(t,"App",{enumerable:!0,get:function(){return i.App}}),$.fn.slider=function(e){return this.map(((t,n)=>new i.App(n,e)))}},2095:e=>{e.exports=JSON.parse('[{"isRange":true,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-100,"max":100,"from":-50,"to":40},{"isRange":true,"isVertical":true,"hasTip":true,"hasScale":true,"step":10,"min":100,"max":200,"from":100,"to":150},{"isRange":false,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-100,"max":100,"from":-50,"to":40},{"isRange":true,"isVertical":false,"hasTip":true,"hasScale":true,"step":10,"min":-1000,"max":100000,"from":-50,"to":4000}]')}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(3509)})();