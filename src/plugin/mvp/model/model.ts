import enums from '../../enums/enums';

class Model implements IModel {
  private options: IOptions;

  private eventEmitter: IEventEmitter;

  constructor(options: IOptions, eventEmitter: IEventEmitter) {
    this.eventEmitter = eventEmitter;
    this.options = { ...options };
  }

  public updateOptions(config: IConfig): void {
    this.verifyOption(config);

    this.eventEmitter.emit(enums.EventNames.UpdatedModelOptions, this.options);
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateValueUsingFraction({ position, type }: IElementPosition): void {
    const { isVertical, min, max } = this.options;
    const { x, y } = position;

    const percentageOfLength = isVertical ? y : x;

    const newValue = (max - min) * percentageOfLength + min;

    this.changeValueDependingOnStep(newValue, type);

    this.eventEmitter.emit(enums.EventNames.UpdatedModelOptions, this.options);
  }

  public updateNearValue(newValue: number): void {
    const { isRange, from, to } = this.options;

    const diffFrom = Math.abs(from - newValue);
    const diffTo = Math.abs(to - newValue);

    if (!isRange) {
      this.options.to = newValue;
      this.eventEmitter.emit(enums.EventNames.UpdatedModelOptions, this.options);
      return;
    }

    if (diffTo <= diffFrom) {
      this.options.to = newValue;
      this.eventEmitter.emit(enums.EventNames.UpdatedModelOptions, this.options);
      return;
    }

    this.options.from = newValue;
    this.eventEmitter.emit(enums.EventNames.UpdatedModelOptions, this.options);
  }

  private verifyOption(config: IConfig): void {
    const { isRange, isVertical, hasTip, hasScale, min, max, from, to, step } = config;

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

    const intFirstValue = parseInt(String(firstValue), 10);
    const intSecondValue = parseInt(String(secondValue), 10);

    const isRealIntFirstValue = !isNaN(intFirstValue) || isFinite(intFirstValue);
    const isRealIntSecondValue = !isNaN(intSecondValue) || isFinite(intSecondValue);

    const newMin = isRealIntFirstValue ? intFirstValue : min;
    const newMax = isRealIntSecondValue ? intSecondValue : max;

    if (newMin < newMax) {
      this.options.min = newMin;
      this.options.max = newMax;
      return;
    }

    this.options.min = newMax;
    this.options.max = newMin;
  }

  private verifyFromAndTo(firstValue: number | undefined, secondValue: number | undefined): void {
    const { min, max, from, to } = this.options;

    const intFirstValue = parseInt(String(firstValue), 10);
    const intSecondValue = parseInt(String(secondValue), 10);

    const isRealIntFirstValue = !isNaN(intFirstValue) || isFinite(intFirstValue);
    const isRealIntSecondValue = !isNaN(intSecondValue) || isFinite(intSecondValue);

    const newFrom = isRealIntFirstValue ? intFirstValue : from;
    const newTo = isRealIntSecondValue ? intSecondValue : to;

    if (newFrom < newTo) {
      this.options.from = newFrom > min ? newFrom : min;
      this.options.to = newTo < max ? newTo : max;
      return;
    }

    this.options.from = newTo > min ? newTo : min;
    this.options.to = newFrom < max ? newFrom : max;
  }

  private verifyStep(newStep: number | undefined): void {
    const { min, max } = this.options;

    const intNewStep = parseInt(String(newStep), 10);

    const isRealIntNewStep = !isNaN(intNewStep) || isFinite(intNewStep);

    if (!isRealIntNewStep) {
      return;
    }

    if (intNewStep <= 0) {
      return;
    }

    const distanceBetweenMinAndMax = max - min;

    if (intNewStep < distanceBetweenMinAndMax) {
      this.options.step = intNewStep;
      return;
    }

    this.options.step = distanceBetweenMinAndMax;
  }

  private changeValueDependingOnStep(newValue: number, valueName: 'from' | 'to'): void {
    const { step, min, max, from, to, isRange } = this.options;

    const minimum = valueName === 'from' || !isRange ? min : from;
    const maximum = valueName === 'from' ? to : max;

    const oldValue = this.options[valueName];

    const differenceValue = Math.abs(newValue - oldValue);

    const stepRemainderOfDivision = differenceValue % step;

    if (newValue < minimum) {
      this.options[valueName] = minimum;
      return;
    }

    if (newValue > maximum) {
      this.options[valueName] = maximum;
      return;
    }

    if (differenceValue < step / 2) {
      this.options[valueName] = oldValue;
      return;
    }

    if (stepRemainderOfDivision < step / 2) {
      if (newValue > oldValue) {
        this.options[valueName] = newValue - stepRemainderOfDivision;
        return;
      }
      this.options[valueName] = newValue + stepRemainderOfDivision;
      return;
    }

    if (newValue + stepRemainderOfDivision - step < minimum) {
      this.options[valueName] = minimum;
      return;
    }

    if (newValue - stepRemainderOfDivision + step > maximum) {
      this.options[valueName] = maximum;
      return;
    }

    if (newValue > oldValue) {
      this.options[valueName] = newValue - stepRemainderOfDivision + step;
      return;
    }

    this.options[valueName] = newValue + stepRemainderOfDivision - step;
  }
}

export default Model;
