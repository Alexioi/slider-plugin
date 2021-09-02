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

  test('update newMin > max', () => {
    model.updateOptions({ min: 200 });

    const { min } = model.getOptions();

    expect(min).toEqual(0);
  });

  test('update newMin > newMax', () => {
    model.updateOptions({ min: 200, max: 100 });

    const { min, max } = model.getOptions();

    expect(min).toEqual(0);
    expect(max).toEqual(100);
  });

  // test('update value from', () => {
  //   model.updateFromToPercentage({ x: 0.31, y: 0.31 });

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(30);
  //   expect(to).toEqual(70);
  // });

  // test('update value to', () => {
  //   model.updateValueToPercentage({ x: 0.79, y: 0.79 });

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(30);
  //   expect(to).toEqual(80);
  // });

  test('update value to', () => {
    model.updateNearValue(20);

    const { from, to } = model.getOptions();

    expect(from).toEqual(20);
    expect(to).toEqual(80);
  });

  test('update options', () => {
    let options = {
      isRange: false,
      isVertical: true,
      hasTip: false,
      hasScale: false,
      step: 15,
      min: -100,
      max: 1000,
      from: 400,
      to: 700,
    };
    model.updateOptions(options);

    options = model.getOptions();

    expect(options).toEqual(options);
  });
});
