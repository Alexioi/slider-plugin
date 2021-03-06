import View from '../view/View';
import Model from '../model/model';
import EventEmitter from '../../EventEmitter/EventEmitter';
import { IConfig, IElementPosition, IOptions, IElementTouch } from '../../types/types';

class Presenter {
  private view: View;

  private model: Model;

  private eventEmitter: EventEmitter;

  constructor(view: View, model: Model, eventEmitter: EventEmitter) {
    this.view = view;
    this.model = model;
    this.eventEmitter = eventEmitter;

    this.attachEventEmittersToModel();
    this.attachEventEmittersToView();
  }

  public updateOptions(config: IConfig): void {
    this.model.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private attachEventEmittersToModel(): void {
    const notifyModelClickedScale = (value: number) => {
      this.model.updateNearValue(value);
    };

    const notifyModelAboutChangedRunnerPosition = ({ position, valueIndex }: IElementPosition) => {
      this.model.calculateValueUsingFraction({ position, valueIndex });
    };

    const notifyModelAboutTouchValue = ({ valueIndex, touchRoute }: IElementTouch) => {
      this.model.updateValueByStep({ valueIndex, touchRoute });
    };

    this.eventEmitter.subscribe('ClickScale', notifyModelClickedScale);

    this.eventEmitter.subscribe('ChangedRunnerPosition', notifyModelAboutChangedRunnerPosition);

    this.eventEmitter.subscribe('ChangedRunnerPositionStep', notifyModelAboutTouchValue);
  }

  private attachEventEmittersToView(): void {
    const notifyViewUpdatedModelOptions = (options: IOptions): void => {
      this.view.render(options);
      this.eventEmitter.emit({ eventName: 'onChange', eventArguments: options });
    };

    const notifyViewUpdatedModelValues = (options: IOptions): void => {
      this.view.changeValues(options);
      this.eventEmitter.emit({ eventName: 'onChange', eventArguments: options });
    };

    this.eventEmitter.subscribe('UpdatedModelOptions', notifyViewUpdatedModelOptions);

    this.eventEmitter.subscribe('UpdatedModelValues', notifyViewUpdatedModelValues);
  }
}

export default Presenter;
