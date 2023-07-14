import { helpers } from '../../../helpers';
import { Dom } from './type';

const createElement = (root: HTMLDivElement): Dom => {
  const scale = helpers.createElement('slider__scale');

  return { root, scale };
};

const getScalePercents = (sliderLength: number): number[] => {
  if (sliderLength > 800) {
    return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  }

  if (sliderLength > 500) {
    return [0, 20, 40, 60, 80, 100];
  }

  if (sliderLength > 300) {
    return [0, 33, 66, 100];
  }

  return [0, 100];
};

export { createElement, getScalePercents };
