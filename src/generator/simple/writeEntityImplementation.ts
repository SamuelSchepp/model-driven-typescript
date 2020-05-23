import { Entity } from "../../ast/Entity";
import { FileWriter } from "../tools/FileWriter";
import { typeLiteral } from "./typeLiteral";
import { defaultValueLiteral } from "./defaultValueLiteral";
import { attributeParserConstruct } from "./attributeParserConstruct";
import { writeGetter } from "./writeGetter";
import { writeSetter } from "./writeSetter";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";

export function writeEntityImplementation(entity: Entity, fileWriter: FileWriter): void {
  fileWriter.write(`${entity.name}.ts`,(buffer) => {
    buffer.line(`import { Entity } from "./Entity";`);
    buffer.line(``);
    buffer.line(`export class ${entity.name} extends Entity {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`private `);
      if (attribute instanceof CompoundAttribute) {
        buffer.linePart(`readonly `);
      }
      buffer.linePart(`${attribute.name}: `);
      typeLiteral(attribute, buffer);
      buffer.linePart(`;`);
      buffer.newline();
    });
    buffer.line(``);
    buffer.line(`private constructor(`);
    buffer.tabIn();
    buffer.line(`attributes: {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      typeLiteral(attribute, buffer);
      buffer.linePart(`,`);
      buffer.newline();
    });
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
    buffer.line(`super({`);
    buffer.tabIn();
    buffer.line(`meta: attributes.meta,`);
    buffer.tabOut();
    buffer.line(`});`);
    buffer.line(``);
    entity.attributes.forEach((attribute) => {
      buffer.line(`this.${attribute.name} = attributes.${attribute.name};`);
    });
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
    buffer.line(`public static createNew(): ${entity.name} {`);
    buffer.tabIn();
    buffer.line(`return new ${entity.name}({`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      defaultValueLiteral(attribute, buffer);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.line(`meta: {`);
    buffer.tabIn();
    buffer.line(`created: new Date(),`);
    buffer.line(`modified: null,`);
    buffer.line(`deleted: false,`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`});`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`public static createNewWithValues(`);
    buffer.tabIn();
    buffer.line(`attributes: {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      typeLiteral(attribute, buffer);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.tabOut();
    buffer.line(`},`);
    buffer.tabOut();
    buffer.line(`): ${entity.name} {`);
    buffer.tabIn();
    buffer.line(`return new ${entity.name}({`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.line(`${attribute.name}: attributes.${attribute.name},`);
    });
    buffer.line(`meta: {`);
    buffer.tabIn();
    buffer.line(`created: new Date(),`);
    buffer.line(`modified: null,`);
    buffer.line(`deleted: false,`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`});`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`public static fromJson(json: any): ${entity.name} {`);
    buffer.tabIn();
    buffer.line(`return new ${entity.name}({`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      attributeParserConstruct(buffer, attribute, entity, []);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.line(`meta: {`);
    buffer.tabIn();
    buffer.line(`created: this.parseDateOrNull(json, "meta.created") ?? new Date(),`);
    buffer.line(`modified: this.parseDateOrNull(json, "meta.modified") ?? null,`);
    buffer.line(`deleted: this.parseBooleanOrNull(json, "meta.deleted") ?? false,`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`});`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);
    entity.attributes.forEach((attribute) => {
      writeGetter(buffer, attribute, []);
    });
    entity.attributes.forEach((attribute) => {
      writeSetter(buffer, attribute, []);
    });
    buffer.line(`public toJson(): any {`);
    buffer.tabIn();
    buffer.line(`return {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.line(`${attribute.name}: this.${attribute.name},`);
    });
    buffer.line(`meta: this.meta,`);
    buffer.tabOut();
    buffer.line(`};`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);
  });
}
