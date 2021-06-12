(()=>{"use strict";var e={413:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(645),r=n.n(i)()((function(e){return e[1]}));r.push([e.id,".slider{width:100%;display:flex;height:8px;background:#fff;border:1px solid rgba(31,32,65,.25);border-radius:3px;box-sizing:border-box}.slider__line{display:flex;border-radius:3px;background:linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);box-sizing:border-box;flex-shrink:0}.slider__dot{transform:translateY(-4px);display:block;height:14px;width:14px;background:linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);border:2px solid #fff;border-radius:10px;box-sizing:border-box;cursor:grab}.slider__dot_align-right{margin-left:auto}",""]);const o=r},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(r[s]=!0)}for(var a=0;a<e.length;a++){var d=[].concat(e[a]);i&&r[d[0]]||(n&&(d[2]?d[2]="".concat(n," and ").concat(d[2]):d[2]=n),t.push(d))}},t}},379:(e,t,n)=>{var i,r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),o=[];function s(e){for(var t=-1,n=0;n<o.length;n++)if(o[n].identifier===e){t=n;break}return t}function a(e,t){for(var n={},i=[],r=0;r<e.length;r++){var a=e[r],d=t.base?a[0]+t.base:a[0],l=n[d]||0,c="".concat(d," ").concat(l);n[d]=l+1;var u=s(c),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(o[u].references++,o[u].updater(f)):o.push({identifier:c,updater:v(f,t),references:1}),i.push(c)}return i}function d(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var s=r(e.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(t)}return t}var l,c=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function u(e,t,n,i){var r=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=c(t,r);else{var o=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}function f(e,t,n){var i=n.css,r=n.media,o=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var p=null,h=0;function v(e,t){var n,i,r;if(t.singleton){var o=h++;n=p||(p=d(t)),i=u.bind(null,n,o,!1),r=u.bind(null,n,o,!0)}else n=d(t),i=f.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i));var n=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var r=s(n[i]);o[r].references--}for(var d=a(e,t),l=0;l<n.length;l++){var c=s(n[l]);0===o[c].references&&(o[c].updater(),o.splice(c,1))}n=d}}}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={id:i,exports:{}};return e[i](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(379),t=n.n(e),i=n(413);t()(i.Z,{insert:"head",singleton:!1}),i.Z.locals;$.fn.slider=function(e){return new class{constructor(e,t){this.element=e,this.options=t,this._initMVP(),this._init()}changeSetting(){console.log("test11")}_initMVP(){this.view=new class{constructor(e){this.element=e}drawSlider(){this.element.append("<div class='slider'></div>")}drawLine(){this.element.find(".slider").append("<div class='slider__line'></div>")}drawDots(e){const t="<div class='slider__dot'></div>";this.element.find(".slider").append(t),e&&this.element.find(".slider").prepend(t)}clearSlider(){this.element.find(".slider").empty()}}(this.element),this.model=new class{constructor(e){this.options=e,this._init()}_init(){let{isRange:e=!1,test:t="test"}=this.options||{};this.options.isRange=e,this.options.test=t}}(this.options)}_init(){this.view.drawSlider();let e=this.model.options.isRange;this.view.drawLine(),this.view.drawDots(e)}}(this,e)}})()})();