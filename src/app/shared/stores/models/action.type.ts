export interface ActionType<T> extends Function {
  readonly type: string;

  new(...args: any[]): T;
}
