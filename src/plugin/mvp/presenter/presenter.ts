import EventNames from '../../types/enums';
import View from '../view/View';
import Model from '../model/model';
import EventEmitter from '../../EventEmitter/EventEmitter';
import { IConfig, IOptions, IPosition } from '../../types/types';

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
    this.eventEmitter.subscribe(EventNames.UpdatedModelOptions, this.notifyViewUpdatedModelOptions);

    this.eventEmitter.subscribe(EventNames.ClickScale, this.notifyModelClickedScale);

    this.eventEmitter.subscribe(
      EventNames.ChangedRunnerPosition,
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
