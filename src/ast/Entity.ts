import { Attribute } from "./Attribute/Attribute";

export class Entity {
  public constructor(
    public readonly name: string,
    public readonly attributes: Attribute[],
  ) {
  }
}
