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

  public updateConfig(config?: Partial<Config>): void {
    this.model.updateConfig(config);
  }

  public getConfig(): Config {
    return this.model.getConfig();
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
      this.model.calculateNearValueUsingFraction(position, true);
    };

    this.view.subscribe('ClickScale', notifyModelClickedScale);
    this.view.subscribe(
      'ChangeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );
    this.view.subscribe(
      'ChangeRunnerPositionByStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribe(
      'ChangeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
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
