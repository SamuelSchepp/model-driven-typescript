import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { typeLiteral } from "./typeLiteral";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { toUpperCamelCase } from "./toUpperCamelCase";

function handleSimpleType(buffer: StringBuffer, attribute: Attribute, entityName: string): void {
  buffer.tab();
  buffer.linePart(`public set${toUpperCamelCase(attribute.name)}(newValue: `);
  typeLiteral(attribute, buffer, entityName);
  buffer.linePart(`): void {`);
  buffer.newline();
  buffer.tabIn();
  buffer.line(`this.${attribute.name} = newValue;`);
  buffer.line(`super.updateModifiedDate();`);
  buffer.tabOut();
  buffer.line(`}`);
  buffer.line(``);
}

export function writeSetter(buffer: StringBuffer, attribute: Attribute, entityName: string): void {
  if (attribute instanceof StringAttribute || attribute instanceof OptionalStringAttribute) {
    handleSimpleType(buffer, attribute, entityName);
  } else if (attribute instanceof BooleanAttribute || attribute instanceof OptionalBooleanAttribute) {
    handleSimpleType(buffer, attribute, entityName);
  } else if (attribute instanceof NumberAttribute || attribute instanceof OptionalNumberAttribute) {
    handleSimpleType(buffer, attribute, entityName);
  } else if (attribute instanceof CompoundAttribute) {
    // no setter
  } else {
    throw new NonExhaustiveError();
  }
}
