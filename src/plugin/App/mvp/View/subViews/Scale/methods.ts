import { helpers } from '@helpers';
import { MarkParameters } from '@types';

import { Dom, HTMLDivElementWithCustomData, Props } from './type';
import { cssSelectors } from './constants';

const createElement = (root: HTMLDivElement): Dom => {
  const scale = helpers.createElement(cssSelectors.scale);

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

const deleteMarks = ({ scale }: Dom): void => {
  const peelableScale = scale;

  peelableScale.innerHTML = '';
};

const calculateScaleParameters = (
  { max, min, isVertical }: Props,
  { scale }: Dom,
): MarkParameters[] => {
  const { offsetHeight, offsetWidth } = scale;
  const scaleLength = isVertical ? offsetHeight : offsetWidth;
  const scalePercents = getScalePercents(scaleLength);

  const differenceMaxAndMin = Math.abs(max - min);

  const scaleParameters = scalePercents.map((el) => {
    const value = Number(
      (min + (differenceMaxAndMin * el) / 100).toFixed(1).replace(/\.?0+$/, ''),
    );

    return { percent: el, value };
  });

  return scaleParameters;
};

const draw = (
  { scale }: Dom,
  { isVertical }: Props,
  parameters: MarkParameters[],
): void => {
  const changeScale = scale;
  let markLength = 0;

  parameters.forEach((el, i) => {
    const { percent, value } = el;
    const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;
    const mark = document.createElement('div') as HTMLDivElementWithCustomData;
    mark.classList.add(cssSelectors.mark);
    mark.style.cssText = style;
    mark.innerText = String(value);
    mark.customValue = Number(value);

    scale.append(mark);

    if (isVertical) {
      const { width } = mark.getBoundingClientRect();

      if (width > markLength) {
        markLength = width;
        changeScale.style.cssText = `width: ${markLength}px`;
      }
      return;
    }

    if (i === 0) {
      const { height } = mark.getBoundingClientRect();
      changeScale.style.cssText = `height: ${height}px`;
    }
  });
};

const destroy = ({ scale }: Dom): void => {
  scale.remove();
};

const update = (dom: Dom, props: Props) => {
  deleteMarks(dom);

  const scaleParameters = calculateScaleParameters(props, dom);

  draw(dom, props, scaleParameters);
};

export { createElement, getScalePercents, destroy, update };
