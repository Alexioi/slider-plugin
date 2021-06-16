import EventEmitter from "event-emitter";

class Model {

  update(options) {
    let { 
      isRange,
      isVertical, 
      step,
      min,
      max,  
      from, 
      to,
    } = options;

    const defaultOptions = {
      isRange: false,
      isVertical: false,
      step: 1,
      min: 0,
      max: 100,
      from: 40,
      to: 70,
    };

    if (typeof this.options === "undefined") {
      this.options = defaultOptions;
    }

    if (typeof isRange === "boolean") {
      this.options.isRange = isRange;
    }

    if (typeof isVertical === "boolean") {
      this.options.isVertical = isVertical;
    }

    if (typeof step === "number") {
      this.options.step = step;
    }

    if (typeof min === "number") {
      this.options.min = min;
    }

    if (typeof max === "number") {
      this.options.max = max;
    }

    if (typeof from === "number") {
      this.options.from = from;
    }

    if (typeof to === "number") {
      this.options.to = to;
    }

    this.emit("updateModel", this.options);
  }
}

EventEmitter(Model.prototype);

export default Model;
