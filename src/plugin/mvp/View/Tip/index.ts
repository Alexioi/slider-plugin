import './tip.scss';

import { EventTypes } from '../../../types';
import { EventEmitter } from '../../../EventEmitter';
import { helpers } from '../../../helpers';
import { Dom } from './type';
import { createElements } from './methods';

class Tip extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props = { isRender: false };

  constructor(root: HTMLDivElement) {
    super();

    this.attachEventOnPointerDown = this.attachEventOnPointerDown.bind(this);

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render(hasTip: boolean) {
    if (!hasTip && this.props.isRender) {
      this.props = { isRender: false };
      this.destroy();
      return;
    }

    if (this.props.isRender) {
      return;
    }
    console.log(this.props.isRender);
    this.props = { isRender: true };

    this.dom.root.insertAdjacentElement('afterbegin', this.dom.tipLine);
    this.dom.tipLine.appendChild(this.dom.tipFrom);
    this.dom.tipLine.appendChild(this.dom.tipBoth);
    this.dom.tipLine.appendChild(this.dom.tipTo);
  }

  public update({
    isVertical,
    from,
    to,
    min,
    max,
    isRange,
  }: {
    isVertical: boolean;
    from: number;
    to: number;
    min: number;
    max: number;
    isRange: boolean;
  }) {
    this.changeText(from, to);
    this.changePosition(min, max, isVertical, from, to);

    if (isVertical) {
      this.dom.tipLine.classList.add('slider__tip-line_vertical');
    } else {
      this.dom.tipLine.classList.remove('slider__tip-line_vertical');
    }

    this.toggleDisplay(isRange, isVertical);
  }

  private destroy() {
    this.dom.tipLine.remove();
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElements(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers({ tipFrom, tipTo, tipBoth }: Dom) {
    tipFrom.addEventListener('pointerdown', this.attachEventOnPointerDown);

    tipTo.addEventListener('pointerdown', this.attachEventOnPointerDown);

    tipBoth.addEventListener('pointerdown', this.attachEventOnPointerDown);
  }

  private changePosition(min: number, max: number, isVertical: boolean, from: number, to: number) {
    const leftPosition = helpers.calculatePercent(from, min, max);
    const rightPosition = helpers.calculatePercent(to, min, max);

    const positionRightTip = isVertical ? `top: ${rightPosition}%;` : `left: ${rightPosition}%;`;

    const positionLeftTip = isVertical ? `top: ${leftPosition}%;` : `left: ${leftPosition}%;`;

    const positionBothTip = isVertical
      ? `top: ${(leftPosition + rightPosition) / 2}%;`
      : `left: ${(leftPosition + rightPosition) / 2}%;`;

    this.dom.tipFrom.style.cssText = positionLeftTip;
    this.dom.tipBoth.style.cssText = positionBothTip;
    this.dom.tipTo.style.cssText = positionRightTip;
  }

  private changeText(from: number, to: number) {
    const bothText = from === to ? String(to) : `${from} - ${to}`;

    this.dom.tipFrom.innerText = String(from);
    this.dom.tipTo.innerText = String(to);
    this.dom.tipBoth.innerText = bothText;
  }

  private toggleDisplay(isRange: boolean, isVertical: boolean) {
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

  private attachEventOnPointerDown(event: Event): void {
    // @ts-ignore
    const { valueIndex } = event.target;

    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();

      const node = pointerEvent.target;

      // @ts-ignore
      node.ondragstart = () => {
        return false;
      };

      // const position = helpers.getPosition(this.dom.root, pointerEvent, this.options.isVertical);
      const position = helpers.getPosition(this.dom.root, pointerEvent, false);

      if (typeof valueIndex === 'undefined') {
        this.emit('ChangedNearRunnerPosition', { position });
        return;
      }

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
