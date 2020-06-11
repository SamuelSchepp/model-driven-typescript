import { Entity } from "../../ast/Entity";
import { FileWriter } from "../tools/FileWriter";
import { typeLiteral } from "./typeLiteral";
import { typeLiteralOrInterface } from "./typeLiteralOrInterface";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { toUpperCamelCase } from "./toUpperCamelCase";

export function writeEntityInterface(entity: Entity, fileWriter: FileWriter): void {
  fileWriter.write(`I${entity.name}.ts`, (buffer) => {
    entity.attributes.forEach((attribute) => {
      if (attribute instanceof CompoundAttribute) {
        buffer.line(`import { I${entity.name}${toUpperCamelCase(attribute.name)} } from "./I${entity.name}${toUpperCamelCase(attribute.name)}";`);
      }
    });
    buffer.line(``);
    buffer.line(`export interface I${entity.name} {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      typeLiteralOrInterface(attribute, buffer, entity.name);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.tabOut();
    buffer.line(`}`);
  });
}
