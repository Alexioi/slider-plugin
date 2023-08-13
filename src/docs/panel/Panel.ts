import { App, Config } from '@plugin';

import {
  searchElements,
  syncInputs,
  attachCallback,
  addOptionsToFormat,
} from './methods';
import { Dom, Handles } from './type';
import './style.scss';
import { name, formatName } from './constants';

class Panel {
  private dom: Dom;

  private slider: App;

  private handles: Handles;

  constructor(root: Element, slider: App, config?: Partial<Config>) {
    this.slider = slider;

    this.handles = {
      rangeClick: this.makeHandleClickCheckboxElement(name.isRange).bind(this),
      verticalClick: this.makeHandleClickCheckboxElement(name.isVertical).bind(
        this,
      ),
      tipClick: this.makeHandleClickCheckboxElement(name.hasTip).bind(this),
      scaleClick: this.makeHandleClickCheckboxElement(name.hasScale).bind(this),
      minChange: this.makeHandleChangeInputElement(name.min).bind(this),
      maxChange: this.makeHandleChangeInputElement(name.max).bind(this),
      fromChange: this.makeHandleChangeInputElement(name.from).bind(this),
      toChange: this.makeHandleChangeInputElement(name.to).bind(this),
      stepChange: this.makeHandleChangeInputElement(name.step).bind(this),
      formatChange: this.handleFormatChange.bind(this),
    };

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

    range.addEventListener('click', this.handles.rangeClick);
    vertical.addEventListener('click', this.handles.verticalClick);
    tip.addEventListener('click', this.handles.tipClick);
    scale.addEventListener('click', this.handles.scaleClick);
    min.addEventListener('change', this.handles.minChange);
    max.addEventListener('change', this.handles.maxChange);
    from.addEventListener('change', this.handles.fromChange);
    to.addEventListener('change', this.handles.toChange);
    step.addEventListener('change', this.handles.stepChange);
    format.addEventListener('change', this.handles.formatChange);

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
