import { helpers } from '@helpers/index';

import { CSSSelectors } from './constants';
import { Dom } from './type';

const createElements = (root: HTMLElement): Dom => {
  const bar = helpers.createElement(CSSSelectors.bar);

  return { root, bar };
};

export { createElements };
