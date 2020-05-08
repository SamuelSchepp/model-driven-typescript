import { SimpleType } from "./SimpleType";
import { DefaultValue } from "./DefaultValue";

export class Attribute {
  public constructor(
    public readonly name: string,
    public readonly type: SimpleType,
    public readonly nullable: boolean,
    public readonly defaultValue: DefaultValue | null,
  ) {
  }
}
