import { helpers } from '../../../helpers';
import { IMarkParameters } from '../../../types';
import { Dom, Props } from './type';

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

const deleteMarks = ({ scale }: Dom): void => {
  while (scale.firstChild !== null) {
    scale.removeChild(scale.firstChild);
  }
};

const getScaleParameters = ({ max, min, isVertical }: Props, { scale }: Dom): IMarkParameters[] => {
  const { offsetHeight, offsetWidth } = scale;
  const scaleLength = isVertical ? offsetHeight : offsetWidth;
  const scalePercents = getScalePercents(scaleLength);

  const differenceMaxAndMin = Math.abs(max - min);

  const scaleParameters = scalePercents.map((percent) => {
    const text = (min + (differenceMaxAndMin * percent) / 100).toFixed(1).replace(/\.?0+$/, '');

    return { percent, text };
  });

  return scaleParameters;
};

const draw = ({ scale }: Dom, { isVertical }: Props, parameters: IMarkParameters[]): void => {
  parameters.forEach((parameter) => {
    const { percent, text } = parameter;
    const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;
    const mark = document.createElement('span');
    mark.classList.add('slider__mark');
    mark.style.cssText = style;
    mark.innerText = text;
    // @ts-ignore
    mark.pluginData = Number(text);

    scale.appendChild(mark);
  });
};

const destroy = ({ scale }: Dom): void => {
  scale.remove();
};

const update = (dom: Dom, props: Props) => {
  deleteMarks(dom);

  const scaleParameters = getScaleParameters(props, dom);

  draw(dom, props, scaleParameters);
};

export { createElement, getScalePercents, destroy, update };
