import { helpers } from '../../../helpers';
import { Dom, Props } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const runner = helpers.createElement('slider__runner');
  runner.setAttribute('tabindex', '0');

  return { root, runner };
};

const initProps = (valueIndex: 0 | 1, target: 0 | 1): Props => {
  const isRender = false;

  return { isRender, valueIndex, target };
};

const switchIsRender = (props: Props) => {
  const isRender = !props.isRender;

  return { ...props, isRender };
};

export { createElements, initProps, switchIsRender };
