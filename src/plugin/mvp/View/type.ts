import { Range, Runner, Scale, Tip } from './subViews';

type Dom = {
  root: HTMLElement;
  barContainer: HTMLDivElement;
  slider: HTMLDivElement;
};

type SubViews = {
  range: Range;
  runnerFrom: Runner;
  runnerTo: Runner;
  scale: Scale;
  tip: Tip;
};

export { Dom, SubViews };
