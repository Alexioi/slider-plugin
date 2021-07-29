import { IOptions } from '../interfaces/interfaces';

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

  public addMarks({ min, max }: { min: number; max: number }): void {
    const length = this.$bar.width();

    const countMarks = Math.floor(length! / 100);

    if (countMarks === 0) return;

    const difference = Math.abs(max - min);

    const step = Math.trunc(difference / (countMarks - 1));

    let value = min;
    let left: number;

    while (value <= max) {
      const mark = `<span class='slider__mark js-slider__mark'>${value}</span>`;

      this.$scale.append(mark);

      const $mark = this.$scale.find('.js-slider__mark').last();

      left = (value / difference) * 100;

      if (left < 0) {
        left += 100;
      }

      $mark.css({ left: `${left}%` });

      value += step;
    }
  }

  public removeMarks(): void {
    this.$scale.empty();
  }
}

export default Scale;
