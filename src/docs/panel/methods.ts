import { App } from '../../plugin/App';
import { Dom } from './type';

const searchElements = (root: Element): Dom => {
  const range = root.querySelector('.panel__input_name-range');

  if (!(range instanceof HTMLInputElement)) {
    throw Error();
  }

  const vertical = root.querySelector('.panel__input_name-vertical');

  if (!(vertical instanceof HTMLInputElement)) {
    throw Error();
  }

  const scale = root.querySelector('.panel__input_name-scale');

  if (!(scale instanceof HTMLInputElement)) {
    throw Error();
  }

  const min = root.querySelector('.panel__input_name-min');

  if (!(min instanceof HTMLInputElement)) {
    throw Error();
  }

  const max = root.querySelector('.panel__input_name-max');

  if (!(max instanceof HTMLInputElement)) {
    throw Error();
  }

  const from = root.querySelector('.panel__input_name-from');

  if (!(from instanceof HTMLInputElement)) {
    throw Error();
  }

  const to = root.querySelector('.panel__input_name-to');

  if (!(to instanceof HTMLInputElement)) {
    throw Error();
  }

  const step = root.querySelector('.panel__input_name-step');

  if (!(step instanceof HTMLInputElement)) {
    throw Error();
  }

  const tip = root.querySelector('.panel__input_name-tip');

  if (!(tip instanceof HTMLInputElement)) {
    throw Error();
  }

  return { root, range, vertical, scale, min, max, from, to, step, tip };
};

const syncInputs = (slider: App, dom: Dom): void => {
  const option = slider.getOptions();
  if (typeof option === 'undefined') {
    return;
  }

  const { isRange, isVertical, from, to, min, max, hasScale, hasTip, step } = option;

  dom.range.checked = isRange;
  dom.vertical.checked = isVertical;
  dom.min.value = String(min);
  dom.max.value = String(max);
  dom.from.value = String(from);
  dom.to.value = String(to);
  dom.step.value = String(step);
  dom.tip.checked = hasTip;
  dom.scale.checked = hasScale;
};

export { searchElements, syncInputs };
