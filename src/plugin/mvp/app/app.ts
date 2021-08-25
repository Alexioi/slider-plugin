import Presenter from '../presenter/presenter';

import { IOptions, IConfig } from '../interfaces/interfaces';

class App {
  private element: JQuery;

  private config: IConfig | undefined;

  private presenter: Presenter;

  constructor(element: JQuery, config: IConfig | undefined) {
    this.element = element;
    this.config = config;

    this.presenter = this.init();

    this.updateOptions(this.config);
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

  updateOptions(config: IConfig | undefined): void {
    if (typeof config === 'undefined') {
      return;
    }

    this.presenter.updateOptions(config);
  }

  getOptions(): IOptions {
    return this.presenter.getOptions();
  }
}

export default App;
