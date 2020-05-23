import { Attribute } from "../../ast/Attribute/Attribute";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { StringBuffer } from "../tools/StringBuffer";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";

export function typeLiteral(attribute: Attribute, buffer: StringBuffer): void {
  if (attribute instanceof StringAttribute) {
    buffer.linePart(`string`);
  } else if (attribute instanceof NumberAttribute) {
    buffer.linePart(`number`);
  } else if (attribute instanceof BooleanAttribute) {
    buffer.linePart(`boolean`);
  } else if (attribute instanceof OptionalStringAttribute) {
    buffer.linePart(`string | null`);
  } else if (attribute instanceof OptionalNumberAttribute) {
    buffer.linePart(`number | null`);
  } else if (attribute instanceof OptionalBooleanAttribute) {
    buffer.linePart(`boolean | null`);
  } else if (attribute instanceof CompoundAttribute) {
    buffer.linePart(`{`);
    buffer.newline();
    buffer.tabIn();
    attribute.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      typeLiteral(attribute, buffer);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.tabOut();
    buffer.tab();
    buffer.linePart(`}`);
  } else {
    throw new NonExhaustiveError();
  }
}
