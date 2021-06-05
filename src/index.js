import "./style.scss";

import Presenter from "./mvp/presenter";

class Slider {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this._init();
  }

  _init() {
    this.presenter = new Presenter(this.element, this.options);
  }
}

$.fn.slider = function initSlider(options) {
  new Slider(this, options);
};
