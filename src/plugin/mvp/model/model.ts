import EventEmitter from "event-emitter";

import { IOptions, IClickRate } from "../interfaces/interfaces";

interface IModel {
  options: IOptions;

  updateOptions(options: IOptions): void;
  updateValue(clickRate: IClickRate): void;
  updateNearValue(value: number): void;
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

    let percentageOfMaximum: number,
      newValue: number,
      oldValue: number,
      validTo: number,
      validFrom: number,
      validValue: number,
      isTo: boolean,
      isValidValue: boolean;

    percentageOfMaximum = isVertical ? y : x;
    newValue = (max - min) * percentageOfMaximum + min;
    isTo = valueName === "to";
    oldValue = isTo ? to : from;
    validFrom = this.checkFrom(newValue);
    validTo = this.checkTo(newValue);
    validValue = isTo ? validTo : validFrom;
    isValidValue = newValue === validValue;

    if (isValidValue) {
      newValue = this.calculateValueDependingOnStep(oldValue, newValue);
      newValue = isTo ? this.checkTo(newValue) : this.checkFrom(newValue);
    }

    if (!isValidValue) {
      newValue = validValue;
    }

    if (newValue !== this.options[valueName]) {
      this.options[valueName] = newValue;
      this.emit("updateModelValues", this.options);
    }
  }

  public updateNearValue(value: number) {
    const {from, to} = this.options

    let diffFrom = Math.abs(Math.abs(from) - Math.abs(value))
    let diffTo = Math.abs(Math.abs(to) - Math.abs(value))

    if (diffFrom < diffTo) {
      this.options.from = value
    }

    if ( diffTo <= diffFrom) {
      this.options.to = value
    }

    this.emit("updateModelValues", this.options);
  }

  private calculateValueDependingOnStep(
    value: number,
    newValue: number
  ): number {
    const { step } = this.options;
    let x: number, differenceValue: number;

    if (step === 0) {
      return newValue;
    }

    differenceValue = newValue - value;

    x = Math.abs(differenceValue) - (Math.abs(differenceValue) % step);

    if (Math.abs(differenceValue) > step / 2) {
      x = x + step;
    }

    if (differenceValue > 0) {
      return value + x;
    }

    if (differenceValue < 0) {
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

  private isTypeNumberOrUndefined(
    newValue: number | undefined,
    value: number
  ): number | never {
    if (typeof newValue === "undefined") {
      newValue = value;
    }

    if (typeof newValue !== "number") {
      throw new Error("Value is not number");
    }

    return newValue;
  }

  private verifyMin(newMin: number | undefined): number {
    const { min } = this.options;

    return this.isTypeNumberOrUndefined(newMin, min);
  }

  private verifyMax(min: number, newMax: number | undefined): number {
    const { max } = this.options;

    newMax = this.isTypeNumberOrUndefined(newMax, max);

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
    const { from } = this.options;

    newFrom = this.isTypeNumberOrUndefined(newFrom, from);

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

    newTo = this.isTypeNumberOrUndefined(newTo, to);

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

    newStep = this.isTypeNumberOrUndefined(newStep, step);

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

    newNumberMarks = this.isTypeNumberOrUndefined(newNumberMarks, numberMarks);

    if (newNumberMarks > 1) {
      return newNumberMarks;
    }

    console.warn("numberMarks = 0");
    return 0;
  }
}

EventEmitter(Model.prototype);

export { Model, IModel };
