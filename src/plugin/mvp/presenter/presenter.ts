import EventEmitter from '../EventEmitter/EventEmitter';

import Model from '../model/model';
import View from '../view/view';

import { IConfig, IOptions, IPosition } from '../interfaces/interfaces';

class Presenter extends EventEmitter {
  private view: View;

  private model: Model;

  constructor(element: HTMLElement, options: IOptions) {
    super();

    this.view = new View(element);
    this.model = new Model(options);

    this.attachEventEmitters();
  }

  public updateOptions(config: IConfig): void {
    this.model.verifyAllOptions(config);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private attachEventEmitters(): void {
    this.model.subscribe('updateModelOptions', (options: IOptions) => {
      this.view.update(options);
      this.emit('onChange', options);
    });

    this.model.subscribe('updateModelFrom', (options: IOptions) => {
      this.view.updatePositionFrom(options);
      this.emit('onChange', options);
    });

    this.model.subscribe('updateModelTo', (options: IOptions) => {
      this.view.updatePositionTo(options);
      this.emit('onChange', options);
    });

    this.view.subscribe('clickScale', (value: number) => this.model.updateNearValue(value));

    this.view.subscribe('click', (position: IPosition) => this.model.updateValue(position));
  }
}

export default Presenter;
