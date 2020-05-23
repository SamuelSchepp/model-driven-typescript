import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";
import { typeLiteral } from "./typeLiteral";
import { pathLieral } from "./pathLieral";
import { toUpperCamelCasePathLiteral } from "./toUpperCamelCasePathLiteral";
import { StringAttribute } from "../../ast/Attribute/StringAttribute";
import { BooleanAttribute } from "../../ast/Attribute/BooleanAttribute";
import { NumberAttribute } from "../../ast/Attribute/NumberAttribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { OptionalStringAttribute } from "../../ast/Attribute/OptionalStringAttribute";
import { OptionalBooleanAttribute } from "../../ast/Attribute/OptionalBooleanAttribute";
import { OptionalNumberAttribute } from "../../ast/Attribute/OptionalNumberAttribute";

function handleSimpleType(buffer: StringBuffer, attribute: Attribute, path: string[]): void {
  buffer.tab();
  buffer.linePart(`public set${toUpperCamelCasePathLiteral(path, attribute)}(newValue: `);
  typeLiteral(attribute, buffer);
  buffer.linePart(`): void {`);
  buffer.newline();
  buffer.tabIn();
  buffer.line(`this.${pathLieral(path, attribute)} = newValue;`);
  buffer.line(`super.updateModifiedDate();`);
  buffer.tabOut();
  buffer.line(`}`);
  buffer.line(``);
}

export function writeSetter(buffer: StringBuffer, attribute: Attribute, path: string[]): void {
  if (attribute instanceof StringAttribute || attribute instanceof OptionalStringAttribute) {
    handleSimpleType(buffer, attribute, path);
  } else if (attribute instanceof BooleanAttribute || attribute instanceof OptionalBooleanAttribute) {
    handleSimpleType(buffer, attribute, path);
  } else if (attribute instanceof NumberAttribute || attribute instanceof OptionalNumberAttribute) {
    handleSimpleType(buffer, attribute, path);
  } else if (attribute instanceof CompoundAttribute) {
    attribute.attributes.forEach((subAttributes) => {
      writeSetter(buffer, subAttributes, path.concat(attribute.name));
    });
  } else {
    throw new NonExhaustiveError();
  }
}
