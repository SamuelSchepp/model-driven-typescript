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
import { ObjectType } from "../../ast/type/ObjectType";

export class Generator implements IGenerator {
  public generate(root: Root, targetDir: string): void {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    root.entities.forEach((entity) => {
      this.generateEntity(entity, targetDir);
    });
  }

  private generateEntity(entity: Entity, targetDir: string): void {
    const buffer = new StringBuffer();
    buffer.line(`export class ${entity.name} {`);
    buffer.tabIn();
    buffer.line(`constructor(`);
    buffer.tabIn();
    buffer.line(`params: {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      this.generatorAttributeDictionaryLiteralLine(attribute, buffer);
    });
    buffer.tabOut();
    buffer.line(`},`);
    buffer.tabOut();
    buffer.line(`) {`);
    buffer.line(`}`);
    buffer.tabOut();
    buffer.line(`}`);

    const filePath = path.join(targetDir, `${entity.name}.ts`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(path.join(targetDir, `${entity.name}.ts`), buffer);
  }

  private generatorAttributeDictionaryLiteralLine(attribute: Attribute, buffer: StringBuffer) {
    if (attribute.type instanceof StringType) {
      buffer.line(`${attribute.name}: string,`);
    } else if (attribute.type instanceof NumberType) {
      buffer.line(`${attribute.name}: number,`);
    } else if (attribute.type instanceof BooleanType) {
      buffer.line(`${attribute.name}: boolean,`);
    } else if (attribute.type instanceof ObjectType) {
      buffer.line(`${attribute.name}: {`);
      buffer.tabIn();
      attribute.attributes.forEach((subAttribute) => {
        this.generatorAttributeDictionaryLiteralLine(subAttribute, buffer);
      });
      buffer.tabOut();
      buffer.line(`},`);
    }
  }
}
