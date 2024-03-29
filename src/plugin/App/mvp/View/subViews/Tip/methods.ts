import { helpers } from '@helpers';

import { Dom, UpdateOptions } from './type';
import { CSSSelectors } from './constants';

const createElements = (root: HTMLDivElement): Dom => {
  const tipLine = helpers.createElement(CSSSelectors.tipLine);
  const tipFrom = helpers.createElement(CSSSelectors.tip);
  const tipBoth = helpers.createElement(CSSSelectors.tip);
  const tipTo = helpers.createElement(CSSSelectors.tip);

  return { root, tipLine, tipFrom, tipBoth, tipTo };
};

const toggleDisplay = (
  { isRange, isVertical }: { isRange: boolean; isVertical: boolean },
  { tipFrom, tipTo, tipBoth }: Dom,
): void => {
  if (!isRange) {
    tipTo.classList.remove(CSSSelectors.hiddenTip);
    return;
  }

  const { x, y, height, width } = tipFrom.getBoundingClientRect();
  const positionTipTo = tipTo.getBoundingClientRect();
  const isTipFromOverlapsTipTo = isVertical
    ? y + height >= positionTipTo.y
    : x + width >= positionTipTo.x;

  if (isTipFromOverlapsTipTo) {
    tipFrom.classList.add(CSSSelectors.hiddenTip);
    tipBoth.classList.remove(CSSSelectors.hiddenTip);
    tipTo.classList.add(CSSSelectors.hiddenTip);
    return;
  }

  tipFrom.classList.remove(CSSSelectors.hiddenTip);
  tipBoth.classList.add(CSSSelectors.hiddenTip);
  tipTo.classList.remove(CSSSelectors.hiddenTip);
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
  values: { from: string; to: string },
) => {
  const changedTipTo = tipTo;
  changedTipTo.innerText = values.to;

  if (!isRange) {
    return;
  }

  const changedTipFrom = tipFrom;
  const changedTipBoth = tipBoth;
  const bothText = from === to ? values.to : `${values.from} - ${values.to}`;

  changedTipFrom.innerText = values.from;
  changedTipBoth.innerText = bothText;
};

export { createElements, toggleDisplay, changePosition, destroy, changeText };
