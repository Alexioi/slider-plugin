class Model {
  constructor(element, options) {
    this.options = options;
    this.element = element;

    this._init();
  }

  _init() {
    const defaultSettings = {
      isRange: false,
    };

    this.changeSetting(defaultSettings, this.options);
  }

  changeSetting(settings, newSettings) {
    for (let setting in settings) {
      if (newSettings[setting] === undefined) {
        this.element.data(setting, settings[setting]);
      } else {
        this.element.data(setting, newSettings[setting]);
      }
    }
  }

  getSettings() {
    return this.element.data();
  }
}

export default Model;
