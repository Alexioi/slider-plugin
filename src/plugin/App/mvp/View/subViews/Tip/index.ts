import { EventTypes } from '@types';
import { EventEmitter } from '@helpers/EventEmitter';
import { helpers } from '@helpers';

import { Dom, UpdateOptions } from './type';
import {
  changePosition,
  changeText,
  createElements,
  destroy,
  toggleDisplay,
} from './methods';
import { cssSelectors } from './constants';
import './tip.scss';

class Tip extends EventEmitter<EventTypes> {
  private dom: Dom;

  constructor(root: HTMLDivElement) {
    super();

    this.handlePointerdownTip = this.handlePointerdownTip.bind(this);

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render({
    hasTip,
    isRange,
    isVertical,
  }: {
    hasTip: boolean;
    isRange: boolean;
    isVertical: boolean;
  }) {
    if (!hasTip) {
      destroy(this.dom);
      return;
    }

    this.dom.root.insertAdjacentElement('afterbegin', this.dom.tipLine);

    if (isRange) {
      this.dom.tipLine.appendChild(this.dom.tipFrom);
      this.dom.tipLine.appendChild(this.dom.tipBoth);
    } else {
      this.dom.tipFrom.remove();
      this.dom.tipBoth.remove();
    }

    this.dom.tipLine.appendChild(this.dom.tipTo);

    if (isVertical) {
      this.dom.tipLine.classList.add(cssSelectors.verticalTipLine);
    } else {
      this.dom.tipLine.classList.remove(cssSelectors.verticalTipLine);
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

    const handlePointerMove = (pointerEvent: PointerEvent): void => {
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
        this.emit('ChangeNearRunnerPosition', { position });
        return;
      }

      if (customType === 'from' || customType === 'to') {
        this.emit('ChangeRunnerPosition', { position, type: customType });
      }
    };

    const handlePointerUp = (): void => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }
}

export { Tip };
