import { EventTypes } from '@types';
import { EventEmitter } from '@helpers/EventEmitter';

import { Dom, Props, RenderProps } from './type';
import { createElement, destroy, update } from './methods';
import './style.scss';

class Scale extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props: Props = {
    min: 0,
    max: 0,
    isVertical: false,
  };

  constructor(root: HTMLDivElement) {
    super();

    this.handleScalePointerdown = this.handleScalePointerdown.bind(this);
    this.handleWindowsResize = this.handleWindowsResize.bind(this);

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render({ min, max, isVertical, hasScale }: RenderProps): void {
    if (!hasScale) {
      destroy(this.dom);
      return;
    }

    this.props = { min, max, isVertical };

    this.dom.root.append(this.dom.scale);

    update(this.dom, this.props);
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElement(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers({ scale }: Dom): Scale {
    scale.addEventListener('pointerdown', this.handleScalePointerdown);
    window.addEventListener('resize', this.handleWindowsResize);

    return this;
  }

  private handleScalePointerdown({ target }: PointerEvent): void {
    if (!(target instanceof HTMLDivElement)) {
      return;
    }

    if (!('customValue' in target)) {
      return;
    }

    const targetNumber = Number(target.customValue);

    this.emit('ClickScale', { targetNumber });
  }

  private handleWindowsResize(): void {
    update(this.dom, this.props);
  }
}

export { Scale };
