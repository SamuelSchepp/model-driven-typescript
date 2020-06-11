import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute/Attribute";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { typeLiteral } from "./typeLiteral";
import { Entity } from "../../ast/Entity";

export function writeClassAttributes(buffer: StringBuffer, attributes: Attribute[], entityName: string): void {
  attributes.forEach((attribute) => {
    buffer.tab();
    buffer.linePart(`private `);
    if (attribute instanceof CompoundAttribute) {
      buffer.linePart(`readonly `);
    }
    buffer.linePart(`${attribute.name}: `);
    typeLiteral(attribute, buffer, entityName);
    buffer.linePart(`;`);
    buffer.newline();
  });
}
