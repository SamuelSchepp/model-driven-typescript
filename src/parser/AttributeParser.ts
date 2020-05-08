import { SafeAny } from "safe-any";
import { Attribute } from "../ast/Attribute";
import { SimpleTypeParser } from "./SimpleTypeParser";
import { DefaultValueParser } from "./DefaultValueParser";

export class AttributeParser {
  public static parse(json: SafeAny): Attribute {
    return new Attribute(
      json.get("name").stringValue(),
      SimpleTypeParser.parse(json.get("type")),
      json.get("nullable").booleanValue(),
      DefaultValueParser.parse(json.get("defaultValue")),
    );
  }
}
