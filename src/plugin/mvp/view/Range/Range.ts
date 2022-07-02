import './range.scss';

import { IRangeOptions } from '../../../types/types';

class Range {
  private root: HTMLDivElement;

  private range: HTMLDivElement;

  private isRender = false;

  constructor(node: HTMLDivElement) {
    this.root = node;
    this.range = document.createElement('div');
    this.range.classList.add('slider__range');
  }

  public render({ isVertical, positions }: IRangeOptions): void {
    if (!this.isRender) {
      this.root.appendChild(this.range);
      this.isRender = true;
    }

    const isRange = positions.length === 1;

    const startPosition = isRange ? '0%' : `${positions[0]}%`;
    const finishPosition = isRange ? `${100 - positions[0]}%` : `${100 - positions[1]}%`;

    if (isVertical) {
      this.range.style.cssText = `top: ${startPosition};bottom: ${finishPosition}`;
    } else {
      this.range.style.cssText = `left: ${startPosition};right: ${finishPosition}`;
    }
  }
}

export default Range;
