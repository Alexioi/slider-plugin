import { helpers } from '@helpers';

import { UpdateOptions } from './types';
import { cssSelectors } from './constants';

const createElements = (root: HTMLDivElement) => {
  const range = helpers.createElement(cssSelectors.range);

  return { root, range };
};

const init = (root: HTMLDivElement) => {
  const dom = createElements(root);

  return { dom };
};

const changeDimensions = (
  node: HTMLDivElement,
  { min, max, isVertical, isRange, from, to }: UpdateOptions,
): void => {
  const range = node;
  const startPercent = isRange ? helpers.calculatePercent(from, min, max) : 0;
  const finishPercent = helpers.calculatePercent(to, min, max);

  if (isVertical) {
    range.style.cssText = `top: ${startPercent}%; bottom: ${100 - finishPercent}%`;
    return;
  }

  range.style.cssText = `left: ${startPercent}%; right: ${100 - finishPercent}%`;
};
export { init, changeDimensions };
