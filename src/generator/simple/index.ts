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
      this.generatorAttributeLiteralLine(attribute, buffer);
    });
    buffer.line(``);
    buffer.line(`constructor(`);
    buffer.tabIn();
    buffer.line(`attributes: {`);
    buffer.tabIn();
    entity.attributes.forEach((attribute) => {
      this.generatorAttributeDictionaryLiteralLine(attribute, buffer);
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
      buffer.line(`${attribute.name}: ${this.defaultValueLiteral(attribute)},`);
    });
    buffer.tabOut();
    buffer.line(`});`);
    buffer.tabOut();
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
    buffer.line(`${attribute.name}: ${this.typeLiteral(attribute)},`);
  }

  private generatorAttributeLiteralLine(attribute: Attribute, buffer: StringBuffer) {
    buffer.line(`private ${attribute.name}: ${this.typeLiteral(attribute)};`);
  }

  private typeLiteral(attribute: Attribute): string {
    let type = "";
    if (attribute.type instanceof StringType) {
      type = "string";
    } else if (attribute.type instanceof NumberType) {
      type = "number";
    } else if (attribute.type instanceof BooleanType) {
      type = "boolean";
    } else if (attribute.type instanceof EntityType) {
      type = attribute.type.entity;
    }

    if (attribute.nullable) {
      type += " | null";
    }

    return type;
  }

  private defaultValueLiteral(attribute: Attribute): string {
    if (attribute.type instanceof EntityType) {
      if (attribute.nullable) {
        return "null";
      } else {
        return `${attribute.type.entity}.create()`;
      }
    }
    if (attribute.defaultValue instanceof StringValue) {
      return `"${attribute.defaultValue.value}"`;
    }
    if (attribute.defaultValue instanceof NumberValue) {
      return `${attribute.defaultValue.value}`;
    }
    if (attribute.defaultValue instanceof BooleanValue) {
      return `${attribute.defaultValue.value ? "true" : "false"}`;
    }

    if (!attribute.nullable) {
      if (attribute.type instanceof StringType) {
        return `""`;
      }
      if (attribute.type instanceof NumberType) {
        return `0`;
      }
      if (attribute.type instanceof BooleanType) {
        return `false`;
      }
    }

    return `null`;
  }
}
