import { Options } from '@types';

const getRoundingNumber = (number: number, step: number): number => {
  const [, symbolsAfterComma] = String(step).split('.');

  if (typeof symbolsAfterComma === 'undefined') {
    return number;
  }

  return Number(number.toFixed(symbolsAfterComma.length));
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
): number[] => {
  const minimum = valueIndex === 'from' || !isRange ? min : from;
  const maximum = valueIndex === 'from' ? to : max;

  return [minimum, maximum];
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
    step: number;
    from: number;
    to: number;
    min: number;
    max: number;
    isRange: boolean;
  },
  valueIndex: 'from' | 'to',
): number => {
  const [minimum, maximum] = getMinimumAndMaximum(
    {
      from,
      to,
      min,
      max,
      isRange,
    },
    valueIndex,
  );

  const oldValue = valueIndex === 'from' ? from : to;

  const differenceValue = Math.abs(newValue - oldValue);

  const stepRemainderOfDivision = differenceValue % step;

  if (newValue < minimum) {
    return getRoundingNumber(minimum, step);
  }

  if (newValue > maximum) {
    return getRoundingNumber(maximum, step);
  }

  if (differenceValue < step / 2) {
    return getRoundingNumber(oldValue, step);
  }

  if (stepRemainderOfDivision < step / 2) {
    if (newValue > oldValue) {
      return getRoundingNumber(newValue - stepRemainderOfDivision, step);
    }

    return getRoundingNumber(newValue + stepRemainderOfDivision, step);
  }

  if (newValue + stepRemainderOfDivision - step < minimum) {
    return getRoundingNumber(minimum, step);
  }

  if (newValue - stepRemainderOfDivision + step > maximum) {
    return getRoundingNumber(maximum, step);
  }

  if (newValue > oldValue) {
    return getRoundingNumber(newValue - stepRemainderOfDivision + step, step);
  }

  return getRoundingNumber(newValue + stepRemainderOfDivision - step, step);
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
    if (from > newValue) {
      return 'from';
    }
    return 'to';
  }

  if (diffFrom < diffTo) {
    return 'from';
  }

  return 'to';
};

const getNewValueUsingFraction = (
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
  const newValue =
    touchRoute === 'up'
      ? options[type] + options.step
      : options[type] - options.step;
  const [minimum, maximum] = getMinimumAndMaximum(options, type);

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
  type?: 'from' | 'to',
): Options => {
  const newValue = getNewValueUsingFraction(position, options);

  if (typeof type !== 'undefined') {
    return {
      ...options,
      [type]: changeValueDependingOnStep(newValue, options, type),
    };
  }

  const nearType = getNearValueType(newValue, options);

  return {
    ...options,
    [nearType]: changeValueDependingOnStep(newValue, options, nearType),
  };
};

const updateNearValue = (newValue: number, options: Options) => {
  const nearValueId = getNearValueType(newValue, options);

  return { ...options, [nearValueId]: newValue };
};

export { updateOptionsByStep, calculateValue, updateNearValue };
