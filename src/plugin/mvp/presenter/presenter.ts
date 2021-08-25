import Model from '../model/model';
import View from '../view/view';

import { IConfig, IOptions, IPosition } from '../interfaces/interfaces';

class Presenter {
  private view: View;

  private model: Model;

  private element: JQuery;

  constructor(element: JQuery, options: IOptions) {
    this.element = element;
    this.view = new View(this.element);
    this.model = new Model(options);

    this.addEventEmitters();

    this.model.updatedOptions();
  }

  public updateOptions(config: IConfig): void {
    this.model.verifyAllOptions(config);
  }

  public getOptions(): IOptions {
    return this.model.getOptions();
  }

  private addEventEmitters(): void {
    this.model.subscribe('updateModelOptions', (options: IOptions) =>
      this.view.updateSlider(options)
    );

    this.model.subscribe('updateModelFrom', (options: IOptions) =>
      this.view.updatePositionFrom(options)
    );

    this.model.subscribe('updateModelTo', (options: IOptions) =>
      this.view.updatePositionTo(options)
    );

    this.view.subscribe('clickScale', (value: number) => this.model.updateNearValue(value));

    this.view.subscribe('click', (position: IPosition) => this.model.updateValue(position));
  }
}

export default Presenter;
