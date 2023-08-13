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

type Handles = {
  rangeClick: ({ target }: Event) => void;
  verticalClick: ({ target }: Event) => void;
  tipClick: ({ target }: Event) => void;
  scaleClick: ({ target }: Event) => void;
  minChange: ({ target }: Event) => void;
  maxChange: ({ target }: Event) => void;
  fromChange: ({ target }: Event) => void;
  toChange: ({ target }: Event) => void;
  stepChange: ({ target }: Event) => void;
  formatChange: ({ target }: Event) => void;
};

export {
  Dom,
  HTMLSelectElementWithCustomName,
  HTMLOptionElementWithCustomName,
  Handles,
};
