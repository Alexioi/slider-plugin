import { App, Config } from '@plugin';

import { searchElements, syncInputs, attachCallback } from './methods';
import { Dom } from './type';
import './style.scss';

class Panel {
  private dom: Dom;

  private slider: App;

  constructor(root: Element, slider: App, config: Config) {
    this.slider = slider;

    this.handleClickCheckboxElement =
      this.handleClickCheckboxElement.bind(this);
    this.handleChangeInputElement = this.handleChangeInputElement.bind(this);

    const { dom } = this.init(root, config);

    this.dom = dom;
  }

  private init(root: Element, config: Config) {
    this.slider.update(config);
    const dom = searchElements(root);

    this.attachEventHandlers(dom);
    syncInputs(this.slider, dom);
    attachCallback(dom, this.slider);

    return { dom };
  }

  private attachEventHandlers(dom: Dom): Panel {
    const { range, vertical, scale, min, max, from, to, step, tip } = dom;

    range.addEventListener('click', this.handleClickCheckboxElement);
    vertical.addEventListener('click', this.handleClickCheckboxElement);
    tip.addEventListener('click', this.handleClickCheckboxElement);
    scale.addEventListener('click', this.handleClickCheckboxElement);
    min.addEventListener('change', this.handleChangeInputElement);
    max.addEventListener('change', this.handleChangeInputElement);
    from.addEventListener('change', this.handleChangeInputElement);
    to.addEventListener('change', this.handleChangeInputElement);
    step.addEventListener('change', this.handleChangeInputElement);

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

    const optionName = target.customName;

    if (typeof optionName !== 'string') {
      return;
    }

    if (optionName === 'from' || optionName === 'to') {
      const from = Number(this.dom.from.value);
      const to = Number(this.dom.to.value);

      this.slider.update({ from, to });
    } else {
      const value = Number(target.value);
      this.slider.update({ [optionName]: value });
    }

    syncInputs(this.slider, this.dom);
  };
}

export { Panel };
