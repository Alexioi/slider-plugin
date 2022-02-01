declare interface IView {
  public render(options: IOptions, whichRunnerChanged?: 'from' | 'to'): void;
}
