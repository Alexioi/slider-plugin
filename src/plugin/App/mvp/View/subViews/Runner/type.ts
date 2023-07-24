type Dom = {
  root: HTMLDivElement;
  runner: HTMLDivElement;
};

type Props = {
  type: 'from' | 'to';
};

type UpdateOptions = {
  isVertical: boolean;
  from: number;
  to: number;
  min: number;
  max: number;
};

export { Dom, Props, UpdateOptions };
