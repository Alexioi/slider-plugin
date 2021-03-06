import './tip.scss';

import { IOptions } from '../../../types/types';
import SubView from '../SubView/SubView';
import EventEmitter from '../../../EventEmitter/EventEmitter';

class Tip extends SubView {
  private tipLine!: HTMLDivElement;

  private tipFrom!: HTMLSpanElement;

  private tipTo!: HTMLSpanElement;

  private tipBoth!: HTMLSpanElement;

  constructor(node: HTMLDivElement, options: IOptions, eventEmitter: EventEmitter) {
    super(node, options, eventEmitter);

    this.init();
  }

  public render() {
    const { isVertical } = this.options;

    this.root.insertAdjacentElement('afterbegin', this.tipLine);
    this.tipLine.appendChild(this.tipFrom);
    this.tipLine.appendChild(this.tipBoth);
    this.tipLine.appendChild(this.tipTo);
    this.changeText();
    this.changePosition();

    if (isVertical) {
      this.tipLine.classList.add('slider__tip-line_vertical');
    } else {
      this.tipLine.classList.remove('slider__tip-line_vertical');
    }

    this.toggleDisplay();
  }

  public destroy() {
    this.tipLine.remove();
  }

  private init() {
    this.tipLine = SubView.getElement('slider__tip-line');
    this.tipFrom = SubView.getElement('slider__tip');
    this.tipBoth = SubView.getElement('slider__tip');
    this.tipTo = SubView.getElement('slider__tip');
  }

  private changePosition() {
    const { isVertical, values } = this.options;
    const leftPosition = this.calculatePercent(values[0]);
    const rightPosition = this.calculatePercent(values[1]);

    const positionRightTip = isVertical ? `top: ${rightPosition}%;` : `left: ${rightPosition}%;`;

    const positionLeftTip = isVertical ? `top: ${leftPosition}%;` : `left: ${leftPosition}%;`;

    const positionBothTip = isVertical
      ? `top: ${(leftPosition + rightPosition) / 2}%;`
      : `left: ${(leftPosition + rightPosition) / 2}%;`;

    this.tipFrom.style.cssText = positionLeftTip;
    this.tipBoth.style.cssText = positionBothTip;
    this.tipTo.style.cssText = positionRightTip;
  }

  private changeText() {
    const { values } = this.options;
    const bothText = values[0] === values[1] ? String(values[1]) : `${values[0]} - ${values[1]}`;

    this.tipFrom.innerText = String(values[0]);
    this.tipTo.innerText = String(values[1]);
    this.tipBoth.innerText = bothText;
  }

  private toggleDisplay() {
    const { isRange, isVertical } = this.options;

    if (!isRange) {
      this.tipFrom.remove();
      this.tipBoth.remove();
      return;
    }

    const positionTipFrom = this.tipFrom.getBoundingClientRect();
    const positionTipTo = this.tipTo.getBoundingClientRect();

    const isTipFromOverlapsTipTo = isVertical
      ? positionTipFrom.y + positionTipFrom.height >= positionTipTo.y
      : positionTipFrom.x + positionTipFrom.width >= positionTipTo.x;

    if (isTipFromOverlapsTipTo) {
      this.tipFrom.remove();
      this.tipTo.remove();
      return;
    }

    this.tipBoth.remove();
  }
}

export default Tip;
