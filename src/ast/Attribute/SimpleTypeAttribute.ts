import { Attribute } from "./Attribute";

export abstract class SimpleTypeAttribute<T> extends Attribute {
  public constructor(
    name: string,
    public readonly defaultValue: T,
    type: string,
  ) {
    super(
      name,
      type,
    );
  }
}
