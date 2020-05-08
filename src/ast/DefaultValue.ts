import { SafeAny, Type } from "safe-any";

export class DefaultValue {
  constructor(
    public readonly value: string | number | boolean,
  ) {
  }

  public isString(): boolean {
    return new SafeAny(this.value).type === Type.string;
  }

  public isBoolean(): boolean {
    return new SafeAny(this.value).type === Type.boolean;
  }

  public isNumber(): boolean {
    return new SafeAny(this.value).type === Type.number;
  }
}
