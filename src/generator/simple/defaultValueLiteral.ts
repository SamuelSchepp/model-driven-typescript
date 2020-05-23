import { Attribute } from "../../ast/Attribute/Attribute";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { StringBuffer } from "../tools/StringBuffer";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";

export function defaultValueLiteral(attribute: Attribute, buffer: StringBuffer): void {
  if (attribute instanceof CompoundAttribute) {
    buffer.linePart(`{`);
    buffer.newline();
    buffer.tabIn();
    attribute.attributes.forEach((subAttribute) => {
      buffer.tab();
      buffer.linePart(`${subAttribute.name}: `);
      defaultValueLiteral(subAttribute, buffer);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.tabOut();
    buffer.tab();
    buffer.linePart(`}`);
  } else if (attribute instanceof StringAttribute) {
    buffer.linePart(`"${attribute.defaultValue}"`);
  } else if (attribute instanceof NumberAttribute) {
    buffer.linePart(`${attribute.defaultValue}`);
  } else if (attribute instanceof BooleanAttribute) {
    buffer.linePart(`${attribute.defaultValue ? "true" : "false"}`);
  } else if (attribute instanceof OptionalStringAttribute) {
    buffer.linePart(attribute.defaultValue == null ? "null" : `"${attribute.defaultValue}"`);
  } else if (attribute instanceof OptionalNumberAttribute) {
    buffer.linePart(attribute.defaultValue == null ? "null" : `${attribute.defaultValue}`);
  } else if (attribute instanceof OptionalBooleanAttribute) {
    buffer.linePart(attribute.defaultValue == null ? "null" : `${attribute.defaultValue ? "true" : "false"}`);
  } else {
    throw new NonExhaustiveError();
  }
}
