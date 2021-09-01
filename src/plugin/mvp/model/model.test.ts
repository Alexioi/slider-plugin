import Model from './model';

describe('Model testing', () => {
  const model = new Model({
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: 0,
    max: 100,
    from: 40,
    to: 70,
  });

  test('update valid options', () => {
    model.updateOptions({
      isRange: false,
      isVertical: true,
      hasTip: false,
      hasScale: false,
      step: 15,
      min: -100,
      max: 1000,
      from: 400,
      to: 700,
    });
    const options = model.getOptions();
    expect(options).toEqual({
      isRange: false,
      isVertical: true,
      hasTip: false,
      hasScale: false,
      step: 15,
      min: -100,
      max: 1000,
      from: 400,
      to: 700,
    });
  });
});
