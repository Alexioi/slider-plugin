import ENamesOfEvents from '../enums/enums';

class Presenter {
  private view: IView;

  private model: IModel;

  private eventEmitter: IEventEmitter;

  constructor(view: IView, model: IModel, eventEmitter: IEventEmitter) {
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
    this.eventEmitter.subscribe(
      ENamesOfEvents.UpdatedModelOptions,
      this.notifyViewUpdatedModelOptions,
    );

    this.eventEmitter.subscribe(ENamesOfEvents.ClickScale, this.notifyModelClickedScale);

    this.eventEmitter.subscribe(
      ENamesOfEvents.ChangedRunnerPosition,
      this.notifyModelAboutChangedRunnerPosition,
    );
  }

  private notifyModelClickedScale = (value: number) => {
    this.model.updateNearValue(value);
  };

  private notifyViewUpdatedModelOptions = (options: IOptions) => {
    this.view.render(options);
    this.eventEmitter.emit('onChange', options);
  };

  private notifyModelAboutChangedRunnerPosition = ({
    position,
    type,
  }: {
    position: IPosition;
    type: 'from' | 'to';
  }) => {
    this.model.calculateValueUsingFraction({ position, type });
  };
}

export default Presenter;
