import { Value } from "./Value";

export class StringValue extends Value {
  constructor(
    public readonly value: string,
  ) {
    super();
  }
}
