import EventEmitter from "event-emitter";

class Model {
  updateOptions(options) {
    let { isRange, isVertical, step, min, max, from, to } = options;

    const defaultOptions = {
      isRange: false,
      isVertical: false,
      hasTip: false,
      hasScale: false,
      numberMarks: 10,
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

    if (typeof hasTip === "boolean") {
      this.options.hasTip = isVertical;
    }

    if (typeof numberMarks === "number") {
      this.options.numberMarks = step;
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

  changePositionDependingPercentage(clickRate) {
    let rate = 0;

    this.options.isVertical ? (rate = clickRate.y) : (rate = clickRate.x);

    let newPosition = this.options.max * rate;
    let newPositionTO = this.options.to - newPosition;
    let newPositionFrom = newPosition - this.options.from;

    if (this.options.isRange) {
      newPositionTO < newPositionFrom
        ? (this.options.to = newPosition)
        : (this.options.from = newPosition);
    } else {
      this.options.from = newPosition / 2;
      this.options.to = newPosition;
    }

    this.verifyCounter()

    this.emit("updateModel", this.options);
  }

  verifyCounter(){
    if (this.options.from < this.options.min) {
      this.options.from = this.options.min
    }

    if (this.options.to < this.options.min) {
      this.options.to = this.options.min
    }

    if (this.options.from > this.options.max) {
      this.options.from = this.options.max
    }

    if (this.options.to > this.options.max) {
      this.options.to = this.options.max
    }
  }
}

EventEmitter(Model.prototype);

export default Model;
