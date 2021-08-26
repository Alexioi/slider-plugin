import { IRangeOptions } from '../../../interfaces/interfaces';

class Range {
  $bar: JQuery;

  $range: JQuery;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$range = this.init();
  }

  public move({ isVertical, position, width }: IRangeOptions): void {
    if (isVertical) {
      this.moveVertically(position, width);
    } else {
      this.moveHorizontally(position, width);
    }
  }

  private moveHorizontally(position: number, width: number) {
    this.$range.css({
      width: `${width}%`,
      height: '',
      top: '',
      left: `${position}%`,
    });
  }

  private moveVertically(position: number, width: number) {
    this.$range.css({
      width: '',
      height: `${width}%`,
      top: `${position}%`,
      left: '',
    });
  }

  private init(): JQuery {
    const range = '<div class="slider__range"></div>';

    this.$bar.append(range);

    return this.$bar.find('.slider__range');
  }
}

export default Range;
