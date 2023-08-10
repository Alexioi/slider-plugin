import { App, Options } from '@plugin';

import {
  Dom,
  HTMLOptionElementWithCustomName,
  HTMLSelectElementWithCustomName,
} from './type';
import { cssSelectors, customName, formatOptions } from './constants';

const searchElements = (root: Element): Dom => {
  const range = root.querySelector('.panel__input_name-range');

  if (!(range instanceof HTMLInputElement)) {
    throw Error();
  }

  const vertical = root.querySelector(cssSelectors.vertical);

  if (!(vertical instanceof HTMLInputElement)) {
    throw Error();
  }

  const scale = root.querySelector(cssSelectors.scale);

  if (!(scale instanceof HTMLInputElement)) {
    throw Error();
  }

  const min = root.querySelector(cssSelectors.min);

  if (!(min instanceof HTMLInputElement)) {
    throw Error();
  }

  const max = root.querySelector(cssSelectors.max);

  if (!(max instanceof HTMLInputElement)) {
    throw Error();
  }

  const from = root.querySelector(cssSelectors.from);

  if (!(from instanceof HTMLInputElement)) {
    throw Error();
  }

  const to = root.querySelector(cssSelectors.to);

  if (!(to instanceof HTMLInputElement)) {
    throw Error();
  }

  const step = root.querySelector(cssSelectors.step);

  if (!(step instanceof HTMLInputElement)) {
    throw Error();
  }

  const tip = root.querySelector(cssSelectors.tip);

  if (!(tip instanceof HTMLInputElement)) {
    throw Error();
  }

  const indicator = root.querySelector(cssSelectors.indicator);

  if (indicator === null) {
    throw Error();
  }

  const format = root.querySelector<HTMLSelectElementWithCustomName>(
    cssSelectors.format,
  );

  if (!(format instanceof HTMLSelectElement)) {
    throw Error();
  }

  format.customName = customName.format;

  return {
    root,
    range,
    vertical,
    scale,
    min,
    max,
    from,
    to,
    step,
    tip,
    indicator,
    format,
  };
};

const syncInputs = (slider: App, dom: Dom): void => {
  const changedDom = dom;

  const option = slider.getOptions();
  if (typeof option === 'undefined') {
    return;
  }

  const { isRange, isVertical, from, to, min, max, hasScale, hasTip, step } =
    option;

  changedDom.range.checked = isRange;
  changedDom.vertical.checked = isVertical;
  changedDom.min.value = String(min);
  changedDom.max.value = String(max);
  changedDom.from.value = String(Number(from.toFixed(3)));
  changedDom.to.value = String(Number(to.toFixed(3)));
  changedDom.step.value = step === 'none' ? '0' : String(step);
  changedDom.tip.checked = hasTip;
  changedDom.scale.checked = hasScale;
};

const attachCallback = (dom: Dom, slider: App): void => {
  const thatDom = dom;
  const disableIndicator = () => {
    thatDom.indicator.classList.remove(cssSelectors.decoratedIndicator);
  };

  let timeout = setTimeout(() => {}, 0);

  slider.update({
    onChange: ({ from, to }: Options) => {
      clearTimeout(timeout);

      thatDom.from.value = String(Number(from.toFixed(3)));
      thatDom.to.value = String(Number(to.toFixed(3)));

      thatDom.indicator.classList.add(cssSelectors.decoratedIndicator);

      timeout = setTimeout(disableIndicator, 300);
    },
  });
};

const addOptionsToFormat = ({ format }: Dom): void => {
  const changedFormat = format;

  formatOptions.forEach((el) => {
    const option = new Option(el.name) as HTMLOptionElementWithCustomName;

    option.customName = el.name;

    changedFormat.options[format.options.length] = option;
  });
};

export { searchElements, syncInputs, attachCallback, addOptionsToFormat };
