import { FileWriter } from "../tools/FileWriter";
import { StringBuffer } from "../tools/StringBuffer";
import { typeLiteral } from "./typeLiteral";

function handleSimpleType(buffer: StringBuffer, type: string): void {
  buffer.line(`if (typeof(json) === "${type}") {`);
  buffer.tabIn();
  buffer.line(`return json;`);
  buffer.tabOut();
  buffer.line(`} else {`);
  buffer.tabIn();
  buffer.line(`return null;`);
  buffer.tabOut();
  buffer.line(`}`);
}

export function writeEntityBaseClass(fileWriter: FileWriter): void {
  fileWriter.write(`Entity.ts`, buffer => {
    buffer.line(`import { EntityMeta } from "./EntityMeta";`);
    buffer.line(``);
    buffer.line(`export abstract class Entity {`);
    buffer.tabIn();
    buffer.line(`protected meta: EntityMeta;`);
    buffer.line(``);

    buffer.line(`protected constructor(`);
    buffer.tabIn();
    buffer.line(`attributes: {`);
    buffer.tabIn();
    buffer.line(`meta: EntityMeta`);
    buffer.tabOut();
    buffer.line(`},`);
    buffer.tabOut();
    buffer.line(`) {`);
    buffer.tabIn();
    buffer.line(`this.meta = attributes.meta;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`public getMetaCreated(): Date {`);
    buffer.tabIn();
    buffer.line(`return this.meta.getCreated();`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public getMetaModified(): Date | null {`);
    buffer.tabIn();
    buffer.line(`return this.meta.getModified();`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public getMetaDeleted(): boolean {`);
    buffer.tabIn();
    buffer.line(`return this.meta.getDeleted();`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected updateModifiedDate(): void {`);
    buffer.tabIn();
    buffer.line(`this.meta.setModified(new Date());`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseStringOrNull(json: any): string | null {`);
    buffer.tabIn();
    handleSimpleType(buffer, "string");
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseNumberOrNull(json: any): number | null {`);
    buffer.tabIn();
    handleSimpleType(buffer, "number");
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseBooleanOrNull(json: any): boolean | null {`);
    buffer.tabIn();
    handleSimpleType(buffer, "boolean");
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseDateOrNull(json: any): Date | null {`);
    buffer.tabIn();
    buffer.line(`if (typeof json === "string") {`);
    buffer.tabIn();
    buffer.line(`const date = new Date(json);`);
    buffer.line(`return date;`);
    buffer.tabOut();
    buffer.line(`} else {`);
    buffer.tabIn();
    buffer.line(`return null;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);
  });
}

