import { Attribute } from "../../ast/Attribute/Attribute";
import { FileWriter } from "../tools/FileWriter";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { toUpperCamelCase } from "./toUpperCamelCase";
import { writeSubEntities } from "./writeSubEntities";

export function writeSubEntity(attribute: CompoundAttribute, fileWriter: FileWriter, path: string[]): void {
  const className = `${path.map(toUpperCamelCase).join()}${toUpperCamelCase(attribute.name)}`;
  fileWriter.write(`${className}.ts`, (buffer) => {
    buffer.line(`export class ${className} {`);
    buffer.tabIn();
    buffer.line(`public static createNew(): ${className} {`);
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public static fromJson(json: any): ${className} {`);
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public toJson(): any {`);
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);
  });

  for (const subAttribute of attribute.attributes) {
    if (subAttribute instanceof CompoundAttribute) {
      writeSubEntity(subAttribute, fileWriter, path.concat(attribute.name));
    }
  }
}
