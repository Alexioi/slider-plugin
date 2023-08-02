import { Dom, UpdateOptions } from './type';
import { init, changeDimensions } from './methods';

class Range {
  private dom: Dom;

  constructor(root: HTMLDivElement) {
    const { dom } = init(root);

    this.dom = dom;
  }

  public render(): void {
    this.dom.root.append(this.dom.range);
  }

  public update(rangeOptions: UpdateOptions) {
    changeDimensions(this.dom.range, rangeOptions);
  }
}

export { Range };
