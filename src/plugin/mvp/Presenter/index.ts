import { View } from '../View';
import { Model } from '../Model';
import { EventEmitter } from '../../EventEmitter';
import { IConfig, IElementPosition, IOptions, IElementTouch, EventTypes } from '../../types';

class Presenter extends EventEmitter<EventTypes> {
  private view: View;

  private model: Model;

  constructor(view: View, model: Model) {
    super();

    this.view = view;
    this.model = model;

    this.attachEventEmittersToModel().attachEventEmittersToView();
  }

  public updateOptions(config: IConfig): void {
    this.model.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private attachEventEmittersToModel(): Presenter {
    const notifyModelClickedScale = ({ targetNumber }: { targetNumber: number }) => {
      this.model.updateNearValue(targetNumber);
    };

    const notifyModelAboutChangedRunnerPosition = ({ position, valueIndex }: IElementPosition) => {
      this.model.calculateValueUsingFraction({ position, valueIndex });
    };

    const notifyModelAboutTouchValue = ({ valueIndex, touchRoute }: IElementTouch) => {
      this.model.updateValueByStep({ valueIndex, touchRoute });
    };

    const notifyModelAboutChangedNearRunnerPosition = ({
      position,
    }: {
      position: { x: number; y: number };
    }) => {
      this.model.calculateNearValueUsingFraction(position);
    };

    this.view.subViews.scale.subscribe('ClickScale', notifyModelClickedScale);

    this.view.subViews.runnerFrom.subscribe(
      'ChangedRunnerPosition',
      notifyModelAboutChangedRunnerPosition,
    );
    this.view.subViews.runnerTo.subscribe(
      'ChangedRunnerPosition',
      notifyModelAboutChangedRunnerPosition,
    );

    this.view.subViews.runnerFrom.subscribe(
      'ChangedRunnerPositionStep',
      notifyModelAboutTouchValue,
    );
    this.view.subViews.runnerTo.subscribe('ChangedRunnerPositionStep', notifyModelAboutTouchValue);

    this.view.subViews.runnerFrom.subscribe(
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
    this.view.subViews.runnerTo.subscribe(
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );

    this.view.subViews.tip.subscribe(
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );

    this.view.subViews.tip.subscribe(
      'ChangedRunnerPosition',
      notifyModelAboutChangedRunnerPosition,
    );

    return this;
  }

  private attachEventEmittersToView(): Presenter {
    const notifyViewUpdatedModelOptions = (options: IOptions): void => {
      this.view.render(options);
      this.emit('onChange', options);
    };

    const notifyViewUpdatedModelValues = (options: IOptions): void => {
      this.view.update(options);
      this.emit('onChange', options);
    };

    this.model.subscribe('UpdatedModelOptions', notifyViewUpdatedModelOptions);

    this.model.subscribe('UpdatedModelValues', notifyViewUpdatedModelValues);

    return this;
  }
}

export { Presenter };
