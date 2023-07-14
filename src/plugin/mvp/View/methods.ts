import { Dom } from './type';

const createElements = (root: HTMLElement): Dom => {
  const slider = document.createElement('div');
  slider.classList.add('slider');

  const barContainer = document.createElement('div');
  barContainer.classList.add('slider__bar-container');
  root.appendChild(slider);

  slider.appendChild(barContainer);

  return { root, barContainer, slider };
};

export { createElements };
