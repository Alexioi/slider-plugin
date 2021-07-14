class Range {
  $bar: JQuery;
  $range: JQuery;


  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$range = this.initRange();
  }

  public moveRange(position: number, width: number) {
    this.$range.css({
            width: `${width}%`,
            // height: "100%",
            // top: "0%",
            left: `${position}%`,
          });
  }

  private initRange(): JQuery {
    const range = `<div class='slider__range'></div>`;

    this.$bar.append(range);

    return this.$bar.find(`.slider__range`);
  }
}

export default Range;