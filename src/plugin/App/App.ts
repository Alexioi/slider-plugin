import { Config, Options } from '@types';

import { Model, View, Presenter } from './mvp';
import { defaultOptions } from './sliderOptions';

const init = (node: HTMLElement, config?: Partial<Config>): Presenter => {
  const options: Options = { ...defaultOptions };

  const model = new Model(options, config);
  const view = new View(node);
  const presenter = new Presenter(view, model);

  return presenter;
};

class App {
  private presenter: Presenter;

  constructor(root: HTMLElement, config?: Partial<Config>) {
    this.presenter = init(root, config);
  }

  public update(config?: Partial<Config>): void {
    this.presenter.updateConfig(config);
  }

  public getConfig(): Config {
    return this.presenter.getConfig();
  }
}

export { App };
