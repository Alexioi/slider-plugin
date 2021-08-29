import Presenter from '../presenter/presenter';

import { IOptions, IConfig, ICallbacks } from '../interfaces/interfaces';

class App {
  private callbacks: ICallbacks;

  private presenter: Presenter;

  constructor(element: HTMLElement, config: IConfig | undefined) {
    this.callbacks = { onChange: function onChange() {} };

    this.presenter = this.init(element);
    this.attachEventEmitters();

    this.update(config);
  }

  public update(config: IConfig | undefined): void {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks.onChange = config.onChange;
    }

    // for (let key in this.callbacks) {
    //   if (typeof config[key] !== 'undefined') {
    //     this.callbacks[key] = config[key];
    //   }
    // }

    this.presenter.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.presenter.getOptions();
  }

  private init(element: HTMLElement): Presenter {
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

    return new Presenter(element, defaultConfig);
  }

  private attachEventEmitters(): void {
    this.presenter.subscribe('onChange', (options: IOptions) => this.callbacks.onChange(options));
  }
}

export default App;
