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

    this.view.subscribe('clickScale', notifyModelClickedScale);
    this.view.subscribe(
      'changeRunnerPosition',
      notifyModelAboutChangeRunnerPosition,
    );
    this.view.subscribe(
      'changeRunnerPositionByStep',
      notifyModelAboutTouchValue,
    );
    this.view.subscribe(
      'changeNearRunnerPosition',
      notifyModelAboutChangeNearRunnerPosition,
    );

    return this;
  }

  private attachEventEmittersToView(): Presenter {
    const notifyViewUpdateOptions = (options: Options): void => {
      this.view.render(options);
    };

    const notifyViewUpdateValues = (options: Options): void => {
      this.view.update(options);
    };

    this.model.subscribe('updateOptions', notifyViewUpdateOptions);

    this.model.subscribe('updateValues', notifyViewUpdateValues);

    return this;
  }
}

export { Presenter };
