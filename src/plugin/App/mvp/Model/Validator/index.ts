import { Config, Options } from '@types';

import { verifyFromAndTo, verifyMinAndMax, verifyStep } from './methods';

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
