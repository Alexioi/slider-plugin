class Validator {
  private options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
  }

  public validateOptions(config: IConfig) {
    const { isRange, isVertical, hasTip, hasScale, step, min, max, from, to } = config;

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
    this.verifyFromAndTo(from, to);
    this.verifyStep(step);
  }

  private verifyMinAndMax(firstValue: number | undefined, secondValue: number | undefined): void {
    const { min, max } = this.options;

    const intFirstValue = Validator.makeNumber(firstValue, min);
    const intSecondValue = Validator.makeNumber(secondValue, max);

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

  private verifyFromAndTo(firstValue: number | undefined, secondValue: number | undefined): void {
    const { min, max, from, to } = this.options;

    const intFirstValue = Validator.makeNumber(firstValue, from);
    const intSecondValue = Validator.makeNumber(secondValue, to);

    if (intFirstValue < intSecondValue) {
      this.options.from = intFirstValue > min ? intFirstValue : min;
      this.options.to = intSecondValue < max ? intSecondValue : max;
      return;
    }

    this.options.from = intSecondValue > min ? intSecondValue : min;
    this.options.to = intFirstValue < max ? intFirstValue : max;
  }

  private verifyStep(newStep: number | undefined): void {
    const { min, max, step } = this.options;

    const intNewStep = Validator.makeNumber(newStep, step);

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

  private static makeNumber(value: any, number: number): number {
    if (/^(-|\+)?([0-9]+)$/.test(value)) {
      return Number(value);
    }
    return number;
  }
}

export default Validator;
