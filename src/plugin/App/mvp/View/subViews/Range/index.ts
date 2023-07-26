import { Dom, UpdateOptions } from './types';
import { init, changeDimensions } from './methods';
import './range.scss';

class Range {
  private dom: Dom;

  constructor(root: HTMLDivElement) {
    const { dom } = init(root);

    this.dom = dom;
  }

  public render(): void {
    this.dom.root.appendChild(this.dom.range);
  }

  public update(rangeOptions: UpdateOptions) {
    changeDimensions(this.dom.range, rangeOptions);
  }
}

export { Range };
