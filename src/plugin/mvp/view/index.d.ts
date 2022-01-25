declare interface View {
  public render(options: IOptions, whichRunnerChanged?: 'from' | 'to'): void;
}
