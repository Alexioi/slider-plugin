import { helpers } from '../../../helpers';
import { Dom } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const runner = helpers.createElement('slider__runner');
  runner.setAttribute('tabindex', '0');

  return { root, runner };
};

export { createElements };
