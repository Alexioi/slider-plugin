import EventEmitter from "event-emitter";

class Model {
  constructor(element) {
    this.element = element;

    this._addEventEmitters();
  }

  _addEventEmitters() {
    this.on("setOptions", (options) => this._setOptions(options));
  }

  _setOptions(options) {
    let { isRange } = options;

    const defaultOptions = {
      isRange: false,
    };

    if (typeof this.options === "undefined") {
      this.options = defaultOptions;
    }

    if (typeof isRange === "boolean") {
      this.options.isRange = isRange;
    }

    this.emit("setModelOptions", this.options);
  }
}

EventEmitter(Model.prototype);

export default Model;
