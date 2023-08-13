import { EventEmitter } from '@helpers/EventEmitter';
import { EventTypes } from '@types';
import { helpers } from '@helpers';

import { Dom } from './type';
import { createElements } from './methods';
import './style.scss';

class Bar extends EventEmitter<EventTypes> {
  private dom: Dom;

  constructor(root: HTMLElement) {
    super();

    this.handleRunnerPointerdown = this.handleRunnerPointerdown.bind(this);

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
    dom.bar.addEventListener('pointerdown', this.handleRunnerPointerdown);
  }

  private handleRunnerPointerdown(pointerEvent: PointerEvent): void {
    pointerEvent.preventDefault();

    const position = helpers.getPosition(this.dom.bar, pointerEvent);

    this.emit('ChangeNearRunnerPosition', { position });
  }
}

export { Bar };
