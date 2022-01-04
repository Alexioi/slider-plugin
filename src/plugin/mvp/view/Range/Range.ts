import createElement from '../../lib/createElement';

class Range {
  private $range: JQuery;

  private isVertical?: boolean;

  constructor($barContainer: JQuery) {
    this.$range = createElement($barContainer, 'div', 'slider__range');
  }

  public update({ isVertical, leftPosition, rightPosition }: any) {
    if (this.isVertical) {
      this.$range.css({
        top: '',
        bottom: '',
      });
    } else {
      this.$range.css({
        left: '',
        right: '',
      });
    }

    this.isVertical = isVertical;

    this.move({ leftPosition, rightPosition });
  }

  public move({ leftPosition, rightPosition }: any): void {
    if (this.isVertical) {
      this.$range.css({
        top: `${leftPosition}%`,
        bottom: `${100 - rightPosition}%`,
      });
    } else {
      this.$range.css({
        left: `${leftPosition}%`,
        right: `${100 - rightPosition}%`,
      });
    }
  }
}

export default Range;
