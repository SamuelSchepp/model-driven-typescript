import { IGenerator } from "../IGenerator";
import { Root } from "../../ast/Root";
import { Entity } from "../../ast/Entity";
import * as fs from "fs";
import path from "path";
import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute";
import { StringType } from "../../ast/type/StringType";
import { NumberType } from "../../ast/type/NumberType";
import { BooleanType } from "../../ast/type/BooleanType";
import { EntityType } from "../../ast/type/EntityType";
import { StringValue } from "../../ast/value/StringValue";
import { NumberValue } from "../../ast/value/NumberValue";
import { BooleanValue } from "../../ast/value/BooleanValue";
import { NullValue } from "../../ast/value/NullValue";
import { typeLiteral } from "./typeLiteral";
import { defaultValueLiteral } from "./defaultValueLiteral";
import { FileWriter } from "../tools/FileWriter";
import { attributeParserConstruct } from "./attributeParserConstruct";

export class Generator implements IGenerator {
  public generate(root: Root, fileWriter: FileWriter): void {
    root.entities.forEach((entity) => {
      this.generateEntity(entity, fileWriter);
    });
  }

  private generateEntity(entity: Entity, fileWriter: FileWriter): void {
    fileWriter.write(`${entity.name}.ts`, (buffer) => {
      entity.attributes
        .reduce<EntityType[]>((entityTypes, attribute) => {
          if (attribute.type instanceof EntityType) {
            entityTypes.push(attribute.type);
          }
          return entityTypes;
        }, [])
        .forEach((entityAttribute)  => {
          buffer.line(`import { ${entityAttribute.entity} } from "./${entityAttribute.entity}";`);
        });
      buffer.line(``);
      buffer.line(`export class ${entity.name} {`);
      buffer.tabIn();
      entity.attributes.forEach((attribute) => {
        buffer.line(`private ${attribute.name}: ${typeLiteral(attribute)};`);
      });
      buffer.line(``);
      buffer.line(`constructor(`);
      buffer.tabIn();
      buffer.line(`attributes: {`);
      buffer.tabIn();
      entity.attributes.forEach((attribute) => {
        buffer.line(`${attribute.name}: ${typeLiteral(attribute)},`);
      });
      buffer.tabOut();
      buffer.line(`},`);
      buffer.tabOut();
      buffer.line(`) {`);
      buffer.tabIn();
      entity.attributes.forEach((attribute) => {
        buffer.line(`this.${attribute.name} = attributes.${attribute.name};`);
      });
      buffer.tabOut();
      buffer.line(`}`);
      buffer.line(``);
      buffer.line(`public static create(): ${entity.name} {`);
      buffer.tabIn();
      buffer.line(`return new ${entity.name}({`);
      buffer.tabIn();
      entity.attributes.forEach((attribute) => {
        buffer.line(`${attribute.name}: ${defaultValueLiteral(attribute)},`);
      });
      buffer.tabOut();
      buffer.line(`});`);
      buffer.tabOut();
      buffer.line(`}`);
      buffer.line(``);
      buffer.line(`public static createFromJson(json: any): ${entity.name} {`);
      buffer.tabIn();
      buffer.line(`if (json == null) {`);
      buffer.tabIn();
      buffer.line(`return ${entity.name}.create();`);
      buffer.tabOut();
      buffer.line(`}`);
      buffer.line(`if (typeof json !== "object") {`);
      buffer.tabIn();
      buffer.line(`return ${entity.name}.create();`);
      buffer.tabOut();
      buffer.line(`}`);
      entity.attributes.forEach((attribute) => {
        attributeParserConstruct(buffer, attribute, entity);
      });
      buffer.line(``);
      buffer.line(`return new ${entity.name}({`);
      buffer.tabIn();
      entity.attributes.forEach((attribute) => {
        buffer.line(`${attribute.name}: ${attribute.name},`);
      });
      buffer.tabOut();
      buffer.line(`});`);
      buffer.tabOut();
      buffer.line(`}`);
      buffer.tabOut();
      buffer.line(`}`);
    });
  }
}
