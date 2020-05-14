import { Attribute } from "../ast/Attribute";
import { isLegalIdentifier } from "./tools/islegalIdentifier";
import { ValidationError } from "./errors/ValidationError";
import { EntityType } from "../ast/type/EntityType";
import { NullValue } from "../ast/value/NullValue";
import { StringType } from "../ast/type/StringType";
import { NumberType } from "../ast/type/NumberType";
import { StringValue } from "../ast/value/StringValue";
import { NumberValue } from "../ast/value/NumberValue";
import { BooleanType } from "../ast/type/BooleanType";
import { BooleanValue } from "../ast/value/BooleanValue";
import { Entity } from "../ast/Entity";
import { Root } from "../ast/Root";

export class AttributeValidator {
  public static validate(attribute: Attribute, entity: Entity, root: Root) {
    if (!isLegalIdentifier(attribute.name)) {
      throw new ValidationError(`Attribute name is not allowed.`, { name: attribute.name });
    }

    if (attribute.type instanceof EntityType) {
      if (!(attribute.defaultValue != null)) {
        throw new ValidationError(`Default value is not allowed, because attribute type is entity.`, { name: attribute.name });
      }

      if (!root.entities.map((entity) => entity.name).includes(attribute.type.entity)) {
        throw new ValidationError(`Entity not found.`, {type: attribute.type});
      }
    } else {
      if (attribute.type instanceof StringType) {
        if (!(attribute.defaultValue instanceof StringValue) && !(attribute.defaultValue instanceof NullValue)) {
          throw new ValidationError(`The default value must be of type 'string' or null.`, { name: attribute.name });
        }
      }

      if (attribute.type instanceof NumberType) {
        if (!(attribute.defaultValue instanceof NumberValue) && !(attribute.defaultValue instanceof NullValue)) {
          throw new ValidationError(`The default value must be of type 'number' or null.`, { name: attribute.name });
        }
      }

      if (attribute.type instanceof BooleanType) {
        if (!(attribute.defaultValue instanceof BooleanValue) && !(attribute.defaultValue instanceof NullValue)) {
          throw new ValidationError(`The default value must be of type 'boolean' or null.`, { name: attribute.name });
        }
      }
    }
  }
}
