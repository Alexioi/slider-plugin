import './tip.scss';

import { IOptions, ITarget, EventTypes } from '../../../types/types';
import SubView from '../SubView';
import { EventEmitter } from '../../../EventEmitter';

type TipNode = {
  node: HTMLSpanElement;
  valueIndex?: 0 | 1;
};

class Tip extends SubView {
  private tipLine!: HTMLDivElement;

  private tipFrom!: HTMLSpanElement;

  private tipTo!: HTMLSpanElement;

  private tipBoth!: HTMLSpanElement;

  private target: ITarget;

  constructor(
    node: Element,
    options: IOptions,
    eventEmitter: EventEmitter<EventTypes>,
    target: ITarget,
  ) {
    super(node, options, eventEmitter);

    this.target = target;

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

    this.tipFrom.addEventListener(
      'pointerdown',
      this.attachEventOnPointerDown.bind(this, { node: this.tipFrom, valueIndex: 0 }),
    );

    this.tipTo.addEventListener(
      'pointerdown',
      this.attachEventOnPointerDown.bind(this, { node: this.tipTo, valueIndex: 1 }),
    );

    this.tipBoth.addEventListener(
      'pointerdown',
      this.attachEventOnPointerDown.bind(this, { node: this.tipBoth }),
    );
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

  private attachEventOnPointerDown({ node, valueIndex }: TipNode): void {
    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();

      const thisNode = node;
      thisNode.ondragstart = () => {
        return false;
      };

      const position = this.getPosition(this.root, pointerEvent);

      if (typeof valueIndex === 'undefined') {
        this.eventEmitter.emit('ChangedNearRunnerPosition', { position });
        return;
      }

      this.target.valueIndex = valueIndex;

      this.eventEmitter.emit('ChangedRunnerPosition', { position, valueIndex });
    };

    const onPointerUp = (): void => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }
}

export default Tip;
