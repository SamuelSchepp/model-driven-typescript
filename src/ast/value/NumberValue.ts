import { Value } from "./Value";

export class NumberValue extends Value {
  public constructor(
    public readonly value: number,
  ) {
    super();
  }
}
