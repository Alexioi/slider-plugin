import { Range } from './Range';
import { Runner } from './Runner';
import { Scale } from './Scale';
import { Tip } from './Tip';

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
