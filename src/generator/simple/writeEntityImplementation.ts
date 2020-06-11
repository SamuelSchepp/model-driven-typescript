import { Entity } from "../../ast/Entity";
import { FileWriter } from "../tools/FileWriter";
import { typeLiteral } from "./typeLiteral";
import { defaultValueLiteral } from "./defaultValueLiteral";
import { attributeParserConstruct } from "./attributeParserConstruct";
import { writeGetter } from "./writeGetter";
import { writeSetter } from "./writeSetter";
import { mergeConstruct } from "./mergeConstruct";
import { writeClassAttributes } from "./writeClassAttributes";
import { writeImportsForEntity } from "./writeImportsForEntity";
import { CompoundAttribute } from "../../ast/Attribute/CompoundAttribute";

export function writeEntityImplementation(entity: Entity, fileWriter: FileWriter): void {
  fileWriter.write(`${entity.name}.ts`,(buffer) => {
    buffer.line(`import { Entity } from "./Entity";`);
    buffer.line(`import { EntityMeta } from "./EntityMeta";`);
    buffer.line(`import { I${entity.name} } from "./I${entity.name}";`);
    writeImportsForEntity(entity, buffer);
    buffer.line(``);
    buffer.line(`export class ${entity.name} extends Entity {`);
    buffer.tabIn();
    writeClassAttributes(buffer, entity.attributes, entity.name);
    buffer.line(``);
    buffer.line(`private constructor(`);
    buffer.tabIn();
    buffer.line(`attributes: {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      typeLiteral(attribute, buffer, entity.name);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.line(`meta: EntityMeta,`);
    buffer.tabOut();
    buffer.line(`}) {`);
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
      defaultValueLiteral(attribute, buffer, entity.name);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.line(`meta: EntityMeta.createNew(),`);
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
      typeLiteral(attribute, buffer, entity.name);
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
    buffer.line(`meta: EntityMeta.createNew()`);
    buffer.tabOut();
    buffer.line(`});`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`public static fromJson(json: I${entity.name} | any): ${entity.name} {`);
    buffer.tabIn();
    buffer.line(`return new ${entity.name}({`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      buffer.tab();
      buffer.linePart(`${attribute.name}: `);
      attributeParserConstruct(buffer, attribute, entity.name);
      buffer.linePart(`,`);
      buffer.newline();
    });
    buffer.line(`meta: EntityMeta.fromJson(json?.meta),`);
    buffer.tabOut();
    buffer.line(`});`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    buffer.line(`public mergeWithJson(json: any): string[] {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      mergeConstruct(attribute, buffer);
    });
    buffer.tabOut();
    buffer.line(`}`);
    buffer.line(``);

    entity.attributes.forEach((attribute) => {
      writeGetter(buffer, attribute, entity.name);
    });
    entity.attributes.forEach((attribute) => {
      writeSetter(buffer, attribute, entity.name);
    });
    buffer.line(`public toJson(): I${entity.name} {`);
    buffer.tabIn();
    buffer.line(`return {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      if (attribute instanceof CompoundAttribute) {
        buffer.line(`${attribute.name}: this.${attribute.name}.toJson(),`);
      } else {
        buffer.line(`${attribute.name}: this.${attribute.name},`);
      }
    });
    buffer.line(`meta: this.meta.toJson(),`);
    buffer.tabOut();
    buffer.line(`};`);
    buffer.tabOut();
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);
  });
}
