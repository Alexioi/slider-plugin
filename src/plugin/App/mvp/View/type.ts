import { Range, Runner, Scale, Tip } from './subViews';
import { Bar } from './subViews/Bar';

type Dom = {
  root: HTMLElement;
  slider: HTMLDivElement;
};

type SubViews = {
  range: Range;
  runnerFrom: Runner;
  runnerTo: Runner;
  scale: Scale;
  tip: Tip;
  bar: Bar;
};

export { Dom, SubViews };
