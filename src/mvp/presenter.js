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

    settings = this.model.getSettings();

    this.changeVisible(settings);
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

export default Presenter;
