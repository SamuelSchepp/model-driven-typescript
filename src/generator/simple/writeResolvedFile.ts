import { StringBuffer } from "../tools/StringBuffer";
import { Root } from "../../ast/Root";
import * as os from "os";
import { FileWriter } from "../tools/FileWriter";

export function writeResolvedFile(fileWriter: FileWriter, root: Root): void {
  fileWriter.write(`model.resolved.ts`, (buffer) => {
    const jsonString = JSON.stringify(root, null, 2);

    buffer.linePart(`export = `);
    jsonString.split("\n").forEach((line) => {
      buffer.line(line);
    });
  });
}
