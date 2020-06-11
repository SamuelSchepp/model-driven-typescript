import { Entity } from "../../ast/Entity";
import { FileWriter } from "../tools/FileWriter";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";
import { writeSubEntity } from "./writeSubEntity";

export function writeSubEntities(entity: Entity, fileWriter: FileWriter): void {
  for (const attribute of entity.attributes) {
    if (attribute instanceof CompoundAttribute) {
      writeSubEntity(attribute, fileWriter, [entity.name]);
    }
  }
}
