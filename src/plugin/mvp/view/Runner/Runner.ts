import './runner.scss';

import { IOptions, ITarget } from '../../../types/types';

import EventEmitter from '../../../EventEmitter/EventEmitter';
import SubView from '../SubView/SubView';

class Runner extends SubView {
  private runner!: HTMLDivElement;

  private valueIndex: 0 | 1;

  private target: ITarget;

  constructor(
    node: HTMLDivElement,
    options: IOptions,
    eventEmitter: EventEmitter,
    valueIndex: 0 | 1,
    target: ITarget,
  ) {
    super(node, options, eventEmitter);

    this.valueIndex = valueIndex;
    this.target = target;

    this.init();
  }

  public render(): void {
    const { target, valueIndex: typeIndex } = this;
    const { isVertical } = this.options;

    this.root.appendChild(this.runner);

    if (target.valueIndex === typeIndex) {
      this.runner.classList.add('slider__runner_targeted');
      this.runner.focus();
    } else {
      this.runner.classList.remove('slider__runner_targeted');
    }

    const percent = this.calculatePercent(this.options.values[typeIndex]);
    const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

    this.runner.style.cssText = styleRunner;
  }

  public destroy(): void {
    this.runner.remove();
  }

  private init(): void {
    this.runner = SubView.getElement('slider__runner');
    this.runner.setAttribute('tabindex', '0');
    this.runner.addEventListener('pointerdown', this.attachEventOnPointerDown.bind(this));
    this.runner.addEventListener('keydown', this.attachEventOnPressingKeyboard.bind(this));
  }

  private attachEventOnPressingKeyboard(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;
    const { valueIndex } = this;

    if (code === 'ArrowUp' || code === 'ArrowRight') {
      keyboardEvent.preventDefault();
      this.target.valueIndex = valueIndex;
      this.eventEmitter.emit({
        eventName: 'ChangedRunnerPositionStepUp',
        eventArguments: { valueIndex },
      });
    }

    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      keyboardEvent.preventDefault();
      this.target.valueIndex = valueIndex;
      this.eventEmitter.emit({
        eventName: 'ChangedRunnerPositionStepDown',
        eventArguments: { valueIndex },
      });
    }
  }

  private attachEventOnPointerDown(): void {
    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();
      this.runner.ondragstart = () => false;

      const { valueIndex: typeIndex } = this;
      this.target.valueIndex = typeIndex;

      const position = this.getPosition(this.root, pointerEvent);

      this.eventEmitter.emit({
        eventName: 'ChangedRunnerPosition',
        eventArguments: { position, valueIndex: typeIndex },
      });
    };

    const onPointerUp = (): void => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }
}

export default Runner;
