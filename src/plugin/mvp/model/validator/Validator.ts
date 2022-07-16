import { IConfig, IOptions } from '../../../types/types';

class Validator {
  private options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
  }

  public validateOptions(config: IConfig) {
    const { isRange, isVertical, hasTip, hasScale, step, min, max, values } = config;

    if (typeof isRange === 'boolean') {
      this.options.isRange = isRange;
    }

    if (typeof isVertical === 'boolean') {
      this.options.isVertical = isVertical;
    }

    if (typeof hasTip === 'boolean') {
      this.options.hasTip = hasTip;
    }

    if (typeof hasScale === 'boolean') {
      this.options.hasScale = hasScale;
    }

    this.verifyMinAndMax(min, max);
    this.verifyFromAndTo(values);
    this.verifyStep(step);
  }

  private verifyMinAndMax(firstValue?: number, secondValue?: number): void {
    const { min, max } = this.options;

    const intFirstValue = Validator.makeNumber(min, firstValue);
    const intSecondValue = Validator.makeNumber(max, secondValue);

    if (intFirstValue === intSecondValue) {
      return;
    }

    if (intFirstValue < intSecondValue) {
      this.options.min = intFirstValue;
      this.options.max = intSecondValue;
      return;
    }

    this.options.min = intSecondValue;
    this.options.max = intFirstValue;
  }

  private verifyFromAndTo(newValues?: number[]): void {
    const { min, max, values } = this.options;

    const intFirstValue = Validator.makeNumber(values[0], newValues?.[0]);
    const intSecondValue = Validator.makeNumber(values[1], newValues?.[1]);

    if (intFirstValue < intSecondValue) {
      this.options.values[0] = intFirstValue > min ? intFirstValue : min;
      this.options.values[1] = intSecondValue < max ? intSecondValue : max;
      return;
    }

    this.options.values[0] = intSecondValue > min ? intSecondValue : min;
    this.options.values[1] = intFirstValue < max ? intFirstValue : max;
  }

  private verifyStep(newStep: number | undefined): void {
    const { min, max, step } = this.options;

    const intNewStep = Validator.makeNumber(step, newStep);

    if (intNewStep < 1) {
      return;
    }

    const distanceBetweenMinAndMax = max - min;

    if (step < distanceBetweenMinAndMax) {
      this.options.step = intNewStep;
      return;
    }

    this.options.step = distanceBetweenMinAndMax;
  }

  private static makeNumber(number: number, value: any): number {
    if (/^(-|\+)?([0-9]+)$/.test(value)) {
      return Number(value);
    }
    return number;
  }
}

export default Validator;
