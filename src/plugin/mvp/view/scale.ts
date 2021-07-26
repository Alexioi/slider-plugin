import Mark from './mark';

class Scale {
  mark: any;

  $bar: JQuery;

  $scale: JQuery;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$scale = this.init();
    this.addMarks();
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

  private addMarks() {
    // const width = this.$bar.width();

    // const countMarks = Math.floor(width / 100);

    const value = 1;

    const mark = `<span class='slider__mark'>${value}</span>`;

    this.$scale.append(mark);
  }
}

export default Scale;
