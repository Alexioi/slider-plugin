import { EventEmitter } from '@helpers/EventEmitter';
import { EventTypes } from '@types';

import { Dom } from './type';
import { createElements } from './methods';

class Bar extends EventEmitter<EventTypes> {
  private dom: Dom;

  constructor(root: HTMLElement) {
    super();

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public getBarNode() {
    return this.dom.bar;
  }

  public render() {
    this.dom.root.append(this.dom.bar);
  }

  private init(root: HTMLElement): { dom: Dom } {
    const dom = createElements(root);

    this.attachEventHandlers(dom);

    return { dom };
  }

  private attachEventHandlers(dom: Dom): void {
    console.log(this.dom, dom);
  }
}

export { Bar };
