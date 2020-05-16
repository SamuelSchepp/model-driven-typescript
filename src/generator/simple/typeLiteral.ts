import { Attribute } from "../../ast/Attribute";
import { StringType } from "../../ast/type/StringType";
import { NumberType } from "../../ast/type/NumberType";
import { BooleanType } from "../../ast/type/BooleanType";
import { EntityType } from "../../ast/type/EntityType";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";

export function typeLiteral(attribute: Attribute): string {
  let type = "";
  if (attribute.type instanceof StringType) {
    type = "string";
  } else if (attribute.type instanceof NumberType) {
    type = "number";
  } else if (attribute.type instanceof BooleanType) {
    type = "boolean";
  } else if (attribute.type instanceof EntityType) {
    type = attribute.type.entity;
  } else {
    throw new NonExhaustiveError();
  }

  if (attribute.nullable) {
    type += " | null";
  }

  return type;
}
