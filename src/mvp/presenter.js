import Model from "./model";
import View from "./view";

import EventEmitter from "event-emitter";

class Presenter {
  constructor(element, options) {
    this.element = element;
    this.options = options;

    this._initMVP();
    this._addEventEmitters();
    this._init();
  }

  _addEventEmitters() {
    this.model.on("changeOption", (options) => this.changeOptions(options));
    this.model.on("setModelOptions", (options) =>
      this.view.emit("drawSlider", options)
    );
  }

  changeOptions(options) {
    this.model.emit("setOptions", options);
  }

  _init() {
    this.changeOptions(this.options);
  }

  _initMVP() {
    this.view = new View(this.element);
    this.model = new Model(this.element, this.options);
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
