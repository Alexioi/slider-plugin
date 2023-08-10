import { App, Config } from '@plugin';

import {
  searchElements,
  syncInputs,
  attachCallback,
  addOptionsToFormat,
} from './methods';
import { Dom } from './type';
import './style.scss';
import { customName, formatName } from './constants';

class Panel {
  private dom: Dom;

  private slider: App;

  private handleClickRange: ({ target }: Event) => void;

  private handleClickVertical: ({ target }: Event) => void;

  private handleClickTip: ({ target }: Event) => void;

  private handleClickScale: ({ target }: Event) => void;

  private handleChangeMin: ({ target }: Event) => void;

  private handleChangeMax: ({ target }: Event) => void;

  private handleChangeFrom: ({ target }: Event) => void;

  private handleChangeTo: ({ target }: Event) => void;

  private handleChangeStep: ({ target }: Event) => void;

  constructor(root: Element, slider: App, config: Config) {
    this.slider = slider;

    this.handleClickRange = this.makeHandleClickCheckboxElement(
      customName.isRange,
    ).bind(this);
    this.handleClickVertical = this.makeHandleClickCheckboxElement(
      customName.isVertical,
    ).bind(this);
    this.handleClickTip = this.makeHandleClickCheckboxElement(
      customName.hasTip,
    ).bind(this);
    this.handleClickScale = this.makeHandleClickCheckboxElement(
      customName.hasScale,
    ).bind(this);
    this.handleChangeMin = this.makeHandleChangeInputElement(
      customName.min,
    ).bind(this);
    this.handleChangeMax = this.makeHandleChangeInputElement(
      customName.max,
    ).bind(this);
    this.handleChangeFrom = this.makeHandleChangeInputElement(
      customName.from,
    ).bind(this);
    this.handleChangeTo = this.makeHandleChangeInputElement(customName.to).bind(
      this,
    );
    this.handleChangeStep = this.makeHandleChangeInputElement(
      customName.step,
    ).bind(this);
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

    range.addEventListener('click', this.handleClickRange);
    vertical.addEventListener('click', this.handleClickVertical);
    tip.addEventListener('click', this.handleClickTip);
    scale.addEventListener('click', this.handleClickScale);
    min.addEventListener('change', this.handleChangeMin);
    max.addEventListener('change', this.handleChangeMax);
    from.addEventListener('change', this.handleChangeFrom);
    to.addEventListener('change', this.handleChangeTo);
    step.addEventListener('change', this.handleChangeStep);

    format.addEventListener('change', this.handleChangeFormat);

    return this;
  }

  private makeHandleClickCheckboxElement(
    name: string,
  ): ({ target }: Event) => void {
    return ({ target }: Event) => {
      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      const value = target.checked;

      this.slider.update({ [name]: value });

      syncInputs(this.slider, this.dom);
    };
  }

  private makeHandleChangeInputElement(
    name: string,
  ): ({ target }: Event) => void {
    return ({ target }: Event) => {
      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      const value = Number(target.value);

      if (name === 'step' && value === 0) {
        this.slider.update({ step: 'none' });
      } else {
        this.slider.update({ [name]: value });
      }

      syncInputs(this.slider, this.dom);
    };
  }

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
