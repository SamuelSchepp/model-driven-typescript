import { FileWriter } from "../tools/FileWriter";
import { StringBuffer } from "../tools/StringBuffer";
import { typeLiteral } from "./typeLiteral";

function handleSimpleType(buffer: StringBuffer, type: string): void {
  buffer.line(`const field = this.getField(json, path);`);
  buffer.line(`if (typeof(field) === "${type}") {`);
  buffer.tabIn();
  buffer.line(`return field;`);
  buffer.tabOut();
  buffer.line(`} else {`);
  buffer.tabIn();
  buffer.line(`return null;`);
  buffer.tabOut();
  buffer.line(`}`);
}

export function writeEntityBaseClass(fileWriter: FileWriter): void {
  fileWriter.write(`Entity.ts`, buffer => {
    buffer.line(`export abstract class Entity {`);
    buffer.tabIn();
    buffer.line(`protected meta: {`);
    buffer.tabIn();
    buffer.line(`created: Date,`);
    buffer.line(`modified: Date | null,`);
    buffer.line(`deleted: boolean,`);
    buffer.tabOut();
    buffer.line(`};`);
    buffer.line(``);

    buffer.line(`protected constructor(`);
    buffer.tabIn();
    buffer.line(`attributes: {`);
    buffer.tabIn();
    buffer.line(`meta: {`);
    buffer.tabIn();
    buffer.line(`created: Date,`);
    buffer.line(`modified: Date | null,`);
    buffer.line(`deleted: boolean,`);
    buffer.tabOut();
    buffer.line(`}`);
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
    buffer.line(`return this.meta.created;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public getMetaModified(): Date | null {`);
    buffer.tabIn();
    buffer.line(`return this.meta.modified;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public getMetaDeleted(): boolean {`);
    buffer.tabIn();
    buffer.line(`return this.meta.deleted;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`public updateModifiedDate(): void {`);
    buffer.tabIn();
    buffer.line(`this.meta.modified = new Date();`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static getField(json: any, path: string): any | null {`);
    buffer.tabIn();
    buffer.line(`const pathSegments = path.split(".");`);
    buffer.line(`let current = json;`);
    buffer.line(`for (const pathSegment of pathSegments) {`);
    buffer.tabIn();
    buffer.line(`current = current?.[pathSegment];`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(`return current;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseStringOrNull(json: any, path: string): string | null {`);
    buffer.tabIn();
    handleSimpleType(buffer, "string");
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseNumberOrNull(json: any, path: string): number | null {`);
    buffer.tabIn();
    handleSimpleType(buffer, "number");
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseBooleanOrNull(json: any, path: string): boolean | null {`);
    buffer.tabIn();
    handleSimpleType(buffer, "boolean");
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`protected static parseDateOrNull(json: any, path: string): Date | null {`);
    buffer.tabIn();
    buffer.line(`const field = this.getField(json, path);`);
    buffer.line(`if (typeof field != "string") {`);
    buffer.tabIn();
    buffer.line(`return null;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(`const date = new Date(field);`);
    buffer.line(`return date;`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);
  });
}

