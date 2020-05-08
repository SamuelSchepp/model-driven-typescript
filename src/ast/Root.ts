import { Entity } from "./Entity";

export class Root {
  public constructor(
    public readonly entities: Entity[],
  ) {
  }
}
