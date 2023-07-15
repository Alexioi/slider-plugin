import './range.scss';

import { Dom, RangeOptions } from './types';
import { init, changeDimensions } from './methods';

class Range {
  private dom: Dom;

  private props = {
    isRender: false,
  };

  constructor(root: HTMLDivElement) {
    const { dom } = init(root);

    this.dom = dom;
  }

  public render(): void {
    if (this.props.isRender) {
      return;
    }

    this.props = { isRender: true };

    this.dom.root.appendChild(this.dom.range);
  }

  public update(rangeOptions: RangeOptions) {
    changeDimensions(this.dom.range, rangeOptions);
  }
}

export { Range };
