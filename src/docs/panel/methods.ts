import { App } from '../../plugin/App';
import { Options } from '../../plugin/types';
import { Dom, HTMLDivElementWithCustomName } from './type';

const searchElements = (root: Element): Dom => {
  const range = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-range',
  );

  if (!(range instanceof HTMLInputElement)) {
    throw Error();
  }

  range.customName = 'isRange';

  const vertical = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-vertical',
  );

  if (!(vertical instanceof HTMLInputElement)) {
    throw Error();
  }

  vertical.customName = 'isVertical';

  const scale = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-scale',
  );

  if (!(scale instanceof HTMLInputElement)) {
    throw Error();
  }

  scale.customName = 'hasScale';

  const min = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-min',
  );

  if (!(min instanceof HTMLInputElement)) {
    throw Error();
  }

  min.customName = 'min';

  const max = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-max',
  );

  if (!(max instanceof HTMLInputElement)) {
    throw Error();
  }

  max.customName = 'max';

  const from = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-from',
  );

  if (!(from instanceof HTMLInputElement)) {
    throw Error();
  }

  from.customName = 'from';

  const to = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-to',
  );

  if (!(to instanceof HTMLInputElement)) {
    throw Error();
  }

  to.customName = 'to';

  const step = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-step',
  );

  if (!(step instanceof HTMLInputElement)) {
    throw Error();
  }

  step.customName = 'step';

  const tip = root.querySelector<HTMLDivElementWithCustomName>(
    '.panel__input_name-tip',
  );

  if (!(tip instanceof HTMLInputElement)) {
    throw Error();
  }

  tip.customName = 'hasTip';

  return { root, range, vertical, scale, min, max, from, to, step, tip };
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
  changedDom.from.value = String(from);
  changedDom.to.value = String(to);
  changedDom.step.value = String(step);
  changedDom.tip.checked = hasTip;
  changedDom.scale.checked = hasScale;
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
