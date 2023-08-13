import { Options } from '@types';

import { Model } from '.';

describe('Model', () => {
  const options: Options = {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: 0,
    max: 100,
    from: 40,
    to: 70,
    format: () => {
      return 'Hello World';
    },
  };

  const makeTestUpdateModelValues = (value: Options) => {
    return (newOptions: Options) => {
      expect(newOptions).toEqual(value);
    };
  };

  it('should return options', () => {
    const model = new Model(options);

    const {
      isRange,
      isVertical,
      hasTip,
      hasScale,
      step,
      min,
      max,
      from,
      to,
      format,
    } = model.getConfig();

    expect({
      isRange,
      isVertical,
      hasTip,
      hasScale,
      step,
      min,
      max,
      from,
      to,
      format,
    }).toEqual(options);
  });

  it('should update', () => {
    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        min: 100,
        max: 100,
      };

      model.updateConfig(value);

      const {
        isRange,
        isVertical,
        hasTip,
        hasScale,
        step,
        min,
        max,
        from,
        to,
        format,
      } = model.getConfig();

      expect({
        isRange,
        isVertical,
        hasTip,
        hasScale,
        step,
        min,
        max,
        from,
        to,
        format,
      }).toEqual({
        ...value,
        from: 100,
        to: 100,
        max: 101,
        step: 1,
      });
    })();

    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 200,
        max: 100,
      };

      model.updateConfig(value);

      const {
        isRange,
        isVertical,
        hasTip,
        hasScale,
        step,
        min,
        max,
        from,
        to,
        format,
      } = model.getConfig();

      expect({
        isRange,
        isVertical,
        hasTip,
        hasScale,
        step,
        min,
        max,
        from,
        to,
        format,
      }).toEqual({
        ...value,
        to: 100,
        max: 100,
      });
    })();

    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        step: -1,
      };

      model.updateConfig(value);

      const {
        isRange,
        isVertical,
        hasTip,
        hasScale,
        step,
        min,
        max,
        from,
        to,
        format,
      } = model.getConfig();

      expect({
        isRange,
        isVertical,
        hasTip,
        hasScale,
        step,
        min,
        max,
        from,
        to,
        format,
      }).toEqual({
        ...value,
        step: 'none',
      });
    })();
  });

  it('should calculate value using fraction and emit options', () => {
    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction(
        {
          position: { x: 1.01, y: 0.5 },
          type: 'to',
        },
        true,
      );
    })();

    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction(
        {
          position: { x: 1.01, y: 0.5 },
          type: 'to',
        },
        true,
      );
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction(
        {
          position: { x: 0.5, y: 1.01 },
          type: 'to',
        },
        true,
      );
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        from: 70,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction(
        {
          position: { x: 0.5, y: 1.01 },
          type: 'from',
        },
        true,
      );
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        from: 10,
        isVertical: true,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateValueUsingFraction(
        {
          position: { x: 0.5, y: 0.1 },
          type: 'from',
        },
        true,
      );
    })();
  });

  it('should calculate near value using fraction and emit options', () => {
    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 1.01, y: 0.5 }, true);
    })();

    (() => {
      const model = new Model({ ...options });
      const value = {
        ...options,
        from: 0,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 1.01 }, true);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 1.01 }, true);
    })();

    (() => {
      const model = new Model({
        ...options,
        from: 100,
        to: 100,
      });

      const value = {
        ...options,
        from: 90,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.9, y: 0.9 }, true);
    })();

    (() => {
      const model = new Model({
        ...options,
        from: 0,
        to: 0,
      });

      const value = {
        ...options,
        from: 0,
        to: 90,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.9, y: 0.9 }, true);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        from: 0,
        isVertical: true,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: -0.3 }, true);
    })();

    (() => {
      const model = new Model({ ...options });
      const value = {
        ...options,
        from: 50,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.54, y: 1.01 }, true);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 60,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 0.56 }, true);
    })();

    (() => {
      const model = new Model({ ...options, step: 3.333 });
      const value = {
        ...options,
        to: 66.667,
        step: 3.333,
      };

      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.66, y: -0.66 }, true);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 70,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 0.69 }, true);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 0.99 }, true);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        from: 0,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 0.03 }, true);
    })();
  });

  it('should update near value', () => {
    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateNearValue(100);
    })();

    (() => {
      const model = new Model({ ...options });
      const value = {
        ...options,
        from: 0,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateNearValue(0);
    })();

    (() => {
      const model = new Model({ ...options });
      const value = {
        ...options,
        from: 51,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateNearValue(51);
    })();
  });

  it('should update by step', () => {
    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        from: 50,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'from', touchRoute: 'up' });
    })();

    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        from: 30,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'from', touchRoute: 'down' });
    })();

    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 80,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'to', touchRoute: 'up' });
    })();

    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 60,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'to', touchRoute: 'down' });
    })();

    (() => {
      const model = new Model({ ...options, from: 70 });
      const value = {
        ...options,
        from: 70,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'from', touchRoute: 'up' });
    })();

    (() => {
      const model = new Model({ ...options, to: 40 });
      const value = {
        ...options,
        to: 40,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'to', touchRoute: 'down' });
    })();

    (() => {
      const model = new Model({ ...options, to: 50, step: 'none' });
      const value: Options = {
        ...options,
        to: 60,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'to', touchRoute: 'up' });
    })();

    (() => {
      const model = new Model({ ...options, to: 100, step: 'none' });
      const value: Options = {
        ...options,
        to: 100,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'to', touchRoute: 'up' });
    })();

    (() => {
      const model = new Model({ ...options, from: 0, step: 'none' });
      const value: Options = {
        ...options,
        from: 0,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.updateValueByStep({ type: 'from', touchRoute: 'down' });
    })();
  });

  it('should not sensitive calculate near value using fraction and emit options', () => {
    (() => {
      const model = new Model(options);
      const value = {
        ...options,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 1.01, y: 0.5 }, false);
    })();

    (() => {
      const model = new Model({ ...options });
      const value = {
        ...options,
        from: 0,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 1.01 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 100,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 1.01 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        from: 0,
        isVertical: true,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: -0.3 }, false);
    })();

    (() => {
      const model = new Model({ ...options });
      const value = {
        ...options,
        from: 50,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.54, y: 1.01 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 60,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 0.56 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true });
      const value = {
        ...options,
        isVertical: true,
        to: 70,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -0.2, y: 0.61 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true, step: 'none' });
      const value: Options = {
        ...options,
        isVertical: true,
        from: 0,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0, y: 0 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true, step: 'none' });
      const value: Options = {
        ...options,
        isVertical: true,
        from: 0,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: -1, y: -1 }, false);
    })();

    (() => {
      const model = new Model({ ...options, isVertical: true, step: 'none' });
      const value: Options = {
        ...options,
        isVertical: true,
        to: 100,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 1.1, y: 1.1 }, false);
    })();

    (() => {
      const model = new Model({
        ...options,
        isVertical: true,
        step: 'none',
        isRange: false,
      });
      const value: Options = {
        ...options,
        isRange: false,
        isVertical: true,
        to: 0,
        step: 'none',
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 1.1, y: 0 }, false);
    })();

    (() => {
      const model = new Model({
        ...options,
      });
      const value: Options = {
        ...options,
        to: 60,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.64, y: 0.66 }, true);
    })();

    (() => {
      const model = new Model({
        ...options,
      });
      const value: Options = {
        ...options,
        to: 80,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.76, y: 0.74 }, true);
    })();

    (() => {
      const model = new Model({
        ...options,
      });
      const value: Options = {
        ...options,
        from: 10,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.11, y: 0.66 }, true);
    })();

    (() => {
      const model = new Model({
        ...options,
      });
      const value: Options = {
        ...options,
        to: 90,
      };
      model.subscribe('UpdateModelValues', makeTestUpdateModelValues(value));

      model.calculateNearValueUsingFraction({ x: 0.89, y: 0.74 }, true);
    })();
  });
});
