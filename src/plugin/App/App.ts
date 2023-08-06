import { Config, Callbacks, Options } from '@types';

import { Model, View, Presenter } from './mvp';
import { defaultConfig } from './sliderOptions';

class App {
  private callbacks: Callbacks = { onChange: () => {} };

  private presenter: Presenter;

  constructor(root: HTMLElement, config?: Config) {
    this.presenter = this.init(root, config);
  }

  public update(config?: Config): void {
    this.updateCallbacks(config);
    this.presenter.updateOptions(config);
  }

  public getOptions(): Options | undefined {
    return this.presenter.getOptions();
  }

  private init(node: HTMLElement, config?: Config): Presenter {
    const options: Options = { ...defaultConfig };

    const model = new Model(options, config);
    const view = new View(node, config);
    const presenter = new Presenter(view, model);

    this.attachEventEmitters(presenter);
    this.updateCallbacks(config);

    return presenter;
  }

  private attachEventEmitters(presenter: Presenter): void {
    presenter.subscribe('onChange', (options: Options) => {
      this.callbacks.onChange(options);
    });
  }

  private updateCallbacks(config?: Config) {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks = { onChange: config.onChange };
    }
  }
}

export { App };
