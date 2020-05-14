import { Entity } from "../ast/Entity";
import { isLegalIdentifier } from "./tools/islegalIdentifier";
import { ValidationError } from "./errors/ValidationError";
import { AttributeValidator } from "./AttributeValidator";
import { Root } from "../ast/Root";

export class EntityValidator {
  public static validate(entity: Entity, root: Root): void {
    if (!isLegalIdentifier(entity.name)) {
      throw new ValidationError(`Entity name is not allowed.`, { name: entity.name });
    }

    entity.attributes.forEach((attribute) => {
      AttributeValidator.validate(attribute, entity, root);
    });
  }
}
