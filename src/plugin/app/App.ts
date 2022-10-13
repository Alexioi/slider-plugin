import EventEmitter from '../EventEmitter/EventEmitter';
import Model from '../mvp/model/Model';
import View from '../mvp/view/View';
import Presenter from '../mvp/presenter/Presenter';
import sliderOptions from './sliderOptions';
import { IConfig, ICallbacks, IOptions } from '../types/types';

class App {
  private callbacks!: ICallbacks;

  private model!: Model;

  private view!: View;

  private presenter!: Presenter;

  private eventEmitter!: EventEmitter;

  constructor(node: HTMLElement, config?: IConfig) {
    this.init(node, config);
  }

  public update(config?: IConfig): void {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks.onChange = config.onChange;
    }

    this.presenter.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.presenter.getOptions();
  }

  private init(node: HTMLElement, config?: IConfig): void {
    this.callbacks = { ...sliderOptions.callbacks };
    const options: IOptions = JSON.parse(JSON.stringify({ ...sliderOptions.defaultConfig }));

    this.eventEmitter = new EventEmitter();
    this.model = new Model(options, this.eventEmitter);
    this.view = new View(node, options, this.eventEmitter);
    this.presenter = new Presenter(this.view, this.model, this.eventEmitter);
    this.attachEventEmitters();

    this.update(config);
  }

  private attachEventEmitters(): void {
    this.eventEmitter.subscribe('onChange', (options: IOptions) => {
      this.callbacks.onChange(options);
    });
  }
}

export default App;
