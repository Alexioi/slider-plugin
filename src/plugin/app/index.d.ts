declare interface IApp {
  public update(config: IConfig | undefined): void;
  public getOptions(): IOptions;
}
