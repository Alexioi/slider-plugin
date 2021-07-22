import { IOptions } from "../interfaces/interfaces";

class Range {
  $bar: JQuery;
  $range: JQuery;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$range = this.initRange();
  }

  public moveRange(options: IOptions) {
    const { isVertical } = options;

    const width = this.calculateWidth(options);
    const position = this.calculatePosition(options);

    if (isVertical) {
      this.moveVerticallyRange(position, width);
    } else {
      this.moveHorizontallyRange(position, width);
    }
  }

  private calculateWidth({ from, to, min, max }: IOptions) {
    return ((to - from) / (max - min)) * 100;
  }

  private calculatePosition({ from, min, max }: IOptions) {
    return ((from - min) / (max - min)) * 100;
  }

  private moveHorizontallyRange(position: number, width: number) {
    this.$range.css({
      width: `${width}%`,
      height: "100%",
      top: "0%",
      left: `${position}%`,
    });
  }

  private moveVerticallyRange(position: number, width: number) {
    this.$range.css({
      width: `100%`,
      height: `${width}%`,
      top: `${position}%`,
      left: "0%",
    });
  }

  private initRange(): JQuery {
    const range = `<div class='slider__range'></div>`;

    this.$bar.append(range);

    return this.$bar.find(`.slider__range`);
  }
}

export default Range;
