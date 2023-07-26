import { Options } from '@types';

import { Model } from '.';

describe('Model', () => {
  const options = {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: 0,
    max: 100,
    from: 40,
    to: 70,
  };

  const makeTestUpdateModelValues = (value: Options) => {
    return (newOptions: Options) => {
      expect(newOptions).toEqual(value);
    };
  };

  it('should return options', () => {
    const model = new Model(options);

    expect(model.getOptions()).toEqual(options);
  });

  it('should calculate value using fraction and emit options', () => {
    (() => {
      const model = new Model(options);
      const value = {
        isRange: true,
        isVertical: false,
        hasTip: true,
        hasScale: true,
        step: 10,
        min: 0,
        max: 100,
        from: 40,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction({
        position: { x: 101, y: 50 },
        type: 'to',
      });
    })();

    (() => {
      const model = new Model(options);
      const value = {
        isRange: true,
        isVertical: false,
        hasTip: true,
        hasScale: true,
        step: 10,
        min: 0,
        max: 100,
        from: 40,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction({
        position: { x: 101, y: 50 },
        type: 'to',
      });
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        isRange: true,
        isVertical: true,
        hasTip: true,
        hasScale: true,
        step: 10,
        min: 0,
        max: 100,
        from: 40,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction({
        position: { x: 50, y: 101 },
        type: 'to',
      });
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        isRange: true,
        isVertical: true,
        hasTip: true,
        hasScale: true,
        step: 10,
        min: 0,
        max: 100,
        from: 70,
        to: 70,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction({
        position: { x: 50, y: 101 },
        type: 'from',
      });
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        from: 70,
        isVertical: true,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction({
        position: { x: 50, y: 10 },
        type: 'from',
      });
    })();
  });
});
