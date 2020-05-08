import { SafeAny } from "safe-any";
import { SimpleType } from "../ast/SimpleType";
import { ValueNotAllowedError } from "./errors/ValueNotAllowedError";

export class SimpleTypeParser {
  public static parse(json: SafeAny): SimpleType {
    const stringLiteral = json.stringValue();
    if (Object.values(SimpleType).includes(stringLiteral as SimpleType)) {
      return stringLiteral as SimpleType;
    } else {
      throw new ValueNotAllowedError(
        "Type",
        stringLiteral,
        Object.values(SimpleType),
      );
    }
  }
}
