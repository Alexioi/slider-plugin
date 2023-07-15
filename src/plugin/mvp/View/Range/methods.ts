import { helpers } from '../../../helpers';
import { RangeOptions } from './types';

const createElements = (root: HTMLDivElement) => {
  const range = helpers.createElement('slider__range');

  return { root, range };
};

const init = (root: HTMLDivElement) => {
  const dom = createElements(root);

  return { dom };
};

const changeDimensions = (
  range: HTMLDivElement,
  { min, max, isVertical, isRange, from, to }: RangeOptions,
): void => {
  const mobileRange = range;
  const startPercent = isRange ? helpers.calculatePercent(from, min, max) : 0;
  const finishPercent = helpers.calculatePercent(to, min, max);

  if (isVertical) {
    mobileRange.style.cssText = `top: ${startPercent}%; bottom: ${100 - finishPercent}%`;
    return;
  }

  mobileRange.style.cssText = `left: ${startPercent}%; right: ${100 - finishPercent}%`;
};
export { init, changeDimensions };
