/// <reference types="JQuery" />

type IConfig = import('./types/types').IConfig;
type IOptions = import('./types/types').IOptions;
type ITipOptions = import('./types/types').ITipOptions;
type IScaleOptions = import('./types/types').IScaleOptions;
type IRunnerOptions = import('./types/types').IRunnerOptions;
type IElementPosition = import('./types/types').IElementPosition;
type IPosition = import('./types/types').IPosition;
type IRangeOptions = import('./types/types').IRangeOptions;
type ICallbacks = import('./types/types').ICallbacks;

declare interface JQuery {
  slider: (config?: IConfig) => JQuery<IApp>;
}
