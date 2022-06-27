import './range.scss';

import { IRangeOptions } from '../../../types/types';

class Range {
  private $barContainer: JQuery;

  private $range: JQuery;

  private isRender = false;

  constructor($barContainer: JQuery) {
    this.$barContainer = $barContainer;
    this.$range = $('<div>', { class: 'slider__range' });
  }

  public render({ isVertical, positions }: IRangeOptions): void {
    if (!this.isRender) {
      this.$barContainer.append(this.$range);
      this.isRender = true;
    }

    const isRange = positions.length === 1;

    const startPosition = isRange ? '0%' : `${positions[0]}%`;
    const finishPosition = isRange ? `${100 - positions[0]}%` : `${100 - positions[1]}%`;

    if (isVertical) {
      this.$range.css({
        top: startPosition,
        bottom: finishPosition,
        left: '',
        right: '',
      });
    } else {
      this.$range.css({
        left: startPosition,
        right: finishPosition,
        top: '',
        bottom: '',
      });
    }
  }
}

export default Range;
