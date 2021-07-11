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
    isRange = this.verifyRange(isRange);
    isVertical = this.verifyVertical(isVertical);
    hasTip = this.verifyTip(hasTip);
    numberMarks = this.verifyNumberMarks(numberMarks);
    min = this.verifyMin(min);
    max = this.verifyMax(min, max);
    from = this.verifyFrom(from, min, max, isRange);
    to = this.verifyTo(to, from, max);
    step = this.verifyStep(step, min, max);

    this.updateExistOptions({
      isRange,
      isVertical,
      hasTip,
      numberMarks,
      step,
      min,
      max,
      from,
      to,
    });

    this.emit("updateModelOptions", this.options);
  }

  private updateExistOptions(options: IOptions) {
    for (let key in this.options) {
      this.options[key] = options[key];
    }
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

  private verifyMin(newMin: number | undefined): number {
    const { min } = this.options;

    if (typeof newMin === "undefined") {
      return min;
    }

    if (typeof newMin !== "number") {
      throw new Error("min is not number");
    }

    return newMin;
  }

  private verifyMax(min: number, newMax: number | undefined): number {
    const { max } = this.options;

    if (typeof newMax === "undefined") {
      newMax = max;
    }

    if (typeof newMax !== "number") {
      throw new Error("max is not number");
    }

    if (newMax > min) {
      return newMax;
    }

    console.warn("max < min");
    if (min > 0) {
      return min * 2;
    }

    return min / 2;
  }

  private verifyFrom(
    newFrom: number | undefined,
    min: number,
    max: number,
    newIsRange: boolean
  ): number {
    const { from, isRange } = this.options;

    if (typeof newFrom === "undefined") {
      newFrom = from;
    }

    if (typeof newFrom !== "number") {
      throw new Error("from is not number");
    }

    if (!newIsRange) {
      return min;
    }

    if (newFrom > min && newFrom < max) {
      return newFrom;
    }

    console.warn("from < min || from > max");
    return min;
  }

  private verifyTo(
    newTo: number | undefined,
    from: number,
    max: number
  ): number {
    const { to } = this.options;

    if (typeof newTo === "undefined") {
      newTo = to;
    }

    if (typeof newTo !== "number") {
      throw new Error("to is not number");
    }

    if (newTo > from && newTo < max) {
      return newTo;
    }

    console.warn("to < min || to > max");
    return max;
  }

  private verifyStep(
    newStep: number | undefined,
    min: number,
    max: number
  ): number {
    const { step } = this.options;

    if (typeof newStep === "undefined") {
      newStep = step;
    }

    if (typeof newStep !== "number") {
      throw new Error("step is not number");
    }

    if (newStep < 0) {
      return 0;
    }

    if (newStep < Math.abs(max - min)) {
      return newStep;
    }

    console.warn("step > max");
    return Math.abs(max - min);
  }

  private verifyRange(newIsRange: boolean | undefined): boolean {
    const { isRange } = this.options;

    if (typeof newIsRange === "undefined") {
      newIsRange = isRange;
    }

    if (typeof newIsRange !== "boolean") {
      throw new Error("isRange is not boolean");
    }

    return newIsRange;
  }

  private verifyVertical(newIsVertical: boolean | undefined): boolean {
    const { isVertical } = this.options;

    if (typeof newIsVertical === "undefined") {
      newIsVertical = isVertical;
    }

    if (typeof newIsVertical !== "boolean") {
      throw new Error("isVertical is not boolean");
    }

    return newIsVertical;
  }

  private verifyTip(newHasTip: boolean | undefined): boolean {
    const { hasTip } = this.options;

    if (typeof newHasTip === "undefined") {
      newHasTip = hasTip;
    }

    if (typeof newHasTip !== "boolean") {
      throw new Error("hasTip is not boolean");
    }

    return newHasTip;
  }

  private verifyNumberMarks(newNumberMarks: number | undefined): number {
    const { numberMarks } = this.options;

    if (typeof newNumberMarks === "undefined") {
      newNumberMarks = numberMarks;
    }

    if (typeof newNumberMarks !== "number") {
      throw new Error("numberMarks is not number");
    }

    if (newNumberMarks > 1) {
      return newNumberMarks;
    }

    console.warn("numberMarks = 0");
    return 0;
  }
}

EventEmitter(Model.prototype);

export { Model, IModel };
