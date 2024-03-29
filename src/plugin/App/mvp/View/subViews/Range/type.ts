type Dom = {
  root: HTMLDivElement;
  range: HTMLDivElement;
};

type UpdateOptions = {
  min: number;
  max: number;
  isVertical: boolean;
  isRange: boolean;
  from: number;
  to: number;
};

export { Dom, UpdateOptions };
