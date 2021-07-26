import { IOptions } from '../../plugin/mvp/interfaces/interfaces';

class Panel {
  control: HTMLElement;

  slider: any;

  range: HTMLInputElement;

  vertical: HTMLInputElement;

  min: HTMLInputElement;

  max: HTMLInputElement;

  from: HTMLInputElement;

  to: HTMLInputElement;

  step: HTMLInputElement;

  tip: HTMLInputElement;

  numberMarks: HTMLInputElement;

  constructor(control: HTMLElement, slider: any) {
    this.control = control;
    this.slider = slider;

    this.searchElements();
    this.addEventHandler();
    this.verifyInput();
  }

  searchElements(): void {
    this.range = this.control.querySelector('.panel__range-checkbox')!;
    this.vertical = this.control.querySelector('.panel__vertical-checkbox')!;
    this.min = this.control.querySelector('.panel__min-checkbox')!;
    this.max = this.control.querySelector('.panel__max-checkbox')!;
    this.from = this.control.querySelector('.panel__from-checkbox')!;
    this.to = this.control.querySelector('.panel__to-checkbox')!;
    this.step = this.control.querySelector('.panel__step-checkbox')!;
    this.tip = this.control.querySelector('.panel__tip-checkbox')!;
    this.numberMarks = this.control.querySelector(
      '.panel__number-marks-checkbox'
    )!;
  }

  addEventHandler(): void {
    this.vertical.addEventListener('click', this.changeVertical);
    this.tip.addEventListener('click', this.changeTip);
    this.min.addEventListener('change', this.changeMin);
    this.max.addEventListener('change', this.changeMax);
    this.from.addEventListener('change', this.changeFrom);
    this.to.addEventListener('change', this.changeTo);
    this.step.addEventListener('change', this.changeStep);
    this.numberMarks.addEventListener('change', this.changeNumberMarks);
    this.range.addEventListener('click', this.changeRange);
  }

  changeRange = (): void => {
    if (this.range.checked) {
      this.slider.updateOptions({ isRange: true });
    } else {
      this.slider.updateOptions({ isRange: false });
    }

    this.verifyInput();
  };

  changeTip = (): void => {
    if (this.tip.checked) {
      this.slider.updateOptions({ hasTip: true });
    } else {
      this.slider.updateOptions({ hasTip: false });
    }

    this.verifyInput();
  };

  changeNumberMarks = (): void => {
    const value = Number(this.numberMarks.value);
    this.slider.updateOptions({ numberMarks: value });

    this.verifyInput();
  };

  changeVertical = (): void => {
    if (this.vertical.checked) {
      this.slider.updateOptions({ isVertical: true });
    } else {
      this.slider.updateOptions({ isVertical: false });
    }

    this.verifyInput();
  };

  changeMin = (): void => {
    const value = Number(this.min.value);
    this.slider.updateOptions({ min: value });

    this.verifyInput();
  };

  changeMax = (): void => {
    const value = Number(this.max.value);
    this.slider.updateOptions({ max: value });

    this.verifyInput();
  };

  changeFrom = (): void => {
    const value = Number(this.from.value);
    this.slider.updateOptions({ from: value });

    this.verifyInput();
  };

  changeTo = (): void => {
    const value = Number(this.to.value);
    this.slider.updateOptions({ to: value });

    this.verifyInput();
  };

  changeStep = (): void => {
    const value = Number(this.step.value);
    this.slider.updateOptions({ step: value });

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
    this.numberMarks.value = String(options.numberMarks);
  }
}

export default Panel;
