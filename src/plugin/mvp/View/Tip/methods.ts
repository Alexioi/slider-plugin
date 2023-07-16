import { helpers } from '../../../helpers';
import { Dom } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const tipLine = helpers.createElement('slider__tip-line');
  const tipFrom = helpers.createElement('slider__tip');
  const tipBoth = helpers.createElement('slider__tip');
  const tipTo = helpers.createElement('slider__tip');
  // @ts-ignore
  tipFrom.valueIndex = 0;
  // @ts-ignore
  tipTo.valueIndex = 1;

  return { root, tipLine, tipFrom, tipBoth, tipTo };
};

const toggleDisplay = (
  isRange: boolean,
  isVertical: boolean,
  { tipFrom, tipTo, tipBoth }: Dom,
): void => {
  if (!isRange) {
    return;
  }

  const { x, y, height, width } = tipFrom.getBoundingClientRect();
  const positionTipTo = tipTo.getBoundingClientRect();

  const isTipFromOverlapsTipTo = isVertical
    ? y + height >= positionTipTo.y
    : x + width >= positionTipTo.x;

  if (isTipFromOverlapsTipTo) {
    tipFrom.style.display = 'none';
    tipTo.style.display = 'none';
    tipBoth.style.display = 'block';

    return;
  }

  tipFrom.style.display = 'block';
  tipTo.style.display = 'block';
  tipBoth.style.display = 'none';
};

const changePosition = (
  min: number,
  max: number,
  isVertical: boolean,
  from: number,
  to: number,
  { tipBoth, tipFrom, tipTo }: Dom,
): void => {
  const leftPosition = helpers.calculatePercent(from, min, max);
  const rightPosition = helpers.calculatePercent(to, min, max);

  const positionRightTip = isVertical ? `top: ${rightPosition}%;` : `left: ${rightPosition}%;`;

  const positionLeftTip = isVertical ? `top: ${leftPosition}%;` : `left: ${leftPosition}%;`;

  const positionBothTip = isVertical
    ? `top: ${(leftPosition + rightPosition) / 2}%;`
    : `left: ${(leftPosition + rightPosition) / 2}%;`;

  tipFrom.style.cssText = positionLeftTip;
  tipBoth.style.cssText = positionBothTip;
  tipTo.style.cssText = positionRightTip;
};

const destroy = ({ tipLine }: Dom) => {
  tipLine.remove();
};

const changeText = (from: number, to: number, { tipFrom, tipTo, tipBoth }: Dom) => {
  const bothText = from === to ? String(to) : `${from} - ${to}`;

  tipFrom.innerText = String(from);
  tipTo.innerText = String(to);
  tipBoth.innerText = bothText;
};

export { createElements, toggleDisplay, changePosition, destroy, changeText };
