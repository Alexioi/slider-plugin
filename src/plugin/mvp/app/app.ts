import Presenter from '../presenter/presenter';

import { IOptions } from '../interfaces/interfaces';

class App {
  private element: JQuery;

  private options: IOptions;

  private presenter: Presenter;

  constructor(element: JQuery, options: IOptions) {
    this.element = element;
    this.options = options;

    this.presenter = this.init();

    this.updateOptions(this.options);
  }

  init(): Presenter {
    const defaultConfig: IOptions = {
      isRange: true,
      isVertical: false,
      hasTip: true,
      hasScale: true,
      step: 10,
      min: 0,
      max: 100,
      from: 40,
      to: 70,
    };

    return new Presenter(this.element, defaultConfig);
  }

  updateOptions(options: IOptions): void {
    this.presenter.updateOptions(options);
  }

  getOptions(): IOptions {
    return this.presenter.getOptions();
  }
}

export default App;
