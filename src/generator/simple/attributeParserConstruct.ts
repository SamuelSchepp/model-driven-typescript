import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { Entity } from "../../ast/Entity";
import { defaultValueLiteral } from "./defaultValueLiteral";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { pathLieral } from "./pathLieral";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";

function handleSimpleType(buffer: StringBuffer, type: string, path: string[], attribute: Attribute): void {
  buffer.linePart(`this.parse${type}OrNull(json, "${pathLieral(path, attribute)}") ?? `);
  defaultValueLiteral(attribute, buffer);
}

export function attributeParserConstruct(buffer: StringBuffer, attribute: Attribute, entity: Entity, path: string[]): void {
  if (attribute instanceof StringAttribute || attribute instanceof OptionalStringAttribute) {
    handleSimpleType(buffer, "String", path, attribute);
  } else if (attribute instanceof BooleanAttribute || attribute instanceof OptionalBooleanAttribute) {
    handleSimpleType(buffer, "Boolean", path, attribute);
  } else if (attribute instanceof NumberAttribute || attribute instanceof OptionalNumberAttribute) {
    handleSimpleType(buffer, "Number", path, attribute);
  } else if (attribute instanceof CompoundAttribute) {
    buffer.linePart(`{`);
    buffer.newline();
    buffer.tabIn();
    attribute.attributes.forEach((subAttribute) => {
      buffer.tab();
      buffer.linePart(`${subAttribute.name}: `);
      const newPath = path.concat(attribute.name);
      attributeParserConstruct(buffer, subAttribute, entity, newPath);
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
