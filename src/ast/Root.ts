import { Entity } from "./Entity";

export class Root {
  public constructor(
    public readonly name: string,
    public readonly entities: Entity[],
  ) {
  }
}
