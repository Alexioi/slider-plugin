declare interface Model {
  public updateOptions(config: IConfig): void;

  public getOptions(): IOptions;

  public calculateFromUsingFraction({ x, y }: IPosition): void;

  public calculateToUsingFraction({ x, y }: IPosition): void;

  public updateNearValue(value: number): void;
}
