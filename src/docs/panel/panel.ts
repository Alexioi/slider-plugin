import { IOptions } from '../../plugin/mvp/interfaces/interfaces';

class Panel {
  $element: JQuery;

  slider: any;

  $range!: JQuery;

  $vertical!: JQuery;

  $min!: JQuery;

  $max!: JQuery;

  $from!: JQuery;

  $to!: JQuery;

  $step!: JQuery;

  $tip!: JQuery;

  $scale!: JQuery;

  constructor($element: JQuery, slider: any) {
    this.$element = $element;
    this.slider = slider;

    this.searchElements();
    this.attachEventHandler();
    this.verifyInput();
    this.attachCallback();
  }

  attachCallback(): void {
    const that = this;

    this.slider.update({
      onChange: function onChange(options: IOptions) {
        that.$from.val(options.from);
        that.$to.val(options.to);
      },
    });
  }

  searchElements(): void {
    this.$range = this.$element.find('.panel__input_name-range')!;
    this.$vertical = this.$element.find('.panel__input_name-vertical')!;
    this.$scale = this.$element.find('.panel__input_name-scale')!;
    this.$min = this.$element.find('.panel__input_name-min')!;
    this.$max = this.$element.find('.panel__input_name-max')!;
    this.$from = this.$element.find('.panel__input_name-from')!;
    this.$to = this.$element.find('.panel__input_name-to')!;
    this.$step = this.$element.find('.panel__input_name-step')!;
    this.$tip = this.$element.find('.panel__input_name-tip')!;
  }

  attachEventHandler(): void {
    this.$vertical.on('click', this.changeVertical);
    this.$scale.on('click', this.changeScale);
    this.$tip.on('click', this.changeTip);
    this.$min.on('change', this.changeMin);
    this.$max.on('change', this.changeMax);
    this.$from.on('change', this.changeFrom);
    this.$to.on('change', this.changeTo);
    this.$step.on('change', this.changeStep);
    this.$range.on('click', this.changeRange);
  }

  changeRange = (): void => {
    const isRange = this.$range.prop('checked');

    this.slider.update({ isRange });

    this.verifyInput();
  };

  changeTip = (): void => {
    const hasTip = this.$tip.prop('checked');

    this.slider.update({ hasTip });

    this.verifyInput();
  };

  changeVertical = (): void => {
    const isVertical = this.$vertical.prop('checked');

    this.slider.update({ isVertical });

    this.verifyInput();
  };

  changeScale = (): void => {
    const hasScale = this.$scale.prop('checked');

    this.slider.update({ hasScale });

    this.verifyInput();
  };

  changeMin = (): void => {
    const value = Number(this.$min.val());
    this.slider.update({ min: value });

    this.verifyInput();
  };

  changeMax = (): void => {
    const value = Number(this.$max.val());
    this.slider.update({ max: value });

    this.verifyInput();
  };

  changeFrom = (): void => {
    const value = Number(this.$from.val());
    this.slider.update({ from: value });

    this.verifyInput();
  };

  changeTo = (): void => {
    const value = Number(this.$to.val());
    this.slider.update({ to: value });

    this.verifyInput();
  };

  changeStep = (): void => {
    const value = Number(this.$step.val());
    this.slider.update({ step: value });

    this.verifyInput();
  };

  verifyInput(): void {
    const options: IOptions = this.slider.getOptions();

    this.$range.prop('checked', options.isRange);
    this.$vertical.prop('checked', options.isVertical);
    this.$min.val(options.min);
    this.$max.val(options.max);
    this.$from.val(options.from);
    this.$to.val(options.to);
    this.$step.val(options.step);
    this.$tip.prop('checked', options.hasTip);
    this.$scale.prop('checked', options.hasScale);
  }
}

export default Panel;
