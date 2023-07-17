import './panel.scss';
import { App } from '../../plugin/App';
import { IConfig, IOptions } from '../../plugin/types';

class Panel {
  root: Element;

  slider: App;

  range!: HTMLInputElement;

  vertical!: HTMLInputElement;

  min!: HTMLInputElement;

  max!: HTMLInputElement;

  from!: HTMLInputElement;

  to!: HTMLInputElement;

  step!: HTMLInputElement;

  tip!: HTMLInputElement;

  scale!: HTMLInputElement;

  constructor(root: Element, slider: App, config: IConfig) {
    this.root = root;
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
      onChange: function onChange({ from, to }: IOptions) {
        that.from.value = String(from);
        that.to.value = String(to);
      },
    });
  }

  private searchElements(): void {
    this.range = this.root.querySelector('.panel__input_name-range')!;
    this.vertical = this.root.querySelector('.panel__input_name-vertical')!;
    this.scale = this.root.querySelector('.panel__input_name-scale')!;
    this.min = this.root.querySelector('.panel__input_name-min')!;
    this.max = this.root.querySelector('.panel__input_name-max')!;
    this.from = this.root.querySelector('.panel__input_name-from')!;
    this.to = this.root.querySelector('.panel__input_name-to')!;
    this.step = this.root.querySelector('.panel__input_name-step')!;
    this.tip = this.root.querySelector('.panel__input_name-tip')!;
  }

  private attachEventHandlers(): void {
    this.range.addEventListener(
      'click',
      this.changeCheckboxValue.bind(this, this.range, 'isRange'),
    );
    this.vertical.addEventListener(
      'click',
      this.changeCheckboxValue.bind(this, this.vertical, 'isVertical'),
    );
    this.tip.addEventListener('click', this.changeCheckboxValue.bind(this, this.tip, 'hasTip'));
    this.scale.addEventListener(
      'click',
      this.changeCheckboxValue.bind(this, this.scale, 'hasScale'),
    );
    this.min.addEventListener('change', this.changeTextValue.bind(this, this.min, 'min'));
    this.max.addEventListener('change', this.changeTextValue.bind(this, this.max, 'max'));
    this.from.addEventListener('change', this.changeTextValue.bind(this, this.from, 'from'));
    this.to.addEventListener('change', this.changeTextValue.bind(this, this.to, 'to'));
    this.step.addEventListener('change', this.changeTextValue.bind(this, this.step, 'step'));
  }

  private changeCheckboxValue($node: HTMLInputElement, option: string) {
    const value = $node.checked;

    this.slider.update({ [option]: value });

    this.verifyInputs();
  }

  private changeTextValue = ($node: HTMLInputElement, option: string): void => {
    if (option === 'from' || option === 'to') {
      const from = Number(this.from.value);
      const to = Number(this.to.value);

      this.slider.update({ from, to });
    } else {
      const value = Number($node.value);
      this.slider.update({ [option]: value });
    }

    this.verifyInputs();
  };

  private verifyInputs(): void {
    const option = this.slider.getOptions();
    if (typeof option === 'undefined') {
      return;
    }
    const { isRange, isVertical, from, to, min, max, hasScale, hasTip, step } = option;

    this.range.checked = isRange;
    this.vertical.checked = isVertical;
    this.min.value = String(min);
    this.max.value = String(max);
    this.from.value = String(from);
    this.to.value = String(to);
    this.step.value = String(step);
    this.tip.checked = hasTip;
    this.scale.checked = hasScale;
  }
}

export { Panel };
