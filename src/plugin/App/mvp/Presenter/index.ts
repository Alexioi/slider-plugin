import { EventEmitter } from '@helpers/EventEmitter';
import {
  Config,
  ElementPosition,
  Options,
  ElementTouch,
  EventTypes,
} from '@types';

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
    const notifyModelClickedScale = ({
      targetNumber,
    }: {
      targetNumber: number;
    }) => {
      this.model.updateNearValue(targetNumber);
    };

    const notifyModelAboutChangedRunnerPosition = ({
      position,
      type,
    }: ElementPosition) => {
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

    this.view.subscribeSubCViewToEvents(
      'scale',
      'ClickScale',
      notifyModelClickedScale,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerFrom',
      'ChangedRunnerPosition',
      notifyModelAboutChangedRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerTo',
      'ChangedRunnerPosition',
      notifyModelAboutChangedRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerFrom',
      'ChangedRunnerPositionStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerTo',
      'ChangedRunnerPositionStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerFrom',
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerTo',
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'tip',
      'ChangedNearRunnerPosition',
      notifyModelAboutChangedNearRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'tip',
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
