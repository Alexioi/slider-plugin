import { helpers } from '../../../../helpers';
import { Dom, Props, UpdateOptions } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const runner = helpers.createElement('slider__runner');
  runner.setAttribute('tabindex', '0');

  return { root, runner };
};

const initProps = (type: 'from' | 'to'): Props => {
  const isRender = false;

  return { isRender, type };
};

const switchIsRender = (props: Props) => {
  const isRender = !props.isRender;

  return { ...props, isRender };
};

const destroy = ({ runner }: Dom, oldProps: Props): Props => {
  runner.remove();
  const props = switchIsRender(oldProps);

  return props;
};

const isRangeRenderedRunnerFrom = ({ type, isRender }: Props, isRange: boolean) => {
  return type === 'from' && !isRange && isRender;
};

const toggleTarget = ({ type }: Props, { runner }: Dom, target: 'to' | 'from') => {
  if (target === type) {
    runner.classList.add('slider__runner_targeted');
    return;
  }

  runner.classList.remove('slider__runner_targeted');
};

const move = (
  { runner }: Dom,
  { type }: Props,
  { min, max, from, to, isVertical }: UpdateOptions,
) => {
  const movingRunner = runner;
  const value = type === 'from' ? from : to;

  const percent = helpers.calculatePercent(value, min, max);
  const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

  movingRunner.style.cssText = styleRunner;
};

export {
  createElements,
  initProps,
  switchIsRender,
  destroy,
  isRangeRenderedRunnerFrom,
  toggleTarget,
  move,
};
