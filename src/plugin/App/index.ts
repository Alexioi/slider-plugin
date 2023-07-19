import { Model } from '../mvp/Model';
import { View } from '../mvp/View';
import { Presenter } from '../mvp/Presenter';
import { sliderOptions } from './sliderOptions';
import { IConfig, ICallbacks, IOptions } from '../types';

class App {
  private callbacks: ICallbacks = { onChange: () => {} };

  private presenter: Presenter;

  constructor(root: HTMLElement, config?: IConfig) {
    this.presenter = this.init(root, config);
  }

  public update(config?: IConfig): void {
    this.updateCallbacks(config);
    this.presenter.updateOptions(config);
  }

  public getOptions(): IOptions | undefined {
    return this.presenter.getOptions();
  }

  private init(node: HTMLElement, config?: IConfig): Presenter {
    const options: IOptions = { ...sliderOptions.defaultConfig };

    const model = new Model(options, config);
    const view = new View(node);
    const presenter = new Presenter(view, model);

    this.attachEventEmitters(presenter);
    this.updateCallbacks(config);

    return presenter;
  }

  private attachEventEmitters(presenter: Presenter): void {
    presenter.subscribe('onChange', (options: IOptions) => {
      this.callbacks.onChange(options);
    });
  }

  private updateCallbacks(config?: IConfig) {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks = { onChange: config.onChange };
    }
  }
}

export { App };
