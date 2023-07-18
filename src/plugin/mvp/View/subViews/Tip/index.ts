import './tip.scss';

import { EventTypes } from '../../../../types';
import { EventEmitter } from '../../../../EventEmitter';
import { helpers } from '../../../../helpers';
import { Dom, UpdateOptions } from './type';
import { changePosition, changeText, createElements, destroy, toggleDisplay } from './methods';

class Tip extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props = { isRender: false };

  constructor(root: HTMLDivElement) {
    super();

    this.handlePointerdownTip = this.handlePointerdownTip.bind(this);

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render(hasTip: boolean, isRange: boolean, isVertical: boolean) {
    if (!hasTip && this.props.isRender) {
      this.props = { isRender: false };
      destroy(this.dom);
      return;
    }

    if (this.props.isRender) {
      return;
    }

    this.props = { isRender: true };

    this.dom.root.insertAdjacentElement('afterbegin', this.dom.tipLine);

    if (isRange) {
      this.dom.tipLine.appendChild(this.dom.tipFrom);
      this.dom.tipLine.appendChild(this.dom.tipBoth);
    }

    this.dom.tipLine.appendChild(this.dom.tipTo);

    if (isVertical) {
      this.dom.tipLine.classList.add('slider__tip-line_vertical');
    } else {
      this.dom.tipLine.classList.remove('slider__tip-line_vertical');
    }
  }

  public update(updateOptions: UpdateOptions) {
    const { dom } = this;

    changeText(updateOptions, dom);
    changePosition(updateOptions, dom);
    toggleDisplay(updateOptions, dom);
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElements(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers({ tipFrom, tipTo, tipBoth }: Dom): Tip {
    tipFrom.addEventListener('pointerdown', this.handlePointerdownTip);
    tipTo.addEventListener('pointerdown', this.handlePointerdownTip);
    tipBoth.addEventListener('pointerdown', this.handlePointerdownTip);

    return this;
  }

  private handlePointerdownTip({ target }: Event): void {
    if (target === null) {
      return;
    }

    if (!('customType' in target)) {
      return;
    }

    const { customType } = target;

    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();

      const node = pointerEvent.target;

      if (!(node instanceof HTMLElement)) {
        return;
      }

      node.ondragstart = () => {
        return false;
      };

      const position = helpers.getPosition(this.dom.root, pointerEvent);

      if (customType === 'both') {
        this.emit('ChangedNearRunnerPosition', { position });
        return;
      }

      if (customType === 'from' || customType === 'to') {
        this.emit('ChangedRunnerPosition', { position, type: customType });
      }
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
