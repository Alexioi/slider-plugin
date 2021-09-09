(() => {
  const e = { 497: (e, t, n) => {
    n.d(t, { Z: () => a }); const r = n(645); const i = n.n(r)()(((e) => e[1])); i.push([e.id, 'body{height:100%}.container{max-width:1000px;margin:auto;margin-top:50px}', '']); const a = i;
  },
  61: (e, t, n) => {
    n.d(t, { Z: () => a }); const r = n(645); const i = n.n(r)()(((e) => e[1])); i.push([e.id, '.panel{display:flex}.panel__example{flex-grow:1;height:400px;background-color:#fff;border:2px solid gray;padding:10px;border-top-right-radius:4px;border-bottom-right-radius:4px;background-color:#deb887}.panel__control{display:flex;flex-direction:column;background-color:#fff;border:2px solid gray;padding:10px;display:flex;flex-wrap:wrap;gap:20px;border-top-left-radius:4px;border-bottom-left-radius:4px;background-color:#deb887}.panel__label{display:flex;flex-direction:column}.panel__input{width:100%;max-width:100px}', '']); const a = i;
  },
  645: (e) => {
    e.exports = function (e) { const t = []; return t.toString = function () { return this.map(((t) => { const n = e(t); return t[2] ? '@media '.concat(t[2], ' {').concat(n, '}') : n; })).join(''); }, t.i = function (e, n, r) { typeof e === 'string' && (e = [[null, e, '']]); const i = {}; if (r) for (let a = 0; a < this.length; a++) { const s = this[a][0]; s != null && (i[s] = !0); } for (let o = 0; o < e.length; o++) { const c = [].concat(e[o]); r && i[c[0]] || (n && (c[2] ? c[2] = ''.concat(n, ' and ').concat(c[2]) : c[2] = n), t.push(c)); } }, t; };
  },
  379: (e, t, n) => {
    let r; const i = (function () { const e = {}; return function (t) { if (void 0 === e[t]) { let n = document.querySelector(t); if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try { n = n.contentDocument.head; } catch (e) { n = null; }e[t] = n; } return e[t]; }; }()); const a = []; function s(e) { for (var t = -1, n = 0; n < a.length; n++) if (a[n].identifier === e) { t = n; break; } return t; } function o(e, t) { for (var n = {}, r = [], i = 0; i < e.length; i++) { const o = e[i]; const c = t.base ? o[0] + t.base : o[0]; const l = n[c] || 0; const h = ''.concat(c, ' ').concat(l); n[c] = l + 1; const d = s(h); const u = { css: o[1], media: o[2], sourceMap: o[3] }; d !== -1 ? (a[d].references++, a[d].updater(u)) : a.push({ identifier: h, updater: v(u, t), references: 1 }), r.push(h); } return r; } function c(e) { const t = document.createElement('style'); const r = e.attributes || {}; if (void 0 === r.nonce) { const a = n.nc; a && (r.nonce = a); } if (Object.keys(r).forEach(((e) => { t.setAttribute(e, r[e]); })), typeof e.insert === 'function')e.insert(t); else { const s = i(e.insert || 'head'); if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."); s.appendChild(t); } return t; } let l; const h = (l = [], function (e, t) { return l[e] = t, l.filter(Boolean).join('\n'); }); function d(e, t, n, r) { const i = n ? '' : r.media ? '@media '.concat(r.media, ' {').concat(r.css, '}') : r.css; if (e.styleSheet)e.styleSheet.cssText = h(t, i); else { const a = document.createTextNode(i); const s = e.childNodes; s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(a, s[t]) : e.appendChild(a); } } function u(e, t, n) { let r = n.css; const i = n.media; const a = n.sourceMap; if (i ? e.setAttribute('media', i) : e.removeAttribute('media'), a && typeof btoa !== 'undefined' && (r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), ' */')), e.styleSheet)e.styleSheet.cssText = r; else { for (;e.firstChild;)e.removeChild(e.firstChild); e.appendChild(document.createTextNode(r)); } } let p = null; let f = 0; function v(e, t) { let n; let r; let i; if (t.singleton) { const a = f++; n = p || (p = c(t)), r = d.bind(null, n, a, !1), i = d.bind(null, n, a, !0); } else n = c(t), r = u.bind(null, n, t), i = function () { !(function (e) { if (e.parentNode === null) return !1; e.parentNode.removeChild(e); }(n)); }; return r(e), function (t) { if (t) { if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return; r(e = t); } else i(); }; }e.exports = function (e, t) { (t = t || {}).singleton || typeof t.singleton === 'boolean' || (t.singleton = (void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r)); let n = o(e = e || [], t); return function (e) { if (e = e || [], Object.prototype.toString.call(e) === '[object Array]') { for (let r = 0; r < n.length; r++) { const i = s(n[r]); a[i].references--; } for (var c = o(e, t), l = 0; l < n.length; l++) { const h = s(n[l]); a[h].references === 0 && (a[h].updater(), a.splice(h, 1)); }n = c; } }; };
  },
  388: () => {
    class e {
      constructor(e, t) { this.control = e, this.slider = t, this.range = this.control.querySelector('.panel__range-checkbox'), this.vertical = this.control.querySelector('.panel__vertical-checkbox'), this.min = this.control.querySelector('.panel__min-checkbox'), this.max = this.control.querySelector('.panel__max-checkbox'), this.from = this.control.querySelector('.panel__from-checkbox'), this.to = this.control.querySelector('.panel__to-checkbox'), this.step = this.control.querySelector('.panel__step-checkbox'), this.tip = this.control.querySelector('.panel__tip-checkbox'), this.numberMarks = this.control.querySelector('.panel__number-marks-checkbox'), this.addEventHandler(), this.verifyInput(); }

      addEventHandler() { this.range.addEventListener('click', (() => this.changeRange())), this.vertical.addEventListener('click', (() => this.changeVertical())), this.tip.addEventListener('click', (() => this.changeTip())), this.min.addEventListener('change', (() => this.changeMin())), this.max.addEventListener('change', (() => this.changeMax())), this.from.addEventListener('change', (() => this.changeFrom())), this.to.addEventListener('change', (() => this.changeTo())), this.step.addEventListener('change', (() => this.changeStep())), this.numberMarks.addEventListener('change', (() => this.changeNumberMarks())); }

      changeRange() { this.range.checked ? this.slider.updateOptions({ isRange: !0 }) : this.slider.updateOptions({ isRange: !1 }), this.verifyInput(); }

      changeTip() { this.tip.checked ? this.slider.updateOptions({ hasTip: !0 }) : this.slider.updateOptions({ hasTip: !1 }), this.verifyInput(); }

      changeNumberMarks() { const e = Number(this.numberMarks.value); this.slider.updateOptions({ numberMarks: e }), this.verifyInput(); }

      changeVertical() { this.vertical.checked ? this.slider.updateOptions({ isVertical: !0 }) : this.slider.updateOptions({ isVertical: !1 }), this.verifyInput(); }

      changeMin() { const e = Number(this.min.value); this.slider.updateOptions({ min: e }), this.verifyInput(); }

      changeMax() { const e = Number(this.max.value); this.slider.updateOptions({ max: e }), this.verifyInput(); }

      changeFrom() { const e = Number(this.from.value); this.slider.updateOptions({ from: e }), this.verifyInput(); }

      changeTo() { const e = Number(this.to.value); this.slider.updateOptions({ to: e }), this.verifyInput(); }

      changeStep() { const e = Number(this.step.value); this.slider.updateOptions({ step: e }), this.verifyInput(); }

      verifyInput() { const e = this.slider.getOptions(); this.range.checked = e.isRange, this.vertical.checked = e.isVertical, this.min.value = e.min, this.max.value = e.max, this.from.value = e.from, this.to.value = e.to, this.step.value = e.step, this.tip.checked = e.hasTip, this.numberMarks.value = e.numberMarks; }
    } const t = $('.panel__example').slider(); document.querySelectorAll('.panel__control').forEach(((n, r) => { new e(n, t[r]); }));
  } }; const t = {}; function n(r) { const i = t[r]; if (void 0 !== i) return i.exports; const a = t[r] = { id: r, exports: {} }; return e[r](a, a.exports, n), a.exports; }n.n = (e) => { const t = e && e.__esModule ? () => e.default : () => e; return n.d(t, { a: t }), t; }, n.d = (e, t) => { for (const r in t)n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] }); }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
    n(388); const e = n(379); const t = n.n(e); const r = n(497); t()(r.Z, { insert: 'head', singleton: !1 }), r.Z.locals; const i = n(61); t()(i.Z, { insert: 'head', singleton: !1 }), i.Z.locals;
  })();
})();
