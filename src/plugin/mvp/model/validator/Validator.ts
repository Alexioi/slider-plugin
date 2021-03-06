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
    this.verifyValues(values);
    this.verifyStep(step);
  }

  private verifyMinAndMax(firstValue?: number, secondValue?: number): void {
    const { min, max } = this.options;

    const intFirstValue = Validator.makeNumber(min, firstValue);
    const intSecondValue = Validator.makeNumber(max, secondValue);

    if (intFirstValue === intSecondValue) {
      this.options.min = intFirstValue;
      this.options.max = intSecondValue + 1;
      return;
    }

    const [newMin, newMax] = [intFirstValue, intSecondValue].sort((a, b) => {
      return a - b;
    });

    this.options.min = newMin;
    this.options.max = newMax;
  }

  private verifyValues(newValues?: number[]): void {
    const { min, max, values } = this.options;

    const intFirstValue = Validator.makeNumber(values[0], newValues?.[0]);
    const intSecondValue = Validator.makeNumber(values[1], newValues?.[1]);

    const [newFirstValue, newSecondValue] = [intFirstValue, intSecondValue].sort((a, b) => {
      return a - b;
    });

    this.options.values[0] = newFirstValue > min ? newFirstValue : min;
    this.options.values[1] = newSecondValue < max ? newSecondValue : max;
  }

  private verifyStep(newStep: number | undefined): void {
    const { min, max, step } = this.options;

    const intNewStep = Math.round(Validator.makeNumber(step, newStep));

    if (intNewStep <= 1) {
      this.options.step = 1;
      return;
    }

    const distanceBetweenMinAndMax = max - min;

    if (intNewStep < distanceBetweenMinAndMax) {
      this.options.step = intNewStep;
      return;
    }

    this.options.step = distanceBetweenMinAndMax;
  }

  private static makeNumber(number: number, value: any): number {
    if (/^(-|\+)?([0-9]+)?(\.|,)?([0-9]+)$/.test(value)) {
      return Number(value);
    }
    return number;
  }
}

export default Validator;
