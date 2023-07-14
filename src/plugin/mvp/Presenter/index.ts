import View from '../View';
import Model from '../Model';
import { EventEmitter } from '../../EventEmitter';
import { IConfig, IElementPosition, IOptions, IElementTouch, EventTypes } from '../../types';

class Presenter extends EventEmitter<EventTypes> {
  private view: View;

  private model: Model;

  constructor(view: View, model: Model) {
    super();

    this.view = view;
    this.model = model;

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

    this.view.scale.subscribe('ClickScale', notifyModelClickedScale);

    this.view.runnerFrom.subscribe('ChangedRunnerPosition', notifyModelAboutChangedRunnerPosition);
    this.view.runnerTo.subscribe('ChangedRunnerPosition', notifyModelAboutChangedRunnerPosition);

    this.view.runnerFrom.subscribe('ChangedRunnerPositionStep', notifyModelAboutTouchValue);
    this.view.runnerTo.subscribe('ChangedRunnerPositionStep', notifyModelAboutTouchValue);

    this.view.runnerFrom.subscribe(
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
    this.view.runnerTo.subscribe(
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
  }

  private attachEventEmittersToView(): void {
    const notifyViewUpdatedModelOptions = (options: IOptions): void => {
      this.view.render(options);
      this.emit('onChange', options);
    };

    const notifyViewUpdatedModelValues = (options: IOptions): void => {
      this.view.changeValues(options);
      this.emit('onChange', options);
    };

    this.model.subscribe('UpdatedModelOptions', notifyViewUpdatedModelOptions);

    this.model.subscribe('UpdatedModelValues', notifyViewUpdatedModelValues);
  }
}

export default Presenter;
