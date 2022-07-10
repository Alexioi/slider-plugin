import { IOptions } from '../../../types/types';
import EventEmitter from '../../../EventEmitter/EventEmitter';

abstract class SubView {
  protected root: HTMLDivElement;

  protected options: IOptions;

  protected eventEmitter: EventEmitter;

  constructor(node: HTMLDivElement, options: IOptions, eventEmitter: EventEmitter) {
    this.root = node;
    this.options = options;
    this.eventEmitter = eventEmitter;
  }

  protected calculatePercent(value: number): number {
    const { min, max } = this.options;
    const percent = ((value - min) / (max - min)) * 100;

    return percent;
  }

  protected static getElement(className: string): HTMLDivElement {
    const node = document.createElement('div');
    node.classList.add(className);
    return node;
  }

  protected getPosition(node: HTMLElement, event: PointerEvent): number {
    const { isVertical } = this.options;
    const { height, width, left, top } = node.getBoundingClientRect();

    const { clientX, clientY } = event;

    if (isVertical) {
      return (clientY - top) / height;
    }

    return (clientX - left) / width;
  }
}

export default SubView;
