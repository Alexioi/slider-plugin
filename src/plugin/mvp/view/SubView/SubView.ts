import { IOptions, IPosition } from '../../../types/types';
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

  protected static getElement(className: string): HTMLDivElement {
    const node = document.createElement('div');
    node.classList.add(className);
    return node;
  }

  protected static getPosition(node: HTMLElement, event: PointerEvent): IPosition {
    const { height, width, left, top } = node.getBoundingClientRect();

    const { clientX, clientY } = event;

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    return { x, y };
  }
}

export default SubView;
