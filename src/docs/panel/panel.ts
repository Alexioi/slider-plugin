import './panel.scss';
import App from '../../plugin/app/app';
import { IConfig, IOptions } from '../../plugin/types/types';

class Panel {
  $element: JQuery;

  slider: App;

  $range!: JQuery;

  $vertical!: JQuery;

  $min!: JQuery;

  $max!: JQuery;

  $from!: JQuery;

  $to!: JQuery;

  $step!: JQuery;

  $tip!: JQuery;

  $scale!: JQuery;

  constructor($element: JQuery, slider: App, config: IConfig) {
    this.$element = $element;
    this.slider = slider;

    this.init(config);
  }

  private init(config: IConfig) {
    this.slider.update(config);
    this.searchElements();
    this.attachEventHandlers();
    this.verifyInputs();
    this.attachCallback();
  }

  private attachCallback(): void {
    const that = this;

    this.slider.update({
      onChange: function onChange(options: IOptions) {
        that.$from.val(options.values[0]);
        that.$to.val(options.values[1]);
      },
    });
  }

  private searchElements(): void {
    this.$range = this.$element.find('.panel__input_name-range');
    this.$vertical = this.$element.find('.panel__input_name-vertical');
    this.$scale = this.$element.find('.panel__input_name-scale');
    this.$min = this.$element.find('.panel__input_name-min');
    this.$max = this.$element.find('.panel__input_name-max');
    this.$from = this.$element.find('.panel__input_name-from');
    this.$to = this.$element.find('.panel__input_name-to');
    this.$step = this.$element.find('.panel__input_name-step');
    this.$tip = this.$element.find('.panel__input_name-tip');
  }

  private attachEventHandlers(): void {
    this.$range.on('click', this.changeCheckboxValue.bind(this, this.$range, 'isRange'));
    this.$vertical.on('click', this.changeCheckboxValue.bind(this, this.$vertical, 'isVertical'));
    this.$tip.on('click', this.changeCheckboxValue.bind(this, this.$tip, 'hasTip'));
    this.$scale.on('click', this.changeCheckboxValue.bind(this, this.$scale, 'hasScale'));
    this.$min.on('change', this.changeTextValue.bind(this, this.$min, 'min'));
    this.$max.on('change', this.changeTextValue.bind(this, this.$max, 'max'));
    this.$from.on('change', this.changeTextValue.bind(this, this.$from, 'from'));
    this.$to.on('change', this.changeTextValue.bind(this, this.$to, 'to'));
    this.$step.on('change', this.changeTextValue.bind(this, this.$step, 'step'));
  }

  private changeCheckboxValue($node: JQuery, option: string) {
    const value = $node.prop('checked');

    this.slider.update({ [option]: value });

    this.verifyInputs();
  }

  private changeTextValue = ($node: JQuery, option: string): void => {
    const value = Number($node.val());
    this.slider.update({ [option]: value });

    this.verifyInputs();
  };

  private verifyInputs(): void {
    const options: IOptions = this.slider.getOptions();

    this.$range.prop('checked', options.isRange);
    this.$vertical.prop('checked', options.isVertical);
    this.$min.val(options.min);
    this.$max.val(options.max);
    this.$from.val(options.values[0]);
    this.$to.val(options.values[1]);
    this.$step.val(options.step);
    this.$tip.prop('checked', options.hasTip);
    this.$scale.prop('checked', options.hasScale);
  }
}

export default Panel;
