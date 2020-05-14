import { Value } from "./value/Value";
import { Type } from "./type/Type";

export class Attribute {
  public constructor(
    public readonly name: string,
    public readonly type: Type,
    public readonly nullable: boolean,
    public readonly defaultValue: Value,
  ) {
  }
}
