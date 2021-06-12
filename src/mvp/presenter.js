import Model from "./model";
import View from "./view";

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

    let isRange = this.model.getSettings().isRange;

    this.view.toggleFromDots(isRange);
  }

  _initMVP() {
    this.view = new View(this.element);
    this.model = new Model(this.element, this.options);
  }

  _init() {
    let isRange = this.model.getSettings().isRange;

    this.view.drawSlider(isRange);
  }
}

export default Presenter;
