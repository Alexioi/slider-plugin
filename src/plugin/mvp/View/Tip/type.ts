type Dom = {
  root: HTMLDivElement;
  tipLine: HTMLDivElement;
  tipFrom: HTMLDivElement;
  tipTo: HTMLDivElement;
  tipBoth: HTMLDivElement;
};

type UpdateOptions = {
  isVertical: boolean;
  from: number;
  to: number;
  min: number;
  max: number;
  isRange: boolean;
};

export { Dom, UpdateOptions };
