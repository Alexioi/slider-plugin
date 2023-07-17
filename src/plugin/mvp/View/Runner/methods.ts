import { helpers } from '../../../helpers';
import { Dom, Props } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const runner = helpers.createElement('slider__runner');
  runner.setAttribute('tabindex', '0');

  return { root, runner };
};

const initProps = (valueIndex: 'from' | 'to'): Props => {
  const isRender = false;

  return { isRender, valueIndex };
};

const switchIsRender = (props: Props) => {
  const isRender = !props.isRender;

  return { ...props, isRender };
};

export { createElements, initProps, switchIsRender };
