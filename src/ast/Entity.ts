import { SimpleType } from "./SimpleType";
import { Attribute } from "./Attribute";

export class Entity {
  public constructor(
    public readonly name: string,
    public readonly attributes: Attribute[],
  ) {
  }
}
