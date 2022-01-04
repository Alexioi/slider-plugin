import EventEmitter from '../EventEmitter/EventEmitter';

import Model from '../model/model';
import View from '../view/view';

import { IConfig, IOptions, IPosition } from '../interfaces/interfaces';
import { ENameOfEvent } from '../enums/enums';

class Presenter {
  private view: View;

  private model: Model;

  private eventEmitter: EventEmitter;

  constructor(view: View, model: Model, eventEmitter: EventEmitter) {
    this.view = view;
    this.model = model;
    this.eventEmitter = eventEmitter;

    this.attachEventEmitters();
  }

  public updateOptions(config: IConfig): void {
    this.model.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private attachEventEmitters(): void {
    this.eventEmitter.subscribe(ENameOfEvent.UpdatedModelOptions, (options: IOptions) => {
      this.view.update(options);
      this.eventEmitter.emit('onChange', options);
    });

    this.eventEmitter.subscribe(ENameOfEvent.UpdatedModelFrom, (options: IOptions) => {
      this.view.updatePositionFrom(options);

      this.eventEmitter.emit('onChange', options);
    });

    this.eventEmitter.subscribe(ENameOfEvent.UpdatedModelTo, (options: IOptions) => {
      this.view.updatePositionTo(options);

      this.eventEmitter.emit('onChange', options);
    });

    this.eventEmitter.subscribe(ENameOfEvent.ClickScale, (value: number) => {
      this.model.updateNearValue(value);
    });

    this.eventEmitter.subscribe(ENameOfEvent.ChangedRunnerFromPosition, (position: IPosition) => {
      this.model.calculateFromUsingFraction(position);
    });

    this.eventEmitter.subscribe(ENameOfEvent.ChangedRunnerToPosition, (position: IPosition) => {
      this.model.calculateToUsingFraction(position);
    });
  }
}

export default Presenter;
