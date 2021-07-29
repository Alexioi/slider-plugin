import EventEmitter from 'event-emitter';

import Model from '../model/model';
import View from '../view/view';

import { IOptions, IPosition } from '../interfaces/interfaces';

class Presenter {
  private view: View;

  private model: Model;

  private element: JQuery;

  constructor(element: JQuery, options: IOptions, defaultOptions: IOptions) {
    this.element = element;
    this.view = new View(this.element);
    this.model = new Model(defaultOptions);

    this.addEventEmitters();
    this.updateOptions(options);
  }

  public updateOptions(options: IOptions): void {
    this.model.verifyAllOptions(options);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private addEventEmitters(): void {
    this.model.on('updateModelOptions', (options: IOptions) =>
      this.view.updateSlider(options)
    );
    this.model.on('updateModelFrom', (options: IOptions) =>
      this.view.updatePositionFrom(options)
    );

    this.model.on('updateModelTo', (options: IOptions) =>
      this.view.updatePositionTo(options)
    );

    this.view.on('clickScale', (value: number) =>
      this.model.updateNearValue(value)
    );

    this.view.on('click', (position: IPosition) =>
      this.model.updateValue(position)
    );
  }

  private updateModelOptions(options: IOptions) {
    this.view.updateSlider(options);
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
