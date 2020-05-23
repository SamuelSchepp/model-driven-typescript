import { IGenerator } from "../IGenerator";
import { Root } from "../../ast/Root";
import { FileWriter } from "../tools/FileWriter";
import { writeEntityImplementation } from "./writeEntityImplementation";
import { writeEntityBaseClass } from "./writeEntityBaseClass";
import { writeIndex } from "./writeIndex";
import { writeResolvedFile } from "./writeResolvedFile";

export class Generator implements IGenerator {
  public generate(root: Root, fileWriter: FileWriter): void {
    fileWriter.reset();

    writeIndex(root, fileWriter);
    writeEntityBaseClass(fileWriter);
    writeResolvedFile(fileWriter, root);

    root.entities.forEach((entity) => {
      writeEntityImplementation(entity, fileWriter);
    });
  }
}
