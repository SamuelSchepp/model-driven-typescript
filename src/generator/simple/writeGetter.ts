import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { typeLiteral } from "./typeLiteral";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { toUpperCamelCase } from "./toUpperCamelCase";

function handleSimpleType(buffer: StringBuffer, attribute: Attribute, entityName: string): void {
  buffer.tab();
  buffer.linePart(`public get${toUpperCamelCase(attribute.name)}(): `);
  typeLiteral(attribute, buffer, entityName);
  buffer.linePart(` {`);
  buffer.newline();
  buffer.tabIn();
  buffer.line(`return this.${attribute.name};`);
  buffer.tabOut();
  buffer.line(`}`);
  buffer.line(``);
}

export function writeGetter(buffer: StringBuffer, attribute: Attribute, entityName: string): void {
  if (attribute instanceof StringAttribute || attribute instanceof OptionalStringAttribute) {
    handleSimpleType(buffer, attribute, entityName);
  } else if (attribute instanceof BooleanAttribute || attribute instanceof OptionalBooleanAttribute) {
    handleSimpleType(buffer, attribute, entityName);
  } else if (attribute instanceof NumberAttribute || attribute instanceof OptionalNumberAttribute) {
    handleSimpleType(buffer, attribute, entityName);
  } else if (attribute instanceof CompoundAttribute) {
    buffer.tab();
    buffer.linePart(`public get${toUpperCamelCase(attribute.name)}(): `);
    typeLiteral(attribute, buffer, entityName);
    buffer.linePart(` {`);
    buffer.newline();
    buffer.tabIn();
    buffer.line(`return this.${attribute.name};`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
  } else {
    throw new NonExhaustiveError();
  }
}
