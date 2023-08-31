import { ViewEvents } from '@types';
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
import './style.scss';

class Tip extends EventEmitter<ViewEvents> {
  private dom: Dom;

  private handleFromTipPointerdown: ({ target }: Event) => void;

  private handleBothTipPointerdown: ({ target }: Event) => void;

  private handleToTipPointerdown: ({ target }: Event) => void;

  constructor(root: HTMLDivElement) {
    super();

    this.handleFromTipPointerdown =
      this.makeHandlePointerdownTip('from').bind(this);
    this.handleBothTipPointerdown =
      this.makeHandlePointerdownTip('both').bind(this);
    this.handleToTipPointerdown =
      this.makeHandlePointerdownTip('to').bind(this);

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render({ hasTip, isRange }: { hasTip: boolean; isRange: boolean }) {
    if (!hasTip) {
      destroy(this.dom);
      return;
    }

    this.dom.root.insertAdjacentElement('afterbegin', this.dom.tipLine);

    if (isRange) {
      this.dom.tipLine.append(this.dom.tipFrom);
      this.dom.tipLine.append(this.dom.tipBoth);
    } else {
      this.dom.tipFrom.remove();
      this.dom.tipBoth.remove();
    }

    this.dom.tipLine.append(this.dom.tipTo);
  }

  public update(
    updateOptions: UpdateOptions,
    values: { from: string; to: string },
  ) {
    const { dom } = this;

    changeText(updateOptions, dom, values);
    changePosition(updateOptions, dom);
    toggleDisplay(updateOptions, dom);
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElements(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers({ tipFrom, tipTo, tipBoth }: Dom): Tip {
    tipFrom.addEventListener('pointerdown', this.handleFromTipPointerdown);
    tipBoth.addEventListener('pointerdown', this.handleBothTipPointerdown);
    tipTo.addEventListener('pointerdown', this.handleToTipPointerdown);

    return this;
  }

  private makeHandlePointerdownTip(
    type: 'from' | 'both' | 'to',
  ): ({ target }: Event) => void {
    return ({ target }: Event) => {
      if (target === null) {
        return;
      }

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

        if (type === 'both') {
          this.emit('changeNearRunnerPosition', { position });
          return;
        }

        if (type === 'from' || type === 'to') {
          this.emit('changeRunnerPosition', { position, type });
        }
      };

      const handlePointerUp = (): void => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };
  }
}

export { Tip };
