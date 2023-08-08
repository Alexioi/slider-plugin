import { App, Config } from '@plugin';

import {
  searchElements,
  syncInputs,
  attachCallback,
  addOptionsToFormat,
} from './methods';
import { Dom } from './type';
import './style.scss';
import { formatName } from './constants';

class Panel {
  private dom: Dom;

  private slider: App;

  constructor(root: Element, slider: App, config: Config) {
    this.slider = slider;

    this.handleClickCheckboxElement =
      this.handleClickCheckboxElement.bind(this);
    this.handleChangeInputElement = this.handleChangeInputElement.bind(this);
    this.handleChangeFormat = this.handleChangeFormat.bind(this);

    const { dom } = this.init(root, config);

    this.dom = dom;
  }

  private init(root: Element, config: Config) {
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

    range.addEventListener('click', this.handleClickCheckboxElement);
    vertical.addEventListener('click', this.handleClickCheckboxElement);
    tip.addEventListener('click', this.handleClickCheckboxElement);
    scale.addEventListener('click', this.handleClickCheckboxElement);
    min.addEventListener('change', this.handleChangeInputElement);
    max.addEventListener('change', this.handleChangeInputElement);
    from.addEventListener('change', this.handleChangeInputElement);
    to.addEventListener('change', this.handleChangeInputElement);
    step.addEventListener('change', this.handleChangeInputElement);
    format.addEventListener('change', this.handleChangeFormat);

    return this;
  }

  private handleClickCheckboxElement({ target }: Event) {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const value = target.checked;

    if (!('customName' in target)) {
      return;
    }

    const optionName = target.customName;

    if (typeof optionName !== 'string') {
      return;
    }

    this.slider.update({ [optionName]: value });

    syncInputs(this.slider, this.dom);
  }

  private handleChangeInputElement = ({ target }: Event): void => {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (!('customName' in target)) {
      return;
    }

    const { customName } = target;

    if (typeof customName !== 'string') {
      return;
    }

    const value = Number(target.value);

    if (customName === 'step' && value === 0) {
      this.slider.update({ step: 'none' });
    } else {
      this.slider.update({ [customName]: value });
    }

    syncInputs(this.slider, this.dom);
  };

  private handleChangeFormat({ target }: Event) {
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
