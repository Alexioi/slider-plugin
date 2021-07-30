class Scale {
  $bar: JQuery;

  $scale: JQuery;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$scale = this.init();
  }

  public hide(): void {
    this.$scale.css({ display: 'none' });
  }

  public show(): void {
    this.$scale.css({ display: '' });
  }

  private init(): JQuery {
    const scale = '<div class="slider__scale"></div>';

    this.$bar.append(scale);

    return this.$bar.find('.slider__scale');
  }

  public addMarks({
    min,
    max,
    isVertical,
  }: {
    min: number;
    max: number;
    isVertical: boolean;
  }): void {
    let length: number;

    if (isVertical) {
      length = <number>this.$bar.height();
    } else {
      length = <number>this.$bar.width();
    }

    const countMarks = Math.floor(length! / 100);

    if (countMarks === 0) return;

    const difference = Math.abs(max - min);

    const step = difference / (countMarks - 1);

    let value = min,
      rate = 0,
      left: number,
      integerValue: number;

    while (value <= max) {
      integerValue = Math.trunc(value);

      const mark = `<span class='slider__mark js-slider__mark'>${integerValue}</span>`;

      this.$scale.append(mark);

      const $mark = this.$scale.find('.js-slider__mark').last();

      left = (rate / difference) * 100;

      if (isVertical) {
        $mark.css({ top: `${left}%` });
      } else {
        $mark.css({ left: `${left}%` });
      }

      rate += step;
      value += step;
    }
  }

  public removeMarks(): void {
    this.$scale.empty();
  }
}

export default Scale;
