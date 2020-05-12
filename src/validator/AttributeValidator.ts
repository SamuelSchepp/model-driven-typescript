import { Attribute } from "../ast/Attribute";
import { isLegalIdentifier } from "./tools/islegalIdentifier";
import { ValidationError } from "./errors/ValidationError";
import { ObjectType } from "../ast/type/ObjectType";
import { NullValue } from "../ast/value/NullValue";
import { StringType } from "../ast/type/StringType";
import { NumberType } from "../ast/type/NumberType";
import { StringValue } from "../ast/value/StringValue";
import { NumberValue } from "../ast/value/NumberValue";
import { BooleanType } from "../ast/type/BooleanType";
import { BooleanValue } from "../ast/value/BooleanValue";

export class AttributeValidator {
  public static validate(attribute: Attribute) {
    if (!isLegalIdentifier(attribute.name)) {
      throw new ValidationError(`Attribute name is not allowed.`, { name: attribute.name });
    }

    if (attribute.type instanceof ObjectType) {
      if (!(attribute.defaultValue instanceof NullValue)) {
        throw new ValidationError(`Default value is not allowed, because attribute type is object.`, { name: attribute.name });
      }

      if (attribute.nullable) {
        throw new ValidationError(`Default value cannot be nullable, because attribute type is object.`, { name: attribute.name });
      }
    } else {
      if (attribute.attributes.length > 0) {
        throw new ValidationError(`Sub-attributes are not allowed, because attribute type is not 'object'.`, { name: attribute.name });
      }

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

    attribute.attributes.forEach((attribute) => {
      AttributeValidator.validate(attribute);
    });
  }
}
