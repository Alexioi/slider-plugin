import './range.scss';

import { IOptions } from '../../../types';
import { helpers } from '../../../helpers';

class Range {
  private range: Element | null = null;

  private options: IOptions;

  private root: Element;

  constructor(root: Element, options: IOptions) {
    this.root = root;

    this.options = options;

    this.init();
  }

  public render(): void {
    const { isVertical, isRange, values } = this.options;

    if (this.range instanceof HTMLElement) {
      this.root.appendChild(this.range);

      const startPercent = isRange
        ? helpers.calculatePercent(values[0], this.options.min, this.options.max)
        : 0;
      const finishPercent = helpers.calculatePercent(values[1], this.options.min, this.options.max);

      if (isVertical) {
        this.range.style.cssText = `top: ${startPercent}%; bottom: ${100 - finishPercent}%`;
      } else {
        this.range.style.cssText = `left: ${startPercent}%; right: ${100 - finishPercent}%`;
      }
    }
  }

  private init(): void {
    this.range = helpers.createElement('slider__range');
  }
}

export default Range;
