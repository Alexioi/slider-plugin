import './scale.scss';
import { IMarkParameters, IOptions, EventTypes } from '../../../types/types';
import { EventEmitter } from '../../../EventEmitter';
import SubView from '../SubView/SubView';

class Scale extends SubView {
  private scale: Element | null = null;

  constructor(root: Element, options: IOptions, eventEmitter: EventEmitter<EventTypes>) {
    super(root, options, eventEmitter);

    this.init();
  }

  public render(): void {
    this.deleteMarks();

    if (this.scale !== null) {
      this.root.appendChild(this.scale);
    }

    const scaleParameters = this.getScaleParameters();

    this.draw(scaleParameters);
  }

  public destroy(): void {
    this.scale?.remove();
  }

  private init(): void {
    this.scale = SubView.getElement('slider__scale');
    if (this.scale instanceof HTMLElement) {
      this.scale.addEventListener('pointerdown', this.clickScale.bind(this));
    }

    window.addEventListener('resize', this.handlerResizeScale.bind(this));
  }

  private deleteMarks(): void {
    while (this.scale?.firstChild) {
      this.scale?.removeChild(this.scale.firstChild);
    }
  }

  private draw(parameters: IMarkParameters[]): void {
    const { isVertical } = this.options;

    parameters.forEach((parameter) => {
      const { percent, text } = parameter;
      const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;
      const mark = document.createElement('span');
      mark.classList.add('slider__mark');
      mark.style.cssText = style;
      mark.innerText = text;

      this.scale?.appendChild(mark);
    });
  }

  private handlerResizeScale(): void {
    this.render();
  }

  private clickScale(pointerEvent: PointerEvent): void {
    const { innerHTML } = <HTMLElement>pointerEvent.target;
    const intInnerHtml = Number(innerHTML);

    if (!isNaN(intInnerHtml)) {
      this.eventEmitter.emit('ClickScale', { targetNumber: intInnerHtml });
    }
  }

  private static getScalePercents(sliderLength: number): number[] {
    if (sliderLength > 800) {
      return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    }

    if (sliderLength > 500) {
      return [0, 20, 40, 60, 80, 100];
    }

    if (sliderLength > 300) {
      return [0, 33, 66, 100];
    }

    return [0, 100];
  }

  private getScaleParameters(): IMarkParameters[] {
    if (this.scale instanceof HTMLElement) {
      const { max, min, isVertical } = this.options;
      const { offsetHeight, offsetWidth } = this.scale;
      const scaleLength = isVertical ? offsetHeight : offsetWidth;
      const scalePercents = Scale.getScalePercents(scaleLength);

      const differenceMaxAndMin = Math.abs(max - min);

      const scaleParameters = scalePercents.map((percent) => {
        const text = (min + (differenceMaxAndMin * percent) / 100).toFixed(1).replace(/\.?0+$/, '');

        return { percent, text };
      });

      return scaleParameters;
    }

    return [{ percent: 1, text: '' }];
  }
}

export default Scale;
