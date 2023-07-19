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

interface HTMLDivElementWithCustomType extends HTMLDivElement {
  customType: 'from' | 'to' | 'both';
}

export { Dom, UpdateOptions, HTMLDivElementWithCustomType };
