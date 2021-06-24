import EventEmitter from "event-emitter";

import {IOptions} from "../interfaces/interfaces"

interface ClickRate {
  x: number;
  y: number;
}

class Model {
  options: IOptions;
  emit: any;
  
  constructor(options: IOptions) {
    this.options = options;
  }

  updateOptions({ isRange, isVertical,  hasTip, numberMarks, step, min, max, from, to }: IOptions) {

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

  changePositionDependingPercentage(clickRate: ClickRate): void {
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
