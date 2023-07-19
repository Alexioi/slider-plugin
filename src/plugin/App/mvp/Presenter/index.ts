import { EventEmitter } from '@helpers/EventEmitter';
import { Config, ElementPosition, Options, ElementTouch, EventTypes } from '@types';

import { View } from '../View';
import { Model } from '../Model';

class Presenter extends EventEmitter<EventTypes> {
  private view: View;

  private model: Model;

  constructor(view: View, model: Model) {
    super();

    this.view = view;
    this.model = model;

    this.attachEventEmittersToModel().attachEventEmittersToView();
  }

  public updateOptions(config?: Config): void {
    this.model.updateOptions(config);
  }

  public getOptions(): Options {
    return this.model.getOptions();
  }

  private attachEventEmittersToModel(): Presenter {
    const notifyModelClickedScale = ({ targetNumber }: { targetNumber: number }) => {
      this.model.updateNearValue(targetNumber);
    };

    const notifyModelAboutChangedRunnerPosition = ({ position, type }: ElementPosition) => {
      this.model.calculateValueUsingFraction({ position, type });
    };

    const notifyModelAboutTouchValue = ({ type, touchRoute }: ElementTouch) => {
      this.model.updateValueByStep({ type, touchRoute });
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
    const notifyViewUpdatedModelOptions = (options: Options): void => {
      this.view.render(options);
      this.emit('onChange', options);
    };

    const notifyViewUpdatedModelValues = (options: Options): void => {
      this.view.update(options);
      this.emit('onChange', options);
    };

    this.model.subscribe('UpdatedModelOptions', notifyViewUpdatedModelOptions);

    this.model.subscribe('UpdatedModelValues', notifyViewUpdatedModelValues);

    return this;
  }
}

export { Presenter };
