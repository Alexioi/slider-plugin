import { helpers } from '@helpers';

import { Dom, HTMLDivElementWithCustomType, UpdateOptions } from './type';
import { cssSelectors } from './constants';

const createElements = (root: HTMLDivElement): Dom => {
  const tipLine = helpers.createElement(cssSelectors.tipLine);
  const tipFrom = helpers.createElement(
    cssSelectors.tip,
  ) as HTMLDivElementWithCustomType;
  const tipBoth = helpers.createElement(
    cssSelectors.tip,
  ) as HTMLDivElementWithCustomType;
  const tipTo = helpers.createElement(
    cssSelectors.tip,
  ) as HTMLDivElementWithCustomType;

  tipFrom.customType = 'from';
  tipBoth.customType = 'both';
  tipTo.customType = 'to';

  return { root, tipLine, tipFrom, tipBoth, tipTo };
};

const toggleDisplay = (
  { isRange, isVertical }: { isRange: boolean; isVertical: boolean },
  { tipFrom, tipTo, tipBoth }: Dom,
): void => {
  if (!isRange) {
    tipTo.classList.remove(cssSelectors.hiddenTip);
    return;
  }

  const { x, y, height, width } = tipFrom.getBoundingClientRect();
  const positionTipTo = tipTo.getBoundingClientRect();
  const isTipFromOverlapsTipTo = isVertical
    ? y + height >= positionTipTo.y
    : x + width >= positionTipTo.x;

  if (isTipFromOverlapsTipTo) {
    tipFrom.classList.add(cssSelectors.hiddenTip);
    tipBoth.classList.remove(cssSelectors.hiddenTip);
    tipTo.classList.add(cssSelectors.hiddenTip);
    return;
  }

  tipFrom.classList.remove(cssSelectors.hiddenTip);
  tipBoth.classList.add(cssSelectors.hiddenTip);
  tipTo.classList.remove(cssSelectors.hiddenTip);
};

const changePosition = (
  { min, max, isVertical, from, to, isRange }: UpdateOptions,
  { tipBoth, tipFrom, tipTo }: Dom,
): void => {
  const changedTipTo = tipTo;
  const rightPosition = helpers.calculatePercent(to, min, max);
  const positionRightTip = isVertical
    ? `top: ${rightPosition}%;`
    : `left: ${rightPosition}%;`;

  changedTipTo.style.cssText = positionRightTip;

  if (!isRange) {
    return;
  }

  const changedTipFrom = tipFrom;
  const changedTipBoth = tipBoth;
  const leftPosition = helpers.calculatePercent(from, min, max);
  const positionLeftTip = isVertical
    ? `top: ${leftPosition}%;`
    : `left: ${leftPosition}%;`;
  const positionBothTip = isVertical
    ? `top: ${(leftPosition + rightPosition) / 2}%;`
    : `left: ${(leftPosition + rightPosition) / 2}%;`;

  changedTipFrom.style.cssText = positionLeftTip;
  changedTipBoth.style.cssText = positionBothTip;
};

const destroy = ({ tipLine }: Dom) => {
  tipLine.remove();
};

const changeText = (
  { from, to, isRange }: { from: number; to: number; isRange: boolean },
  { tipFrom, tipTo, tipBoth }: Dom,
  {
    format,
  }: {
    format: (value: number) => string;
  },
) => {
  const changedTipTo = tipTo;
  changedTipTo.innerText = format(to);

  if (!isRange) {
    return;
  }

  const changedTipFrom = tipFrom;
  const changedTipBoth = tipBoth;
  const bothText = from === to ? format(to) : `${format(from)} - ${format(to)}`;

  changedTipFrom.innerText = format(from);
  changedTipBoth.innerText = bothText;
};

export { createElements, toggleDisplay, changePosition, destroy, changeText };
