import { EventTypes, IOptions } from '../../../types/types';
import { EventEmitter } from '../../../EventEmitter';

abstract class SubView {
  protected root: Element;

  protected options: IOptions;

  protected eventEmitter: EventEmitter<EventTypes>;

  constructor(root: Element, options: IOptions, eventEmitter: EventEmitter<EventTypes>) {
    this.root = root;
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

  protected getPosition(node: Element, event: PointerEvent): number {
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
