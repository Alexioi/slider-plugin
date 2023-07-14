import View from '../view/View';
import Model from '../model/Model';
import { EventEmitter } from '../../EventEmitter';
import { IConfig, IElementPosition, IOptions, IElementTouch, EventTypes } from '../../types/types';

class Presenter {
  private view: View;

  private model: Model;

  private eventEmitter: EventEmitter<EventTypes>;

  constructor(view: View, model: Model, eventEmitter: EventEmitter<EventTypes>) {
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
    const notifyModelClickedScale = ({ targetNumber }: { targetNumber: number }) => {
      this.model.updateNearValue(targetNumber);
    };

    const notifyModelAboutChangedRunnerPosition = ({ position, valueIndex }: IElementPosition) => {
      this.model.calculateValueUsingFraction({ position, valueIndex });
    };

    const notifyModelAboutTouchValue = ({ valueIndex, touchRoute }: IElementTouch) => {
      this.model.updateValueByStep({ valueIndex, touchRoute });
    };

    const notifyModelAboutChangedNearRunnerPosition = ({ position }: { position: number }) => {
      this.model.calculateNearValueUsingFraction(position);
    };

    this.eventEmitter.subscribe('ClickScale', notifyModelClickedScale);

    this.eventEmitter.subscribe('ChangedRunnerPosition', notifyModelAboutChangedRunnerPosition);

    this.eventEmitter.subscribe('ChangedRunnerPositionStep', notifyModelAboutTouchValue);

    this.eventEmitter.subscribe(
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
  }

  private attachEventEmittersToView(): void {
    const notifyViewUpdatedModelOptions = (options: IOptions): void => {
      this.view.render(options);
      this.eventEmitter.emit('onChange', options);
    };

    const notifyViewUpdatedModelValues = (options: IOptions): void => {
      this.view.changeValues(options);
      this.eventEmitter.emit('onChange', options);
    };

    this.eventEmitter.subscribe('UpdatedModelOptions', notifyViewUpdatedModelOptions);

    this.eventEmitter.subscribe('UpdatedModelValues', notifyViewUpdatedModelValues);
  }
}

export default Presenter;
