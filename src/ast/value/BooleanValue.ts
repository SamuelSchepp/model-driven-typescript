import { Value } from "./Value";

export class BooleanValue extends Value {
  public constructor(
    public readonly value: boolean,
  ) {
    super();
  }
}
