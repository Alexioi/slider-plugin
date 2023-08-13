import { helpers } from '@helpers';

import { Dom, Props, UpdateOptions } from './type';
import { CSSSelectors } from './constants';

const createElements = (root: HTMLDivElement): Dom => {
  const runner = helpers.createElement(CSSSelectors.runner);
  runner.tabIndex = 0;
  runner.role = 'slider';
  runner.ariaLabel = 'slider runner';

  return { root, runner };
};

const initProps = (type: 'from' | 'to'): Props => {
  return { type };
};

const destroy = ({ runner }: Dom): void => {
  runner.remove();
};

const toggleTarget = (
  { type }: Props,
  { runner }: Dom,
  target: 'to' | 'from',
) => {
  if (target === type) {
    runner.classList.add(CSSSelectors.targetedRunner);
    return;
  }

  runner.classList.remove(CSSSelectors.targetedRunner);
};

const move = (
  { runner }: Dom,
  { type }: Props,
  { min, max, from, to, isVertical }: UpdateOptions,
  ariaValueText: { from: string; to: string },
) => {
  const movingRunner = runner;
  const value = type === 'from' ? from : to;

  movingRunner.ariaValueNow = String(value);
  movingRunner.ariaValueText = ariaValueText[type];

  const percent = helpers.calculatePercent(value, min, max);
  const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

  movingRunner.style.cssText = styleRunner;
};

const changeAria = (
  { runner }: Dom,
  isVertical: boolean,
  min: number,
  max: number,
) => {
  const changedRunner = runner;

  if (isVertical) {
    changedRunner.ariaOrientation = 'vertical';
  } else {
    changedRunner.ariaOrientation = 'horizontal';
  }

  changedRunner.ariaValueMin = String(min);
  changedRunner.ariaValueMax = String(max);
};

export { createElements, initProps, destroy, toggleTarget, move, changeAria };
