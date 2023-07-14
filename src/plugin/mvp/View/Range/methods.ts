import { helpers } from '../../../helpers';

const createElements = (root: HTMLDivElement) => {
  const range = helpers.createElement('slider__range');

  return { root, range };
};

const init = (root: HTMLDivElement) => {
  const dom = createElements(root);

  return { dom };
};

export { init };
