import { IOptions } from '../../plugin/mvp/interfaces/interfaces';

class Panel {
  control: Element;

  slider: any;

  range!: HTMLInputElement;

  vertical!: HTMLInputElement;

  min!: HTMLInputElement;

  max!: HTMLInputElement;

  from!: HTMLInputElement;

  to!: HTMLInputElement;

  step!: HTMLInputElement;

  tip!: HTMLInputElement;

  scale!: HTMLInputElement;

  numberMarks!: HTMLInputElement;

  constructor(control: Element, slider: JQuery) {
    this.control = control;
    this.slider = slider;

    this.searchElements();
    this.addEventHandler();
    this.verifyInput();
    this.attachCallback();
  }

  attachCallback(): void {
    const that = this;

    this.slider.update({
      onChange: function onChange(options: IOptions) {
        that.from.value = String(options.from);
        that.to.value = String(options.to);
      },
    });
  }

  searchElements(): void {
    this.range = this.control.querySelector('.panel__input_name-range')!;
    this.vertical = this.control.querySelector('.panel__input_name-vertical')!;
    this.scale = this.control.querySelector('.panel__input_name-scale')!;
    this.min = this.control.querySelector('.panel__input_name-min')!;
    this.max = this.control.querySelector('.panel__input_name-max')!;
    this.from = this.control.querySelector('.panel__input_name-from')!;
    this.to = this.control.querySelector('.panel__input_name-to')!;
    this.step = this.control.querySelector('.panel__input_name-step')!;
    this.tip = this.control.querySelector('.panel__input_name-tip')!;
    this.numberMarks = this.control.querySelector('.panel__input_name-number-marks')!;
  }

  addEventHandler(): void {
    this.vertical.addEventListener('click', this.changeVertical);
    this.scale.addEventListener('click', this.changeScale);
    this.tip.addEventListener('click', this.changeTip);
    this.min.addEventListener('change', this.changeMin);
    this.max.addEventListener('change', this.changeMax);
    this.from.addEventListener('change', this.changeFrom);
    this.to.addEventListener('change', this.changeTo);
    this.step.addEventListener('change', this.changeStep);

    this.range.addEventListener('click', this.changeRange);
  }

  changeRange = (): void => {
    if (this.range.checked) {
      this.slider.update({ isRange: true });
    } else {
      this.slider.update({ isRange: false });
    }

    this.verifyInput();
  };

  changeTip = (): void => {
    if (this.tip.checked) {
      this.slider.update({ hasTip: true });
    } else {
      this.slider.update({ hasTip: false });
    }

    this.verifyInput();
  };

  changeNumberMarks = (): void => {
    const value = Number(this.numberMarks.value);
    this.slider.update({ numberMarks: value });

    this.verifyInput();
  };

  changeVertical = (): void => {
    if (this.vertical.checked) {
      this.slider.update({ isVertical: true });
    } else {
      this.slider.update({ isVertical: false });
    }

    this.verifyInput();
  };

  changeScale = (): void => {
    if (this.scale.checked) {
      this.slider.update({ hasScale: true });
    } else {
      this.slider.update({ hasScale: false });
    }

    this.verifyInput();
  };

  changeMin = (): void => {
    const value = Number(this.min.value);
    this.slider.update({ min: value });

    this.verifyInput();
  };

  changeMax = (): void => {
    const value = Number(this.max.value);
    this.slider.update({ max: value });

    this.verifyInput();
  };

  changeFrom = (): void => {
    const value = Number(this.from.value);
    this.slider.update({ from: value });

    this.verifyInput();
  };

  changeTo = (): void => {
    const value = Number(this.to.value);
    this.slider.update({ to: value });

    this.verifyInput();
  };

  changeStep = (): void => {
    const value = Number(this.step.value);
    this.slider.update({ step: value });

    this.verifyInput();
  };

  verifyInput(): void {
    const options: IOptions = this.slider.getOptions();

    this.range.checked = options.isRange;
    this.vertical.checked = options.isVertical;
    this.min.value = String(options.min);
    this.max.value = String(options.max);
    this.from.value = String(options.from);
    this.to.value = String(options.to);
    this.step.value = String(options.step);
    this.tip.checked = options.hasTip;
    this.scale.checked = options.hasScale;
  }
}

export default Panel;
