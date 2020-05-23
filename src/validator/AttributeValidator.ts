import { Attribute } from "../ast/Attribute/Attribute";
import { isLegalIdentifier } from "./tools/islegalIdentifier";
import { ValidationError } from "./errors/ValidationError";
import { Entity } from "../ast/Entity";
import { Root } from "../ast/Root";

export class AttributeValidator {
  public static validate(attribute: Attribute, entity: Entity, root: Root): void {
    if (!isLegalIdentifier(attribute.name)) {
      throw new ValidationError(`Attribute name is not allowed.`, { name: attribute.name });
    }
  }
}
