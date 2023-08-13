import { Config, ElementPosition, Options, ElementTouch } from '@types';

import { View } from '../View';
import { Model } from '../Model';

class Presenter {
  private view: View;

  private model: Model;

  constructor(view: View, model: Model) {
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

    this.view.subscribeSubViewToEvents(
      'scale',
      'ClickScale',
      notifyModelClickedScale,
    );
    this.view.subscribeSubViewToEvents(
      'runnerFrom',
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );
    this.view.subscribeSubViewToEvents(
      'runnerTo',
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );
    this.view.subscribeSubViewToEvents(
      'runnerFrom',
      'ChangeRunnerPositionByStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribeSubViewToEvents(
      'runnerTo',
      'ChangeRunnerPositionByStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribeSubViewToEvents(
      'runnerFrom',
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );
    this.view.subscribeSubViewToEvents(
      'runnerTo',
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );
    this.view.subscribeSubViewToEvents(
      'tip',
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );
    this.view.subscribeSubViewToEvents(
      'tip',
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );

    this.view.subscribeSubViewToEvents(
      'bar',
      'ChangeNearRunnerPosition',
      notifyModelAboutBarClick,
    );

    return this;
  }

  private attachEventEmittersToView(): Presenter {
    const notifyViewUpdateModelOptions = (options: Options): void => {
      this.view.render(options);
    };

    const notifyViewUpdateModelValues = (options: Options): void => {
      this.view.update(options);
    };

    this.model.subscribe('UpdateModelOptions', notifyViewUpdateModelOptions);

    this.model.subscribe('UpdateModelValues', notifyViewUpdateModelValues);

    return this;
  }
}

export { Presenter };
