import { IGenerator } from "../IGenerator";
import { Root } from "../../ast/Root";
import { FileWriter } from "../tools/FileWriter";
import { writeEntityImplementation } from "./writeEntityImplementation";
import { writeEntityBaseClass } from "./writeEntityBaseClass";
import { writeIndex } from "./writeIndex";
import { writeResolvedFile } from "./writeResolvedFile";
import { writeSubEntities } from "./writeSubEntities";
import { writeEntityMetaClass } from "./writeEntityMetaClass";
import { writeEntityInterface } from "./writeEntityInterface";

export class Generator implements IGenerator {
  public generate(root: Root, fileWriter: FileWriter): void {
    fileWriter.reset();

    writeIndex(root, fileWriter);
    writeEntityBaseClass(fileWriter);
    writeResolvedFile(fileWriter, root);
    writeEntityMetaClass(fileWriter);

    root.entities.forEach((entity) => {
      writeEntityImplementation(entity, fileWriter);
      writeEntityInterface(entity, fileWriter);
      writeSubEntities(entity, fileWriter);
    });
  }
}
