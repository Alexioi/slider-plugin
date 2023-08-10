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

interface HTMLSelectElementWithCustomName extends HTMLSelectElement {
  customName: string;
}

interface HTMLOptionElementWithCustomName extends HTMLOptionElement {
  customName: string;
}

export {
  Dom,
  HTMLSelectElementWithCustomName,
  HTMLOptionElementWithCustomName,
};
