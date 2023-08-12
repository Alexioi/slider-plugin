import { Config, Options } from '@types';

import { Model, View, Presenter } from './mvp';
import { defaultOptions } from './sliderOptions';

class App {
  private callbacks: any = { onChange: () => {} };

  private presenter: Presenter;

  constructor(root: HTMLElement, config?: Partial<Config>) {
    this.presenter = this.init(root, config);
  }

  public update(config?: Partial<Config>): void {
    this.updateCallbacks(config);
    this.presenter.updateOptions(config);
  }

  public getOptions(): Options {
    return this.presenter.getOptions();
  }

  private init(node: HTMLElement, config?: Partial<Config>): Presenter {
    const options: Options = { ...defaultOptions };

    const model = new Model(options, config);
    const view = new View(node);
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

  private updateCallbacks(config?: Partial<Config>) {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks = { onChange: config.onChange };
    }
  }
}

export { App };
