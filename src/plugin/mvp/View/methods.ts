import { Dom, SubViews } from './type';
import { Range } from './Range';
import { Runner } from './Runner';
import { Scale } from './Scale';
import { Tip } from './Tip';
import { IOptions } from '../../types';
import { RunnerId } from './enums';

const createElements = (root: HTMLElement): Dom => {
  const slider = document.createElement('div');
  slider.classList.add('slider');

  const barContainer = document.createElement('div');
  barContainer.classList.add('slider__bar-container');
  root.appendChild(slider);

  slider.appendChild(barContainer);

  return { root, barContainer, slider };
};

const initSubViews = (dom: Dom, options: IOptions, target: 0 | 1): SubViews => {
  // @ts-ignore
  const tip = new Tip(dom.slider, options, target);

  const range = new Range(dom.barContainer);

  const scale = new Scale(dom.slider, options);

  const runnerFrom = new Runner(dom.barContainer, RunnerId.From, target);

  const runnerTo = new Runner(dom.barContainer, RunnerId.To, target);

  return { tip, range, scale, runnerFrom, runnerTo };
};

export { createElements, initSubViews };
