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

  public updateValue({ x, y, valueName }: IClickRate): void {

    let {isVertical, from, to, min, max } = this.options

    let percentageOfMaximum: number;

    isVertical ? (percentageOfMaximum = y) : (percentageOfMaximum = x);

    let newValue: number;

    newValue = (max - min) * percentageOfMaximum + min;

    newValue = this.checkValueComplianceWithStep(
      valueName,
      newValue
    );

    if (valueName === "from" && newValue !== from) {
      this.options.from = newValue
      this.emit("updateModelValues", this.options);
    }

    if (valueName === "to" && newValue !== to) {
      this.options.to = newValue
      this.emit("updateModelValues", this.options);
    }
  }

  public updateNearValue() {}

  private checkValueComplianceWithStep(
    valueName: string | undefined,
    newValue: number
  ): number {
    const {min, max, from, to, step} = this.options

    let value: number

    value = valueName === 'to' ? to : from;

    if (valueName === 'to') {
      value = to

      if (newValue < from) {
        newValue = from;
  
        return newValue
      } 
    } 

    if (valueName === 'from') {
      value = from

      if (newValue > to) {
        newValue = to;
  
        return newValue
      } 
    }

    if (newValue < min) {
      newValue = min;

      return newValue
    } 

    if (newValue > max) {
      newValue = max;

      return newValue
    } 

    if (Math.abs(newValue - value) > step / 2) {
      newValue =
        newValue - value > 0
          ? value + step
          : value - step;

      return newValue
    } 

    return newValue = value;
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
