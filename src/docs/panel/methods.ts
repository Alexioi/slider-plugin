import { App, Options } from '@plugin';

import { Dom, HTMLDivElementWithCustomName } from './type';
import { cssSelectors } from './constants';

const searchElements = (root: Element): Dom => {
  const range = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-range',
  );

  if (!(range instanceof HTMLInputElement)) {
    throw Error();
  }

  range.customName = 'isRange';

  const vertical = root.querySelector<HTMLDivElementWithCustomName>(
    cssSelectors.vertical,
  );

  if (!(vertical instanceof HTMLInputElement)) {
    throw Error();
  }

  vertical.customName = 'isVertical';

  const scale = root.querySelector<HTMLDivElementWithCustomName>(
    cssSelectors.scale,
  );

  if (!(scale instanceof HTMLInputElement)) {
    throw Error();
  }

  scale.customName = 'hasScale';

  const min = root.querySelector<HTMLDivElementWithCustomName>(
    cssSelectors.min,
  );

  if (!(min instanceof HTMLInputElement)) {
    throw Error();
  }

  min.customName = 'min';

  const max = root.querySelector<HTMLDivElementWithCustomName>(
    cssSelectors.max,
  );

  if (!(max instanceof HTMLInputElement)) {
    throw Error();
  }

  max.customName = 'max';

  const from = root.querySelector<HTMLDivElementWithCustomName>(
    cssSelectors.from,
  );

  if (!(from instanceof HTMLInputElement)) {
    throw Error();
  }

  from.customName = 'from';

  const to = root.querySelector<HTMLDivElementWithCustomName>(cssSelectors.to);

  if (!(to instanceof HTMLInputElement)) {
    throw Error();
  }

  to.customName = 'to';

  const step = root.querySelector<HTMLDivElementWithCustomName>(
    cssSelectors.step,
  );

  if (!(step instanceof HTMLInputElement)) {
    throw Error();
  }

  step.customName = 'step';

  const tip = root.querySelector<HTMLDivElementWithCustomName>(
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

  const format = root.querySelector<HTMLDivElementWithCustomName>(
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

export { searchElements, syncInputs, attachCallback };
