import View from '../view/View';
import Model from '../model/model';
import EventEmitter from '../../EventEmitter/EventEmitter';
import { IConfig, IElementPosition, IOptions } from '../../types/types';

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
    this.eventEmitter.subscribe('UpdatedModelOptions', this.notifyViewUpdatedModelOptions);

    this.eventEmitter.subscribe('ClickScale', this.notifyModelClickedScale);

    this.eventEmitter.subscribe(
      'ChangedRunnerPosition',
      this.notifyModelAboutChangedRunnerPosition,
    );

    this.eventEmitter.subscribe('ChangedRunnerPositionStepUp', () => {
      this.model.updateValueToByStep();
    });
  }

  private notifyModelClickedScale = (value: number) => {
    this.model.updateNearValue(value);
  };

  private notifyViewUpdatedModelOptions = (options: IOptions) => {
    this.view.render(options);
    this.eventEmitter.emit({ eventName: 'onChange', eventArguments: options });
  };

  private notifyModelAboutChangedRunnerPosition = ({ position, valueIndex }: IElementPosition) => {
    this.model.calculateValueUsingFraction({ position, valueIndex });
  };
}

export default Presenter;
