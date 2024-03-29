const defaultOptions = {
  isRange: true,
  isVertical: false,
  hasTip: true,
  hasScale: true,
  step: 10,
  min: 0,
  max: 100,
  from: 40,
  to: 70,
  format: (value: number): string => {
    return String(value);
  },
};

export { defaultOptions };
