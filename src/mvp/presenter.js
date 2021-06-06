import Model from "./model";
import View from "./view";

class Presenter {
  constructor(element, options) {
    this.element = element;
    this.options = options;

    this._initMVP();
    this._init();
  }

  _initMVP() {
    this.view = new View(this.element);
    this.model = new Model(this.options);
  }

  _init() {
    let isRange = this.model.options.isRange;
    this.view.drawElement(isRange);
  }
}

export default Presenter;
