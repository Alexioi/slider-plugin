const sliderOptions = {
  defaultConfig: {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: 0,
    max: 100,
    values: [40, 70],
  },
  callbacks: { onChange: () => {} },
};

export { sliderOptions };
