import { Root } from "../../ast/Root";
import { FileWriter } from "../tools/FileWriter";

export function writeIndex(root: Root, fileWriter: FileWriter): void {
  fileWriter.write(`index.ts`, (buffer) => {
    buffer.line(`import { Entity } from "./Entity";`);
    root.entities.forEach((entity) => {
      buffer.line(`import { ${entity.name} } from "./${entity.name}";`);
    });
    buffer.line(``);

    buffer.line(`const entityNames: string[] = [`);
    buffer.tabIn();
    root.entities.forEach((entity) => {
      buffer.line(`"${entity.name}"`);
    });
    buffer.tabOut();
    buffer.line(`];`);
    buffer.line(``);

    buffer.line("export {");
    buffer.tabIn();
    buffer.line(`Entity,`);
    root.entities.forEach((entity) => {
      buffer.line(`${entity.name},`);
    });
    buffer.line(`entityNames,`);
    buffer.tabOut();
    buffer.line(`}`);
  });
}
