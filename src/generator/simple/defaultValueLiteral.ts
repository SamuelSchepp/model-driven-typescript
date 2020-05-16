import { Attribute } from "../../ast/Attribute";
import { EntityType } from "../../ast/type/EntityType";
import { StringValue } from "../../ast/value/StringValue";
import { NumberValue } from "../../ast/value/NumberValue";
import { BooleanValue } from "../../ast/value/BooleanValue";
import { StringType } from "../../ast/type/StringType";
import { NumberType } from "../../ast/type/NumberType";
import { BooleanType } from "../../ast/type/BooleanType";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { NullValue } from "../../ast/value/NullValue";

export function defaultValueLiteral(attribute: Attribute): string {
  if (attribute.type instanceof EntityType) {
    if (attribute.nullable) {
      return "null";
    } else {
      return `${attribute.type.entity}.create()`;
    }
  } else if (attribute.defaultValue instanceof StringValue) {
    return `"${attribute.defaultValue.value}"`;
  } else if (attribute.defaultValue instanceof NumberValue) {
    return `${attribute.defaultValue.value}`;
  } else if (attribute.defaultValue instanceof BooleanValue) {
    return `${attribute.defaultValue.value ? "true" : "false"}`;
  } else if (attribute.defaultValue instanceof NullValue) {
    if (!attribute.nullable) {
      if (attribute.type instanceof StringType) {
        return `""`;
      } else if (attribute.type instanceof NumberType) {
        return `0`;
      } else if (attribute.type instanceof BooleanType) {
        return `false`;
      } else {
        throw new NonExhaustiveError();
      }
    } else {
      return `null`;
    }
  } else {
    throw new NonExhaustiveError();
  }
}
