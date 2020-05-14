import { SafeAny } from "safe-any";
import { Attribute } from "../ast/Attribute";
import { TypeParser } from "./TypeParser";
import { ValueParser } from "./ValueParser";

export class AttributeParser {
  public static parse(json: SafeAny): Attribute {
    return new Attribute(
      json.get("name").stringValue(),
      TypeParser.parse(json.get("type")),
      json.get("nullable").booleanValue(),
      ValueParser.parse(json.get("defaultValue")),
    );
  }
}
