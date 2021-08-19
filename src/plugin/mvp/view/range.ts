import { IRangeOptions } from '../interfaces/interfaces';

class Range {
  $bar: JQuery;
  $range: JQuery;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$range = this.initRange();
  }

  public move({ isVertical, position, width }: IRangeOptions): void {
    if (isVertical) {
      this.moveVerticallyRange(position, width);
    } else {
      this.moveHorizontallyRange(position, width);
    }
  }

  private moveHorizontallyRange(position: number, width: number) {
    this.$range.css({
      width: `${width}%`,
      height: '',
      top: '',
      left: `${position}%`,
    });
  }

  private moveVerticallyRange(position: number, width: number) {
    this.$range.css({
      width: ``,
      height: `${width}%`,
      top: `${position}%`,
      left: '',
    });
  }

  private initRange(): JQuery {
    const range = '<div class="slider__range"></div>';

    this.$bar.append(range);

    return this.$bar.find('.slider__range');
  }
}

export default Range;
