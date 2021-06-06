class Model {
  constructor(options) {
    this.options = options;

    this._init();
  }

  _init() {
    let { isRange = false, test = "test" } = this.options || {};

    this.options.isRange = isRange;
    this.options.test = test;
  }
}

export default Model;
