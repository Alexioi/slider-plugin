import { Options } from '@types';

const calculateRoundingNumber = (number: number, step: number): number => {
  const [, symbolsAfterComma] = String(step).split('.');

  if (typeof symbolsAfterComma === 'undefined') {
    return Number(number.toFixed(0));
  }

  const trimmedNumber = Number(number.toFixed(symbolsAfterComma.length));
  const factor = 10 ** symbolsAfterComma.length;

  return Math.round(trimmedNumber * factor) / factor;
};

const getMinimumAndMaximum = (
  {
    from,
    to,
    min,
    max,
    isRange,
  }: { from: number; to: number; min: number; max: number; isRange: boolean },
  valueIndex: 'to' | 'from',
): { minimum: number; maximum: number } => {
  const minimum = valueIndex === 'from' || !isRange ? min : from;
  const maximum = valueIndex === 'from' ? to : max;

  return { minimum, maximum };
};

const checkSensitiveStepForStep = (
  differenceValue: number,
  differenceValueByStep: number,
  step: number,
  oldValue: number,
  newValue: number,
  minimum: number,
  maximum: number,
): number => {
  const stepRemainderOfDivision = differenceValue % step;

  if (differenceValue < step / 2) {
    return oldValue;
  }

  if (newValue - step < minimum) {
    return minimum;
  }

  if (newValue + step > maximum) {
    return maximum;
  }

  if (differenceValue < step) {
    if (newValue > oldValue) {
      return calculateRoundingNumber(oldValue + step, step);
    }

    return calculateRoundingNumber(oldValue - step, step);
  }

  if (stepRemainderOfDivision > step / 2) {
    if (newValue > oldValue) {
      return calculateRoundingNumber(
        oldValue + differenceValueByStep + step,
        step,
      );
    }

    return calculateRoundingNumber(
      oldValue - differenceValueByStep - step,
      step,
    );
  }

  if (newValue > oldValue) {
    return calculateRoundingNumber(oldValue + differenceValueByStep, step);
  }

  return calculateRoundingNumber(oldValue - differenceValueByStep, step);
};

const changeValueDependingOnStep = (
  newValue: number,
  {
    step,
    from,
    to,
    min,
    max,
    isRange,
  }: {
    step: number | 'none';
    from: number;
    to: number;
    min: number;
    max: number;
    isRange: boolean;
  },
  valueIndex: 'from' | 'to',
  isCheckSensitive: boolean,
): number => {
  const { minimum, maximum } = getMinimumAndMaximum(
    {
      from,
      to,
      min,
      max,
      isRange,
    },
    valueIndex,
  );

  if (step === 'none') {
    if (newValue < minimum) {
      return minimum;
    }

    if (newValue > maximum) {
      return maximum;
    }

    return newValue;
  }

  const oldValue = valueIndex === 'from' ? from : to;

  const differenceValue = Math.abs(newValue - oldValue);

  const differenceValueByStep = Math.floor(differenceValue / step) * step;

  if (newValue < minimum) {
    return minimum;
  }

  if (newValue > maximum) {
    return maximum;
  }

  if (isCheckSensitive) {
    return checkSensitiveStepForStep(
      differenceValue,
      differenceValueByStep,
      step,
      oldValue,
      newValue,
      minimum,
      maximum,
    );
  }

  if (newValue > oldValue) {
    return calculateRoundingNumber(oldValue + differenceValueByStep, step);
  }

  return calculateRoundingNumber(oldValue - differenceValueByStep, step);
};

const getNearValueType = (
  newValue: number,
  { isRange, from, to }: { isRange: boolean; from: number; to: number },
): 'from' | 'to' => {
  if (!isRange) {
    return 'to';
  }

  const diffFrom = Math.abs(from - newValue);
  const diffTo = Math.abs(to - newValue);

  if (diffFrom === diffTo) {
    if (newValue > from) {
      return 'to';
    }

    return 'from';
  }

  if (diffFrom < diffTo) {
    return 'from';
  }

  return 'to';
};

const calculateNewValueUsingFraction = (
  { x, y }: { x: number; y: number },
  { min, max, isVertical }: { min: number; max: number; isVertical: boolean },
): number => {
  const percent = isVertical ? y : x;

  return (max - min) * percent + min;
};

const updateOptionsByStep = (
  touchRoute: 'down' | 'up',
  options: Options,
  type: 'to' | 'from',
) => {
  const step =
    options.step === 'none' ? (options.max - options.min) / 10 : options.step;
  const newValue =
    touchRoute === 'up' ? options[type] + step : options[type] - step;
  const { minimum, maximum } = getMinimumAndMaximum(options, type);

  if (newValue < minimum) {
    return { ...options, [type]: minimum };
  }

  if (newValue > maximum) {
    return { ...options, [type]: maximum };
  }

  return { ...options, [type]: newValue };
};

const calculateValue = (
  position: { x: number; y: number },
  options: Options,
  isCheckSensitive: boolean,
  type?: 'from' | 'to',
): Options => {
  const newValue = calculateNewValueUsingFraction(position, options);

  if (typeof type !== 'undefined') {
    return {
      ...options,
      [type]: changeValueDependingOnStep(
        newValue,
        options,
        type,
        isCheckSensitive,
      ),
    };
  }

  const nearType = getNearValueType(newValue, options);

  return {
    ...options,
    [nearType]: changeValueDependingOnStep(
      newValue,
      options,
      nearType,
      isCheckSensitive,
    ),
  };
};

const updateNearValue = (newValue: number, options: Options) => {
  const nearValueType = getNearValueType(newValue, options);

  const nearType = getNearValueType(newValue, options);

  return {
    ...options,
    [nearValueType]: changeValueDependingOnStep(
      newValue,
      options,
      nearType,
      true,
    ),
  };
};

export { updateOptionsByStep, calculateValue, updateNearValue };
