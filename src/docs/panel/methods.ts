import { App, Options } from '@plugin';

import {
  Dom,
  HTMLInputElementWithCustomName,
  HTMLOptionElementWithCustomName,
  HTMLSelectElementWithCustomName,
} from './type';
import { cssSelectors } from './constants';

const searchElements = (root: Element): Dom => {
  const range = root.querySelector<HTMLInputElementWithCustomName>(
    '.panel__input_name-range',
  );

  if (!(range instanceof HTMLInputElement)) {
    throw Error();
  }

  range.customName = 'isRange';

  const vertical = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.vertical,
  );

  if (!(vertical instanceof HTMLInputElement)) {
    throw Error();
  }

  vertical.customName = 'isVertical';

  const scale = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.scale,
  );

  if (!(scale instanceof HTMLInputElement)) {
    throw Error();
  }

  scale.customName = 'hasScale';

  const min = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.min,
  );

  if (!(min instanceof HTMLInputElement)) {
    throw Error();
  }

  min.customName = 'min';

  const max = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.max,
  );

  if (!(max instanceof HTMLInputElement)) {
    throw Error();
  }

  max.customName = 'max';

  const from = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.from,
  );

  if (!(from instanceof HTMLInputElement)) {
    throw Error();
  }

  from.customName = 'from';

  const to = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.to,
  );

  if (!(to instanceof HTMLInputElement)) {
    throw Error();
  }

  to.customName = 'to';

  const step = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.step,
  );

  if (!(step instanceof HTMLInputElement)) {
    throw Error();
  }

  step.customName = 'step';

  const tip = root.querySelector<HTMLInputElementWithCustomName>(
    cssSelectors.tip,
  );

  if (!(tip instanceof HTMLInputElement)) {
    throw Error();
  }

  tip.customName = 'hasTip';

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

  format.customName = 'format';

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
  const configs = [
    { name: 'none' },
    { name: 'before' },
    { name: 'after' },
    { name: 'x2' },
    { name: 'toFixed0' },
    { name: 'toFixed2' },
    { name: 'toFixed4' },
  ];

  configs.forEach((el) => {
    const option = new Option(el.name) as HTMLOptionElementWithCustomName;

    option.customName = el.name;

    changedFormat.options[format.options.length] = option;
  });
};

export { searchElements, syncInputs, attachCallback, addOptionsToFormat };
