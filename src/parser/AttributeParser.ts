import { SafeAny } from "safe-any";
import { Attribute } from "../ast/Attribute/Attribute";
import { StringAttribute } from "../ast/Attribute/StringAttribute";
import { NumberAttribute } from "../ast/Attribute/NumberAttribute";
import { BooleanAttribute } from "../ast/Attribute/BooleanAttribute";
import { OptionalStringAttribute } from "../ast/Attribute/OptionalStringAttribute";
import { OptionalNumberAttribute } from "../ast/Attribute/OptionalNumberAttribute";
import { OptionalBooleanAttribute } from "../ast/Attribute/OptionalBooleanAttribute";
import { CompoundAttribute } from "../ast/Attribute/CompoundAttribute";
import { NonExhaustiveError } from "../generator/errors/NonExhaustiveError";

export class AttributeParser {
  public static parse(json: SafeAny): Attribute {
    const type = json.get("type").stringOrNull();
    const name = json.get("name").stringValue();

    switch (type) {
    case "string":
      return new StringAttribute(name, json.get("defaultValue").stringValue(), type);
    case "number":
      return new NumberAttribute(name, json.get("defaultValue").numberValue(), type);
    case "boolean":
      return new BooleanAttribute(name, json.get("defaultValue").booleanValue(), type);
    case "string?":
      return new OptionalStringAttribute(name, json.get("defaultValue").stringOrNull(), type);
    case "number?":
      return new OptionalNumberAttribute(name, json.get("defaultValue").numberOrNull(), type);
    case "boolean?":
      return new OptionalBooleanAttribute(name, json.get("defaultValue").booleanOrNull(), type);
    case "compound":
      return new CompoundAttribute(
        name,
        json.get("attributes").arrayValue().map((attribute) => {
          return AttributeParser.parse(attribute);
        }),
      );
    default:
      throw new NonExhaustiveError();
    }
  }
}
