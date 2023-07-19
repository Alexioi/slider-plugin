import { Model } from '../mvp/Model';
import { View } from '../mvp/View';
import { Presenter } from '../mvp/Presenter';
import { sliderOptions } from './sliderOptions';
import { IConfig, ICallbacks, IOptions } from '../types';

class App {
  private callbacks: ICallbacks = { onChange: () => {} };

  private model: Model | null = null;

  private view: View | null = null;

  private presenter!: Presenter;

  constructor(root: HTMLElement, config?: IConfig) {
    this.init(root, config);
  }

  public update(config?: IConfig): void {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks.onChange = config.onChange;
    }

    this.presenter?.updateOptions(config);
  }

  public getOptions(): IOptions | undefined {
    return this.presenter?.getOptions();
  }

  private init(node: HTMLElement, config?: IConfig): void {
    this.callbacks = { ...sliderOptions.callbacks };
    const options: IOptions = { ...sliderOptions.defaultConfig };

    this.model = new Model(options, config);
    this.view = new View(node);
    this.presenter = new Presenter(this.view, this.model);
    this.attachEventEmitters();
  }

  private attachEventEmitters(): void {
    this.presenter.subscribe('onChange', (options: IOptions) => {
      this.callbacks.onChange(options);
    });
  }
}

export { App };
