import { Entity } from "../../ast/Entity";
import { StringBuffer } from "../tools/StringBuffer";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { toUpperCamelCase } from "./toUpperCamelCase";

export function writeImportsForEntity(entity: Entity, buffer: StringBuffer): void {
  entity.attributes
    .filter((attribute) => {
      return (attribute instanceof CompoundAttribute);
    })
    .forEach((attribute) => {
      const className = `${entity.name}${toUpperCamelCase(attribute.name)}`;
      buffer.line(`import { ${className} } from "./${className}";`);
    });
}
