import './range.scss';

import { IOptions } from '../../../types';
import { helpers } from '../../../helpers';
import { Dom } from './types';
import { init } from './methods';

class Range {
  private dom: Dom;

  private options: IOptions;

  constructor(root: HTMLDivElement, options: IOptions) {
    this.options = options;

    const { dom } = init(root);

    this.dom = dom;
  }

  public render(): void {
    const { isVertical, isRange, values } = this.options;

    this.dom.root.appendChild(this.dom.range);

    const startPercent = isRange
      ? helpers.calculatePercent(values[0], this.options.min, this.options.max)
      : 0;
    const finishPercent = helpers.calculatePercent(values[1], this.options.min, this.options.max);

    if (isVertical) {
      this.dom.range.style.cssText = `top: ${startPercent}%; bottom: ${100 - finishPercent}%`;
    } else {
      this.dom.range.style.cssText = `left: ${startPercent}%; right: ${100 - finishPercent}%`;
    }
  }
}

export { Range };
