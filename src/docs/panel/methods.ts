import { App } from '../../plugin/App';
import { Options } from '../../plugin/types';
import { Dom } from './type';

const searchElements = (root: Element): Dom => {
  const range = root.querySelector('.panel__input_name-range');

  if (!(range instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  range.plugin = { name: 'isRange' };

  const vertical = root.querySelector('.panel__input_name-vertical');

  if (!(vertical instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  vertical.plugin = { name: 'isVertical' };

  const scale = root.querySelector('.panel__input_name-scale');

  if (!(scale instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  scale.plugin = { name: 'hasScale' };

  const min = root.querySelector('.panel__input_name-min');

  if (!(min instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  min.plugin = { name: 'min' };

  const max = root.querySelector('.panel__input_name-max');

  if (!(max instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  max.plugin = { name: 'max' };

  const from = root.querySelector('.panel__input_name-from');

  if (!(from instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  from.plugin = { name: 'from' };

  const to = root.querySelector('.panel__input_name-to');

  if (!(to instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  to.plugin = { name: 'to' };

  const step = root.querySelector('.panel__input_name-step');

  if (!(step instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  step.plugin = { name: 'step' };

  const tip = root.querySelector('.panel__input_name-tip');

  if (!(tip instanceof HTMLInputElement)) {
    throw Error();
  }

  // @ts-ignore
  tip.plugin = { name: 'hasTip' };

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

const attachCallback = (dom: Dom, slider: App): void => {
  const thatDom = dom;

  slider.update({
    onChange: ({ from, to }: Options) => {
      thatDom.from.value = String(from);
      thatDom.to.value = String(to);
    },
  });
};

export { searchElements, syncInputs, attachCallback };
