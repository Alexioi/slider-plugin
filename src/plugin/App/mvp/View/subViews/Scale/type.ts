interface HTMLDivElementWithCustomData extends HTMLDivElement {
  customValue: number;
}

type Dom = {
  root: HTMLDivElement;
  scale: HTMLDivElement;
};

type Props = { min: number; max: number; isVertical: boolean };

type RenderProps = {
  min: number;
  max: number;
  isVertical: boolean;
  hasScale: boolean;
};

export { Dom, Props, RenderProps, HTMLDivElementWithCustomData };