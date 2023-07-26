import { Config, Options } from '@types';

const makeNumber = (number: number, value: unknown): number => {
  if (String(value).search(/^(-|\+)?([0-9]+)?(\.|,)?([0-9]+)$/) !== -1) {
    return Number(value);
  }

  return number;
};

const verifyMinAndMax = (
  oldOptions: { min: number; max: number },
  newOptions?: { min?: number; max?: number },
): { min: number; max: number } => {
  const intFirstValue = makeNumber(oldOptions.min, newOptions?.min);
  const intSecondValue = makeNumber(oldOptions.max, newOptions?.max);

  if (intFirstValue === intSecondValue) {
    const min = intFirstValue;
    const max = intSecondValue + 1;

    return { min, max };
  }

  const [newMin, newMax] = [intFirstValue, intSecondValue].sort((a, b) => {
    return a - b;
  });

  const min = newMin;
  const max = newMax;

  return { min, max };
};

const calculateTo = (min: number, max: number, to: number): number => {
  if (to > max) {
    return max;
  }

  if (to < min) {
    return min;
  }

  return to;
};

const calculateFrom = (min: number, to: number, from: number): number => {
  if (from < min) {
    return min;
  }

  if (from > to) {
    return to;
  }

  return from;
};

const verifyFromAndTo = (
  oldOptions: { from: number; to: number },
  min: number,
  max: number,
  newOptions?: { from?: number; to?: number },
): { from: number; to: number } => {
  const intFirstValue = makeNumber(oldOptions.from, newOptions?.from);
  const intSecondValue = makeNumber(oldOptions.to, newOptions?.to);

  const [newFirstValue, newSecondValue] = [intFirstValue, intSecondValue].sort((a, b) => {
    return a - b;
  });

  const to = calculateTo(min, max, newSecondValue);
  const from = calculateFrom(min, to, newFirstValue);

  return { from, to };
};

const verifyStep = (
  oldOptions: { step: number },
  min: number,
  max: number,
  newOptions?: { step?: number },
): number => {
  const intNewStep = makeNumber(oldOptions.step, newOptions?.step);

  if (intNewStep <= 0) {
    return 1;
  }

  const distanceBetweenMinAndMax = max - min;

  if (intNewStep < distanceBetweenMinAndMax) {
    return intNewStep;
  }

  return distanceBetweenMinAndMax;
};

const validate = (oldOptions: Options, newOptions?: Config): Options => {
  const isRange =
    typeof newOptions?.isRange === 'boolean' ? newOptions.isRange : oldOptions.isRange;
  const isVertical =
    typeof newOptions?.isVertical === 'boolean' ? newOptions.isVertical : oldOptions.isVertical;
  const hasTip = typeof newOptions?.hasTip === 'boolean' ? newOptions.hasTip : oldOptions.hasTip;
  const hasScale =
    typeof newOptions?.hasScale === 'boolean' ? newOptions.hasScale : oldOptions.hasScale;
  const { min, max } = verifyMinAndMax(oldOptions, newOptions);
  const { from, to } = verifyFromAndTo(oldOptions, min, max, newOptions);
  const step = verifyStep(oldOptions, min, max, newOptions);

  return { from, to, min, max, step, isRange, isVertical, hasScale, hasTip };
};

export { validate };