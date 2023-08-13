import { App, Config } from '@plugin';

import {
  searchElements,
  syncInputs,
  attachCallback,
  addOptionsToFormat,
} from './methods';
import { Dom } from './type';
import './style.scss';
import { name, formatName } from './constants';

class Panel {
  private dom: Dom;

  private slider: App;

  private handleRangeClick: ({ target }: Event) => void;

  private handleVerticalClick: ({ target }: Event) => void;

  private handleTipClick: ({ target }: Event) => void;

  private handleScaleClick: ({ target }: Event) => void;

  private handleMinChange: ({ target }: Event) => void;

  private handleMaxChange: ({ target }: Event) => void;

  private handleFromChange: ({ target }: Event) => void;

  private handleToChange: ({ target }: Event) => void;

  private handleStepChange: ({ target }: Event) => void;

  constructor(root: Element, slider: App, config?: Partial<Config>) {
    this.slider = slider;

    this.handleRangeClick = this.makeHandleClickCheckboxElement(
      name.isRange,
    ).bind(this);
    this.handleVerticalClick = this.makeHandleClickCheckboxElement(
      name.isVertical,
    ).bind(this);
    this.handleTipClick = this.makeHandleClickCheckboxElement(name.hasTip).bind(
      this,
    );
    this.handleScaleClick = this.makeHandleClickCheckboxElement(
      name.hasScale,
    ).bind(this);
    this.handleMinChange = this.makeHandleChangeInputElement(name.min).bind(
      this,
    );
    this.handleMaxChange = this.makeHandleChangeInputElement(name.max).bind(
      this,
    );
    this.handleFromChange = this.makeHandleChangeInputElement(name.from).bind(
      this,
    );
    this.handleToChange = this.makeHandleChangeInputElement(name.to).bind(this);
    this.handleStepChange = this.makeHandleChangeInputElement(name.step).bind(
      this,
    );
    this.handleFormatChange = this.handleFormatChange.bind(this);

    const { dom } = this.init(root, config);

    this.dom = dom;
  }

  private init(root: Element, config?: Partial<Config>) {
    this.slider.update(config);

    const dom = searchElements(root);

    addOptionsToFormat(dom);

    this.attachEventHandlers(dom);
    syncInputs(this.slider, dom);
    attachCallback(dom, this.slider);

    return { dom };
  }

  private attachEventHandlers(dom: Dom): Panel {
    const { range, vertical, scale, min, max, from, to, step, tip, format } =
      dom;

    range.addEventListener('click', this.handleRangeClick);
    vertical.addEventListener('click', this.handleVerticalClick);
    tip.addEventListener('click', this.handleTipClick);
    scale.addEventListener('click', this.handleScaleClick);
    min.addEventListener('change', this.handleMinChange);
    max.addEventListener('change', this.handleMaxChange);
    from.addEventListener('change', this.handleFromChange);
    to.addEventListener('change', this.handleToChange);
    step.addEventListener('change', this.handleStepChange);
    format.addEventListener('change', this.handleFormatChange);

    return this;
  }

  private makeHandleClickCheckboxElement(
    inputName: string,
  ): ({ target }: Event) => void {
    return ({ target }: Event) => {
      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      const value = target.checked;

      this.slider.update({ [inputName]: value });

      syncInputs(this.slider, this.dom);
    };
  }

  private makeHandleChangeInputElement(
    inputName: string,
  ): ({ target }: Event) => void {
    return ({ target }: Event) => {
      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      const value = Number(target.value);

      if (inputName === 'step' && value === 0) {
        this.slider.update({ step: 'none' });
      } else {
        this.slider.update({ [inputName]: value });
      }

      syncInputs(this.slider, this.dom);
    };
  }

  private handleFormatChange({ target }: Event) {
    if (!(target instanceof HTMLSelectElement)) {
      return;
    }

    const currentOption = target.options[target.selectedIndex];

    if (!('customName' in currentOption)) {
      return;
    }

    const { customName } = currentOption;

    if (customName === formatName.before) {
      this.slider.update({
        format: (value) => {
          return `$ ${value}`;
        },
      });
      return;
    }

    if (customName === formatName.after) {
      this.slider.update({
        format: (value) => {
          return `${value} $`;
        },
      });
      return;
    }

    if (customName === formatName.x2) {
      this.slider.update({
        format: (value) => {
          return String(value * 2);
        },
      });
      return;
    }

    if (customName === formatName.toFixed0) {
      this.slider.update({
        format: (value) => {
          return value.toFixed(0);
        },
      });
      return;
    }

    if (customName === formatName.toFixed2) {
      this.slider.update({
        format: (value) => {
          return String(Number(value.toFixed(2)));
        },
      });
      return;
    }

    if (customName === formatName.toFixed4) {
      this.slider.update({
        format: (value) => {
          return String(Number(value.toFixed(4)));
        },
      });
      return;
    }

    this.slider.update({
      format: (value) => {
        return String(value);
      },
    });
  }
}

export { Panel };
