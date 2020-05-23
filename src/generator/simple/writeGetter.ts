import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { typeLiteral } from "./typeLiteral";
import { pathLieral } from "./pathLieral";
import { toUpperCamelCasePathLiteral } from "./toUpperCamelCasePathLiteral";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";

function handleSimpleType(buffer: StringBuffer, attribute: Attribute, path: string[]): void {
  buffer.tab();
  buffer.linePart(`public get${toUpperCamelCasePathLiteral(path, attribute)}(): `);
  typeLiteral(attribute, buffer);
  buffer.linePart(` {`);
  buffer.newline();
  buffer.tabIn();
  buffer.line(`return this.${pathLieral(path, attribute)};`);
  buffer.tabOut();
  buffer.line(`}`);
  buffer.line(``);
}

export function writeGetter(buffer: StringBuffer, attribute: Attribute, path: string[]): void {
  if (attribute instanceof StringAttribute || attribute instanceof OptionalStringAttribute) {
    handleSimpleType(buffer, attribute, path);
  } else if (attribute instanceof BooleanAttribute || attribute instanceof OptionalBooleanAttribute) {
    handleSimpleType(buffer, attribute, path);
  } else if (attribute instanceof NumberAttribute || attribute instanceof OptionalNumberAttribute) {
    handleSimpleType(buffer, attribute, path);
  } else if (attribute instanceof CompoundAttribute) {
    attribute.attributes.forEach((subAttributes) => {
      writeGetter(buffer, subAttributes, path.concat(attribute.name));
    });
  } else {
    throw new NonExhaustiveError();
  }
}
