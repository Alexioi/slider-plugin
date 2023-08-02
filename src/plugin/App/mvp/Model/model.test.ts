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
  });
});
