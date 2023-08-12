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

  public updateOptions(config?: Partial<Config>): void {
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

    const notifyModelAboutChangeRunnerPosition = ({
      position,
      type,
    }: ElementPosition) => {
      this.model.calculateValueUsingFraction({ position, type }, false);
    };

    const notifyModelAboutTouchValue = ({ type, touchRoute }: ElementTouch) => {
      this.model.updateValueByStep({ type, touchRoute });
    };

    const notifyModelAboutChangeNearRunnerPosition = ({
      position,
    }: {
      position: { x: number; y: number };
    }) => {
      this.model.calculateNearValueUsingFraction(position, false);
    };

    const notifyModelAboutBarClick = ({
      position,
    }: {
      position: { x: number; y: number };
    }) => {
      this.model.calculateNearValueUsingFraction(position, true);
    };

    this.view.subscribeSubCViewToEvents(
      'scale',
      'ClickScale',
      notifyModelClickedScale,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerFrom',
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerTo',
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerFrom',
      'ChangeRunnerPositionByStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerTo',
      'ChangeRunnerPositionByStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerFrom',
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'runnerTo',
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'tip',
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );
    this.view.subscribeSubCViewToEvents(
      'tip',
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );

    this.view.subscribeSubCViewToEvents(
      'bar',
      'ChangeNearRunnerPosition',
      notifyModelAboutBarClick,
    );

    return this;
  }

  private attachEventEmittersToView(): Presenter {
    const notifyViewUpdateModelOptions = (options: Options): void => {
      this.view.render(options);
      this.emit('onChange', options);
    };

    const notifyViewUpdateModelValues = (options: Options): void => {
      this.view.update(options);
      this.emit('onChange', options);
    };

    this.model.subscribe('UpdateModelOptions', notifyViewUpdateModelOptions);

    this.model.subscribe('UpdateModelValues', notifyViewUpdateModelValues);

    return this;
  }
}

export { Presenter };
