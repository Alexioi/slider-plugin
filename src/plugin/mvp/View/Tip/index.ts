import './tip.scss';

import { IOptions, ITarget, EventTypes } from '../../../types';
import { EventEmitter } from '../../../EventEmitter';
import { helpers } from '../../../helpers';
import { Dom } from './type';
import { createElements } from './methods';

type TipNode = {
  node: HTMLSpanElement;
  valueIndex?: 0 | 1;
};

class Tip extends EventEmitter<EventTypes> {
  private dom: Dom;

  private target: ITarget;

  private options: IOptions;

  constructor(root: HTMLDivElement, options: IOptions, target: ITarget) {
    super();

    this.options = options;

    this.target = target;

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render() {
    const { isVertical } = this.options;

    this.dom.root.insertAdjacentElement('afterbegin', this.dom.tipLine);
    this.dom.tipLine.appendChild(this.dom.tipFrom);
    this.dom.tipLine.appendChild(this.dom.tipBoth);
    this.dom.tipLine.appendChild(this.dom.tipTo);
    this.changeText();
    this.changePosition();

    if (isVertical) {
      this.dom.tipLine.classList.add('slider__tip-line_vertical');
    } else {
      this.dom.tipLine.classList.remove('slider__tip-line_vertical');
    }

    this.toggleDisplay();
  }

  public destroy() {
    this.dom.tipLine.remove();
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElements(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers({ tipFrom, tipTo, tipBoth }: Dom) {
    tipFrom.addEventListener(
      'pointerdown',
      this.attachEventOnPointerDown.bind(this, { node: tipFrom, valueIndex: 0 }),
    );

    tipTo.addEventListener(
      'pointerdown',
      this.attachEventOnPointerDown.bind(this, { node: tipTo, valueIndex: 1 }),
    );

    tipBoth.addEventListener(
      'pointerdown',
      this.attachEventOnPointerDown.bind(this, { node: tipBoth }),
    );
  }

  private changePosition() {
    const { isVertical, values } = this.options;
    const leftPosition = helpers.calculatePercent(values[0], this.options.min, this.options.max);
    const rightPosition = helpers.calculatePercent(values[1], this.options.min, this.options.max);

    const positionRightTip = isVertical ? `top: ${rightPosition}%;` : `left: ${rightPosition}%;`;

    const positionLeftTip = isVertical ? `top: ${leftPosition}%;` : `left: ${leftPosition}%;`;

    const positionBothTip = isVertical
      ? `top: ${(leftPosition + rightPosition) / 2}%;`
      : `left: ${(leftPosition + rightPosition) / 2}%;`;

    this.dom.tipFrom.style.cssText = positionLeftTip;
    this.dom.tipBoth.style.cssText = positionBothTip;
    this.dom.tipTo.style.cssText = positionRightTip;
  }

  private changeText() {
    const { values } = this.options;
    const bothText = values[0] === values[1] ? String(values[1]) : `${values[0]} - ${values[1]}`;

    this.dom.tipFrom.innerText = String(values[0]);
    this.dom.tipTo.innerText = String(values[1]);
    this.dom.tipBoth.innerText = bothText;
  }

  private toggleDisplay() {
    const { isRange, isVertical } = this.options;

    if (!isRange) {
      this.dom.tipFrom.remove();
      this.dom.tipBoth.remove();
      return;
    }

    const positionTipFrom = this.dom.tipFrom.getBoundingClientRect();
    const positionTipTo = this.dom.tipTo.getBoundingClientRect();

    const isTipFromOverlapsTipTo = isVertical
      ? positionTipFrom.y + positionTipFrom.height >= positionTipTo.y
      : positionTipFrom.x + positionTipFrom.width >= positionTipTo.x;

    if (isTipFromOverlapsTipTo) {
      this.dom.tipFrom.remove();
      this.dom.tipTo.remove();
      return;
    }

    this.dom.tipBoth.remove();
  }

  private attachEventOnPointerDown({ node, valueIndex }: TipNode): void {
    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();

      const thisNode = node;
      thisNode.ondragstart = () => {
        return false;
      };

      const position = helpers.getPosition(this.dom.root, pointerEvent, this.options.isVertical);

      if (typeof valueIndex === 'undefined') {
        this.emit('ChangedNearRunnerPosition', { position });
        return;
      }

      this.target.valueIndex = valueIndex;

      this.emit('ChangedRunnerPosition', { position, valueIndex });
    };

    const onPointerUp = (): void => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }
}

export { Tip };
