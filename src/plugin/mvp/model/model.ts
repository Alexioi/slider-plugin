import EventEmitter from "event-emitter";

import { IOptions, IClickRate } from "../interfaces/interfaces";

interface IModel {
  options: IOptions;

  updateOptions(options: IOptions): void;
  updateValue(clickRate: IClickRate): void;
  getOptions(): IOptions;

  emit?: any;
  on?: any;
}

class Model implements IModel {
  options: IOptions;
  emit: any;

  constructor(options: IOptions) {
    this.options = options;
  }

  public updateOptions({
    isRange,
    isVertical,
    hasTip,
    numberMarks,
    step,
    min,
    max,
    from,
    to,
  }: IOptions) {

    if (typeof from !== "undefined") { 
      from = this.verifyFrom(from);
    }

    if (typeof to !== "undefined") { 
      to = this.verifyTo(to);
    }

    if (typeof isRange === "boolean") {
      this.calculateFrom(isRange);
      
      this.options.isRange = isRange;
    }

    if (typeof isVertical === "boolean") {
      this.options.isVertical = isVertical;
    }

    if (typeof hasTip === "boolean") {
      this.options.hasTip = hasTip;
    }

    if (typeof numberMarks === "number") {
      this.options.numberMarks = numberMarks;
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

    if (typeof to === "number") {
      this.options.to = to;
    }

    if (typeof from === "number") {
      this.options.from = from;
    }

    this.verifyMax();
    
    this.emit("updateModelOptions", this.options);
  }

  public getOptions() {
    return this.options;
  }

  public updateValue({ x, y, valueName }: IClickRate) {

    let {isVertical, from, to, min, max } = this.options

    let percentageOfMaximum: number;

    isVertical ? (percentageOfMaximum = y) : (percentageOfMaximum = x);

    let newValue: number;

    newValue = (max - min) * percentageOfMaximum + min;

    if (valueName === "from") {

      newValue = this.checkValueComplianceWithStep(
        from,
        newValue
      );

      newValue = this.verifyFrom(newValue);
    
      if (newValue !== from) {
        this.options.from = newValue
        this.emit("updateModelValues", this.options);
      }
    }

    if (valueName === "to") {

      newValue = this.checkValueComplianceWithStep(
        to,
        newValue
      );

      newValue = this.verifyTo(newValue);

      if (newValue !== to) {
        this.options.to = newValue
        this.emit("updateModelValues", this.options);
      }
    }
  }

  public updateNearValue() {}

  private checkValueComplianceWithStep(
    value: number,
    oldValue: number
  ): number {
    if (oldValue < this.options.min) {
      oldValue = this.options.min;
    } else if (oldValue > this.options.max) {
      oldValue = this.options.max;

    } 
    else if (Math.abs(oldValue - value) > this.options.step / 2) {
      oldValue =
        oldValue - value > 0
          ? value + this.options.step
          : value - this.options.step;
    } else {
      oldValue = value;
    }

    return oldValue;
  }

  private verifyMax(): void {
    if (this.options.max < this.options.min) {
      this.options.max = this.options.min * 2;
    }
  }

  private verifyFrom(from: number): number {
    const {to, min, max} = this.options

    if (from > to) {
      return from = to;
    }

    if (from < min) {
      return from = min;
    }

    if (from > max) {
      return from = max;
    }

    return from
  }

  private verifyTo(to: number): number {
    const {from, min, max} = this.options

    if (to < from) {
      return to = from;
    }

    if (to < min) {
      return to = min;
    }

    if (to > max) {
      return to = max;
    }
    
    return to
  }

  private calculateFrom(isRange: boolean) {
    if (isRange !== this.options.isRange) {
      this.options.from = this.options.to / 2;
    } 

    if (!isRange) {
      this.options.from = this.options.min;
    }
  }
}

EventEmitter(Model.prototype);

export {Model, IModel};
