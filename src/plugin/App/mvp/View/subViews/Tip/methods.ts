import { helpers } from '../../../../../helpers';
import { Dom, HTMLDivElementWithCustomType, UpdateOptions } from './type';

const createElements = (root: HTMLDivElement): Dom => {
  const tipLine = helpers.createElement('slider__tip-line');
  const tipFrom = helpers.createElement('slider__tip') as HTMLDivElementWithCustomType;
  const tipBoth = helpers.createElement('slider__tip') as HTMLDivElementWithCustomType;
  const tipTo = helpers.createElement('slider__tip') as HTMLDivElementWithCustomType;

  tipFrom.customType = 'from';
  tipBoth.customType = 'both';
  tipTo.customType = 'to';

  return { root, tipLine, tipFrom, tipBoth, tipTo };
};

const toggleDisplay = (
  { isRange, isVertical }: { isRange: boolean; isVertical: boolean },
  { tipFrom, tipTo, tipBoth }: Dom,
): void => {
  const changedTipFrom = tipFrom;
  const changedTipBoth = tipBoth;
  const changedTipTo = tipTo;

  if (!isRange) {
    changedTipFrom.style.display = 'none';
    changedTipBoth.style.display = 'none';
    changedTipTo.style.display = 'block';
    return;
  }

  const { x, y, height, width } = tipFrom.getBoundingClientRect();
  const positionTipTo = tipTo.getBoundingClientRect();
  const isTipFromOverlapsTipTo = isVertical
    ? y + height >= positionTipTo.y
    : x + width >= positionTipTo.x;

  if (isTipFromOverlapsTipTo) {
    changedTipFrom.style.display = 'none';
    changedTipBoth.style.display = 'block';
    changedTipTo.style.display = 'none';
    return;
  }

  changedTipFrom.style.display = 'block';
  changedTipBoth.style.display = 'none';
  changedTipTo.style.display = 'block';
};

const changePosition = (
  { min, max, isVertical, from, to }: UpdateOptions,
  { tipBoth, tipFrom, tipTo }: Dom,
): void => {
  const changedTipFrom = tipFrom;
  const changedTipBoth = tipBoth;
  const changedTipTo = tipTo;
  const leftPosition = helpers.calculatePercent(from, min, max);
  const rightPosition = helpers.calculatePercent(to, min, max);
  const positionRightTip = isVertical ? `top: ${rightPosition}%;` : `left: ${rightPosition}%;`;
  const positionLeftTip = isVertical ? `top: ${leftPosition}%;` : `left: ${leftPosition}%;`;
  const positionBothTip = isVertical
    ? `top: ${(leftPosition + rightPosition) / 2}%;`
    : `left: ${(leftPosition + rightPosition) / 2}%;`;

  changedTipFrom.style.cssText = positionLeftTip;
  changedTipBoth.style.cssText = positionBothTip;
  changedTipTo.style.cssText = positionRightTip;
};

const destroy = ({ tipLine }: Dom) => {
  tipLine.remove();
};

const changeText = (
  { from, to }: { from: number; to: number },
  { tipFrom, tipTo, tipBoth }: Dom,
) => {
  const changedTipFrom = tipFrom;
  const changedTipBoth = tipBoth;
  const changedTipTo = tipTo;
  const bothText = from === to ? String(to) : `${from} - ${to}`;

  changedTipFrom.innerText = String(from);
  changedTipBoth.innerText = bothText;
  changedTipTo.innerText = String(to);
};

export { createElements, toggleDisplay, changePosition, destroy, changeText };
