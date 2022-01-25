import { ENamesOfEvents } from '../enums/enums';

class Presenter {
  private view: View;

  private model: Model;

  private eventEmitter: IEventEmitter;

  constructor(view: View, model: Model, eventEmitter: IEventEmitter) {
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
    this.eventEmitter.subscribe(ENamesOfEvents.UpdatedModelOptions, (options: IOptions) => {
      this.view.render(options);
      this.eventEmitter.emit('onChange', options);
    });

    this.eventEmitter.subscribe(ENamesOfEvents.UpdatedModelFrom, (options: IOptions) => {
      this.view.render(options, 'from');
      this.eventEmitter.emit('onChange', options);
    });

    this.eventEmitter.subscribe(ENamesOfEvents.UpdatedModelTo, (options: IOptions) => {
      this.view.render(options, 'to');
      this.eventEmitter.emit('onChange', options);
    });

    this.eventEmitter.subscribe(ENamesOfEvents.ClickScale, (value: number) => {
      this.model.updateNearValue(value);
    });

    this.eventEmitter.subscribe(ENamesOfEvents.ChangedRunnerFromPosition, (position: IPosition) => {
      this.model.calculateFromUsingFraction(position);
    });

    this.eventEmitter.subscribe(ENamesOfEvents.ChangedRunnerToPosition, (position: IPosition) => {
      this.model.calculateToUsingFraction(position);
    });
  }
}

export default Presenter;
