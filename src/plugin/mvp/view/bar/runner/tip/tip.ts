class Tip {
  $runner: JQuery;

  $tip: JQuery;

  constructor($runner: JQuery) {
    this.$runner = $runner;
    this.$tip = this.init();
  }

  public update(value: number): void {
    this.$tip.text(value);
  }

  public hide(): void {
    this.$tip.css({ display: 'none' });
  }

  public show(): void {
    this.$tip.css({ display: '' });
  }

  private init(): JQuery {
    const tip = '<div class="slider__tip"></div>';

    this.$runner.append(tip);

    return this.$runner.find('.slider__tip');
  }
}

export default Tip;
