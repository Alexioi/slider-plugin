import Presenter from '../presenter/presenter';

import { IOptions, IConfig } from '../interfaces/interfaces';

class App {
  private element: JQuery;

  private config: IConfig | undefined;

  private methods: any;

  private presenter: Presenter;

  constructor(element: JQuery, config: IConfig | undefined) {
    this.element = element;
    this.config = config;
    this.methods = { onChange: function onChange(options: IOptions) {} };

    this.presenter = this.init();
    this.addEventEmitters();

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

  public updateOptions(config: IConfig | undefined): void {
    if (typeof config === 'undefined') {
      return;
    }

    this.config = config;

    if (typeof this.config.onChange !== 'undefined') {
      this.methods.onChange = this.config.onChange;
    }

    this.presenter.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.presenter.getOptions();
  }

  private onChange(options: IOptions): void {
    this.methods.onChange(options);
  }

  private addEventEmitters(): void {
    this.presenter.subscribe('onChange', (options: IOptions) => this.onChange(options));
  }
}

export default App;
