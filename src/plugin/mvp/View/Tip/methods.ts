import { helpers } from '../../../helpers';
import { Dom } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const tipLine = helpers.createElement('slider__tip-line');
  const tipFrom = helpers.createElement('slider__tip');
  const tipBoth = helpers.createElement('slider__tip');
  const tipTo = helpers.createElement('slider__tip');

  return { root, tipLine, tipFrom, tipBoth, tipTo };
};

export { createElements };
