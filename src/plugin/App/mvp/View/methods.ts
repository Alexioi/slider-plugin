import { Dom, SubViews } from './type';
import { Range, Runner, Scale, Tip } from './subViews';

const createElements = (root: HTMLElement): Dom => {
  const slider = document.createElement('div');
  slider.classList.add('slider');

  const barContainer = document.createElement('div');
  barContainer.classList.add('slider__bar-container');
  root.appendChild(slider);

  slider.appendChild(barContainer);

  return { root, barContainer, slider };
};

const initSubViews = (dom: Dom): SubViews => {
  const tip = new Tip(dom.slider);

  const range = new Range(dom.barContainer);

  const scale = new Scale(dom.slider);

  const runnerFrom = new Runner(dom.barContainer, 'from');

  const runnerTo = new Runner(dom.barContainer, 'to');

  return { tip, range, scale, runnerFrom, runnerTo };
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
