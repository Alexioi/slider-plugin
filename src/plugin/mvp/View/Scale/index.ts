import './scale.scss';
import { EventTypes } from '../../../types';
import { EventEmitter } from '../../../EventEmitter';
import { Dom, Props, RenderProps } from './type';
import { createElement, destroy, update } from './methods';

class Scale extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props: Props = {
    min: 0,
    max: 100,
    isVertical: false,
    isRender: false,
  };

  constructor(root: HTMLDivElement) {
    super();

    this.handlePointerdownScale = this.handlePointerdownScale.bind(this);
    this.handleWindowsResize = this.handleWindowsResize.bind(this);

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render({ min, max, isVertical, hasScale }: RenderProps): void {
    if (!hasScale && this.props.isRender) {
      this.props = { min, max, isVertical, isRender: false };
      destroy(this.dom);
      return;
    }

    if (!hasScale) {
      return;
    }

    this.props = { min, max, isVertical, isRender: true };

    this.dom.root.appendChild(this.dom.scale);

    update(this.dom, this.props);
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElement(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers({ scale }: Dom) {
    scale.addEventListener('pointerdown', this.handlePointerdownScale);
    window.addEventListener('resize', this.handleWindowsResize);
  }

  private handlePointerdownScale(pointerEvent: PointerEvent): void {
    if (!(pointerEvent.target instanceof Element)) {
      return;
    }

    if (!('pluginData' in pointerEvent.target)) {
      return;
    }

    const targetNumber = Number(pointerEvent.target.pluginData);

    this.emit('ClickScale', { targetNumber });
  }

  private handleWindowsResize(): void {
    update(this.dom, this.props);
  }
}

export { Scale };
