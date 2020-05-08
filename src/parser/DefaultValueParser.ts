import { SafeAny, Type } from "safe-any";
import { DefaultValue } from "../ast/DefaultValue";
import { ValueNotAllowedError } from "./errors/ValueNotAllowedError";

export class DefaultValueParser {
  public static parse(json: SafeAny): DefaultValue | null {
    switch (json.type) {
    case Type.null:
      return null;
    case Type.boolean:
      return new DefaultValue(json.booleanValue());
    case Type.number:
      return new DefaultValue(json.numberValue());
    case Type.string:
      return new DefaultValue(json.stringValue());
    default:
      throw new ValueNotAllowedError(
        "Default Value",
        json.native(),
        ["String Literal", "Number Literal", "Boolean Literal"],
      );
    }
  }
}
