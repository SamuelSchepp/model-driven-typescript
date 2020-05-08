import { Entity } from "../ast/Entity";
import { isLegalIdentifier } from "./tools/islegalIdentifier";
import { ValidationError } from "./errors/ValidationError";

export class EntityValidator {
  public static validate(entity: Entity): void {
    if (!isLegalIdentifier(entity.name)) {
      throw new ValidationError(`Entity name is not allowed.`, { name: entity.name });
    }
  }
}
