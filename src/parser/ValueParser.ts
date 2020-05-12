import { SafeAny, Type } from "safe-any";
import { Value } from "../ast/value/Value";
import { ValueNotAllowedError } from "./errors/ValueNotAllowedError";
import { BooleanValue } from "../ast/value/BooleanValue";
import { NumberValue } from "../ast/value/NumberValue";
import { StringValue } from "../ast/value/StringValue";
import { NullValue } from "../ast/value/NullValue";

export class ValueParser {
  public static parse(json: SafeAny): Value {
    switch (json.type) {
    case Type.null:
      return new NullValue();
    case Type.boolean:
      return new BooleanValue(json.booleanValue());
    case Type.number:
      return new NumberValue(json.numberValue());
    case Type.string:
      return new StringValue(json.stringValue());
    default:
      throw new ValueNotAllowedError(
        "Default Value",
        json.native(),
        ["String Literal", "Number Literal", "Boolean Literal"],
      );
    }
  }
}
