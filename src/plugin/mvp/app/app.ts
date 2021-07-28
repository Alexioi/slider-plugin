import Presenter from '../presenter/presenter';

import { IOptions } from '../interfaces/interfaces';

class App {
  element: any;

  options: IOptions;

  presenter!: Presenter;

  constructor(element: JQuery, options: IOptions) {
    this.element = element;
    this.options = options || {};

    this.init();
  }

  init(): void {
    const defaultOptions: IOptions = {
      isRange: true,
      isVertical: false,
      hasTip: true,
      hasScale: false,
      numberMarks: 5,
      step: 10,
      min: 0,
      max: 100,
      from: 40,
      to: 70,
    };

    this.presenter = new Presenter(this.element, this.options, defaultOptions);
  }

  updateOptions(options: IOptions): void {
    this.presenter.updateOptions(options);
  }

  getOptions(): IOptions {
    return this.presenter.getOptions();
  }
}

export default App;
