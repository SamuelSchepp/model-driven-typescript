import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { Entity } from "../../ast/Entity";
import { defaultValueLiteral } from "./defaultValueLiteral";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { toUpperCamelCase } from "./toUpperCamelCase";

function handleSimpleType(buffer: StringBuffer, type: string, attribute: Attribute, entityName: string): void {
  buffer.linePart(`this.parse${type}OrNull(json?.${attribute.name}) ?? `);
  defaultValueLiteral(attribute, buffer, entityName);
}

export function attributeParserConstruct(buffer: StringBuffer, attribute: Attribute, entityName: string): void {
  if (attribute instanceof StringAttribute || attribute instanceof OptionalStringAttribute) {
    handleSimpleType(buffer, "String", attribute, entityName);
  } else if (attribute instanceof BooleanAttribute || attribute instanceof OptionalBooleanAttribute) {
    handleSimpleType(buffer, "Boolean", attribute, entityName);
  } else if (attribute instanceof NumberAttribute || attribute instanceof OptionalNumberAttribute) {
    handleSimpleType(buffer, "Number", attribute, entityName);
  } else if (attribute instanceof CompoundAttribute) {
    buffer.linePart(`${entityName}${toUpperCamelCase(attribute.name)}.fromJson(json?.${attribute.name})`);
  } else {
    throw new NonExhaustiveError();
  }
}
