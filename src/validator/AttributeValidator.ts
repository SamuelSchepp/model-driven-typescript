import { Attribute } from "../ast/Attribute";
import { isLegalIdentifier } from "./tools/islegalIdentifier";
import { ValidationError } from "./errors/ValidationError";

export class AttributeValidator {
  public static validate(attribute: Attribute) {
    if (!isLegalIdentifier(attribute.name)) {
      throw new ValidationError(`Attribute name is not allowed.`, { name: attribute.name });
    }
  }
}
