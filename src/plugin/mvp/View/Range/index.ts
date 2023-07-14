import './range.scss';

import { EventTypes, IOptions } from '../../../types/types';
import SubView from '../SubView';
import { EventEmitter } from '../../../EventEmitter';

class Range extends SubView {
  private range: Element | null = null;

  constructor(root: Element, options: IOptions, eventEmitter: EventEmitter<EventTypes>) {
    super(root, options, eventEmitter);

    this.init();
  }

  public render(): void {
    const { isVertical, isRange, values } = this.options;

    if (this.range instanceof HTMLElement) {
      this.root.appendChild(this.range);

      const startPercent = isRange ? this.calculatePercent(values[0]) : 0;
      const finishPercent = this.calculatePercent(values[1]);

      if (isVertical) {
        this.range.style.cssText = `top: ${startPercent}%; bottom: ${100 - finishPercent}%`;
      } else {
        this.range.style.cssText = `left: ${startPercent}%; right: ${100 - finishPercent}%`;
      }
    }
  }

  private init(): void {
    this.range = SubView.getElement('slider__range');
  }
}

export default Range;
