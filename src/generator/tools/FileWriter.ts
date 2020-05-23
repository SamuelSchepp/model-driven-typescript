import { StringBuffer } from "./StringBuffer";
import path from "path";
import fs from "fs-extra";
import { TextTable } from "./TextTable";

export class FileWriter {
  constructor(
    private readonly targetDir: string,
    private readonly sourceModelPath: string,
    private readonly modelName: string,
  ) {
  }

  public reset(): void {
    if (fs.existsSync(this.targetDir)) {
      fs.removeSync(this.targetDir);
    }
  }

  public write(fileName: string, f: (buffer: StringBuffer) => void): void {
    const buffer = new StringBuffer();

    const table = new TextTable([
      ["Date", new Date().toLocaleString()],
      ["File", fileName],
      ["Model", this.modelName],
      ["Source File", this.sourceModelPath],
    ]);

    buffer.line(`/*`);
    buffer.line(` * Created by model-driven-typescript.`);
    buffer.line(` *`);
    table.toString().forEach((tableLine) => {
      buffer.line(` * ${tableLine}`);
    });
    buffer.line(` *`);
    buffer.line(` * Do not modify this file.`);
    buffer.line(` */`);
    buffer.line(``);

    f(buffer);

    if (!fs.existsSync(this.targetDir)) {
      fs.mkdirpSync(this.targetDir);
    }

    const filePath = path.join(this.targetDir, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, buffer);
  }
}
