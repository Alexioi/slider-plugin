class Model {
  constructor(element, options) {
    this.options = options;
    this.element = element;

    this._init();
  }

  _init() {
    const defaultSettings = {
      isRange: false,
      min: 0,
      max: 100,
      step: 1,
      isVertical: false,
    };

    for (let defaultSetting in defaultSettings) {
      this.element.data(defaultSetting, defaultSettings[defaultSetting]);
    }

    this.changeSetting(defaultSettings, this.options);
  }

  changeSetting(settings, newSettings) {
    for (let setting in settings) {
      if (newSettings[setting] !== undefined) {
        this.element.data(setting, newSettings[setting]);
      }
    }
  }

  getSettings() {
    return this.element.data();
  }
}

export default Model;
