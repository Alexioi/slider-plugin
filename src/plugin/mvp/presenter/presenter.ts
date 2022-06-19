import enums from '../../enums/enums';

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
      enums.EventNames.UpdatedModelOptions,
      this.notifyViewUpdatedModelOptions,
    );

    this.eventEmitter.subscribe(enums.EventNames.ClickScale, this.notifyModelClickedScale);

    this.eventEmitter.subscribe(
      enums.EventNames.ChangedRunnerPosition,
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
