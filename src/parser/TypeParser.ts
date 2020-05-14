import { SafeAny } from "safe-any";
import { ValueNotAllowedError } from "./errors/ValueNotAllowedError";
import { Type } from "../ast/type/Type";
import { StringType } from "../ast/type/StringType";
import { NumberType } from "../ast/type/NumberType";
import { BooleanType } from "../ast/type/BooleanType";
import { EntityType } from "../ast/type/EntityType";

export class TypeParser {
  public static parse(json: SafeAny): Type {
    const stringLiteral = json.stringOrNull();

    if (stringLiteral == null) {
      throw new ValueNotAllowedError(
        "type",
        stringLiteral,
        [
          "string",
          "number",
          "boolean",
          "[EntityName]",
        ],
      );
    }

    switch (stringLiteral) {
    case "string":
      return new StringType();
    case "number":
      return new NumberType();
    case "boolean":
      return new BooleanType();
    default:
      return new EntityType(stringLiteral);
    }
  }
}
