import Model from "./model";
import View from "./view";

import EventEmitter from "event-emitter";

class Presenter {
  constructor(element, options) {
    this.element = element;
    this.options = options;

    this._initMVP();
    this._init();
  }

  changeSetting(newSetting) {
    let settings = this.model.getSettings();

    this.model.changeSetting(settings, newSetting);

    settings = this.model.getSettings();

    this.changeVisible(settings);

    this.model.emit("test");
  }

  changeVisible(settings) {
    if (settings.isRange) {
      this.view.displayFromDots();
    } else {
      this.view.hideFromDots();
    }
  }

  _initMVP() {
    this.view = new View(this.element);
    this.model = new Model(this.element, this.options);
  }

  _init() {
    let settings = this.model.getSettings();

    this.view.drawSlider();
    this.changeVisible(settings);
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
