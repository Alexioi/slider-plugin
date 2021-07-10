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
    const { isVertical, from, to, min, max } = this.options;

    let percentageOfMaximum: number;

    isVertical ? (percentageOfMaximum = y) : (percentageOfMaximum = x);

    let newValue: number;

    newValue = (max - min) * percentageOfMaximum + min;

    if (valueName === "from" && newValue !== from) {
      if (newValue === this.checkFrom(newValue)) {
        newValue = this.calculateValueDependingOnStep(from, newValue);
      }

      newValue = this.checkFrom(newValue);

      this.options.from = newValue;
      this.emit("updateModelValues", this.options);
    }

    if (valueName === "to" && newValue !== to) {
      if (newValue === this.checkTo(newValue)) {
        newValue = this.calculateValueDependingOnStep(to, newValue);
      }

      newValue = this.checkTo(newValue);

      this.options.to = newValue;
      this.emit("updateModelValues", this.options);
    }
  }

  public updateNearValue() {}

  private calculateValueDependingOnStep(
    value: number,
    newValue: number
  ): number {
    const { step } = this.options;
    let x: number;

    x = Math.abs(newValue - value) - (Math.abs(newValue - value) % step);

    if (Math.abs(newValue - value) > step / 2) {
      x = x + step;
    }

    if (newValue - value > 0) {
      return value + x;
    }

    if (newValue - value < 0) {
      return value - x;
    }

    return newValue;
  }

  private checkFrom(from: number): number {
    const { to, min } = this.options;

    if (from > to) {
      return to;
    }

    if (from < min) {
      return min;
    }

    return from;
  }

  private checkTo(to: number): number {
    const { from, max } = this.options;

    if (to < from) {
      return from;
    }

    if (to > max) {
      return max;
    }

    return to;
  }

  private verifyMax(): void {
    if (this.options.max < this.options.min) {
      this.options.max = this.options.min * 2;
    }
  }

  private verifyFrom(from: number): number {
    const { to, min } = this.options;

    if (from > to) {
      return (from = to);
    }

    if (from < min) {
      return (from = min);
    }

    return from;
  }

  private verifyTo(to: number): number {
    const { from, max } = this.options;

    if (to < from) {
      return (to = from);
    }

    if (to > max) {
      return (to = max);
    }

    return to;
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

export { Model, IModel };
