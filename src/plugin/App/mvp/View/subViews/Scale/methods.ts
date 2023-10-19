import { helpers } from '@helpers';
import { MarkParameters } from '@types';

import { Dom, HTMLDivElementWithCustomData, Props } from './type';
import { CSSSelectors } from './constants';

const createElement = (root: HTMLDivElement): Dom => {
  const scale = helpers.createElement(CSSSelectors.scale);

  return { root, scale };
};

const getScalePercents = (length: number): number[] => {
  if (length > 800) {
    return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  }

  if (length > 500) {
    return [0, 20, 40, 60, 80, 100];
  }

  if (length > 300) {
    return [0, 33, 66, 100];
  }

  return [0, 100];
};

const deleteMarks = ({ scale }: Dom): void => {
  const peelableScale = scale;

  peelableScale.innerHTML = '';
};

const getLess = (firstNumber: number, secondNumber: number) => {
  if (firstNumber > secondNumber) {
    return secondNumber;
  }

  return firstNumber;
};

const getFrequencyFactorOfMarks = (
  length: number,
  differenceMaxAndMin: number,
  step: number,
): number => {
  const frequencyFactorOfMarks = Math.round(differenceMaxAndMin / step);

  if (length > 800) {
    return getLess(10, frequencyFactorOfMarks);
  }

  if (length > 500) {
    return getLess(5, frequencyFactorOfMarks);
  }

  if (length > 300) {
    return getLess(3, frequencyFactorOfMarks);
  }

  return 1;
};

const calculateScaleParameters = (
  { max, min, step, isVertical }: Props,
  { scale }: Dom,
): MarkParameters[] => {
  const differenceMaxAndMin = Math.abs(max - min);
  const { offsetHeight, offsetWidth } = scale;
  const scaleLength = isVertical ? offsetHeight : offsetWidth;

  if (step === 'none') {
    const scalePercents = getScalePercents(scaleLength);

    const scaleParameters = scalePercents.map((el) => {
      const value = Number(
        (min + (differenceMaxAndMin * el) / 100)
          .toFixed(1)
          .replace(/\.?0+$/, ''),
      );

      return { percent: el, value };
    });

    return scaleParameters;
  }

  const length = getFrequencyFactorOfMarks(
    scaleLength,
    differenceMaxAndMin,
    step,
  );

  const frequencyFactorOfMarks = Math.round(
    differenceMaxAndMin / length / step,
  );

  const arrayIncreasingNumbers = Array.from({ length }, (_, i) => i);

  const scaleParameters = arrayIncreasingNumbers.map((el) => {
    const value = min + frequencyFactorOfMarks * step * el;

    const percent = Math.abs((min - value) / differenceMaxAndMin) * 100;

    return { percent, value };
  });

  return [...scaleParameters, { percent: 100, value: max }];
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
    mark.classList.add(CSSSelectors.mark);
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

  dom.root.append(dom.scale);

  const scaleParameters = calculateScaleParameters(props, dom);

  draw(dom, props, scaleParameters);
};

export { createElement, getScalePercents, destroy, update };
