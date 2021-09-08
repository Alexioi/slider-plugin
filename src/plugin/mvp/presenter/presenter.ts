import EventEmitter from '../EventEmitter/EventEmitter';

import Model from '../model/model';
import View from '../view/view';

import { IConfig, IOptions, IPosition } from '../interfaces/interfaces';
import { ENameOfEvent } from '../enums/enums';

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
    this.model.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private attachEventEmitters(): void {
    this.model.subscribe(ENameOfEvent.UpdatedModelOptions, (options: IOptions) => {
      this.view.update(options);
      this.emit('onChange', options);
    });

    this.model.subscribe(ENameOfEvent.UpdatedModelFrom, (options: IOptions) => {
      this.view.updatePositionFrom(options);
      this.emit('onChange', options);
    });

    this.model.subscribe(ENameOfEvent.UpdatedModelTo, (options: IOptions) => {
      this.view.updatePositionTo(options);
      this.emit('onChange', options);
    });

    this.view.subscribe(ENameOfEvent.ClickScale, (value: number) => {
      this.model.updateNearValue(value);
    });

    this.view.subscribe(ENameOfEvent.ChangedRunnerFromPosition, (position: IPosition) => {
      this.model.calculateFromUsingFraction(position);
    });

    this.view.subscribe(ENameOfEvent.ChangedRunnerToPosition, (position: IPosition) => {
      this.model.calculateToUsingFraction(position);
    });
  }
}

export default Presenter;
