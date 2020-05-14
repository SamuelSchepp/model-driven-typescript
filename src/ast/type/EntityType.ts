import { Type } from "./Type";

export class EntityType extends Type {
  constructor(
    public entity: string,
  ) {
    super();
  }
}
