import { StringBuffer } from "./StringBuffer";
import path from "path";
import fs from "fs-extra";

export class FileWriter {
  constructor(
    private readonly targetDir: string,
  ) {
  }

  public write(fileName: string, f: (buffer: StringBuffer) => void): void {
    const buffer = new StringBuffer();

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
