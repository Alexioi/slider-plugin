import { Config } from '@types';

import { Dom, SubViews } from './type';
import { Bar, Range, Runner, Scale, Tip } from './subViews';

const createElements = (root: HTMLElement): Dom => {
  const slider = document.createElement('div');
  slider.classList.add('slider');

  root.append(slider);

  return { root, slider };
};

const initSubViews = (dom: Dom, config?: Config): SubViews => {
  const tip = new Tip(dom.slider, config);

  const bar = new Bar(dom.slider);

  const barNode = bar.getBarNode();

  const range = new Range(barNode);

  const scale = new Scale(dom.slider);

  const runnerFrom = new Runner(barNode, 'from');

  const runnerTo = new Runner(barNode, 'to');

  return { tip, range, scale, runnerFrom, runnerTo, bar };
};

const calculateTarget = ({
  from,
  min,
  max,
}: {
  from: number;
  min: number;
  max: number;
}): { target: 'from' | 'to' } => {
  const { abs } = Math;
  const isToTarget = abs(min - from) / abs(max - min) < 0.5;

  const target = isToTarget ? 'to' : 'from';

  return { target };
};

const toggleVertical = ({ slider }: Dom, isVertical: boolean) => {
  if (isVertical) {
    slider.classList.add('slider_vertical');
    return;
  }

  slider.classList.remove('slider_vertical');
};

export { initSubViews, createElements, calculateTarget, toggleVertical };
