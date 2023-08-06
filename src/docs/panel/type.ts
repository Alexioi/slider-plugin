type Dom = {
  root: Element;
  range: HTMLInputElement;
  vertical: HTMLInputElement;
  min: HTMLInputElement;
  max: HTMLInputElement;
  from: HTMLInputElement;
  to: HTMLInputElement;
  step: HTMLInputElement;
  tip: HTMLInputElement;
  scale: HTMLInputElement;
  indicator: Element;
  format: HTMLSelectElement;
};

interface HTMLDivElementWithCustomName extends HTMLDivElement {
  customName: string;
}

export { Dom, HTMLDivElementWithCustomName };
