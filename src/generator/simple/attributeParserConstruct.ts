import { StringBuffer } from "../tools/StringBuffer";
import { Attribute } from "../../ast/Attribute";
import { Entity } from "../../ast/Entity";
import { typeLiteral } from "./typeLiteral";
import { defaultValueLiteral } from "./defaultValueLiteral";
import { StringType } from "../../ast/type/StringType";
import { BooleanType } from "../../ast/type/BooleanType";
import { NumberType } from "../../ast/type/NumberType";
import { EntityType } from "../../ast/type/EntityType";
import { NonExhaustiveError } from "../errors/NonExhaustiveError";

export function attributeParserConstruct(buffer: StringBuffer, attribute: Attribute, entity: Entity) {
  buffer.line(``);
  buffer.line(`// ${attribute.name}`);
  buffer.line(`let ${attribute.name}: ${typeLiteral(attribute)};`);
  buffer.line(`if ("${attribute.name}" in json) {`);
  buffer.tabIn();

  const handleSimpleType = (typeLiteral: string) => {
    buffer.line(`if (typeof json["${attribute.name}"] === "${typeLiteral}") {`);
    buffer.tabIn();
    buffer.line(`${attribute.name} = json["${attribute.name}"];`);
    buffer.tabOut();
    if (attribute.nullable) {
      buffer.line(`} else if (json["${attribute.name}"] == null) {`);
      buffer.tabIn();
      buffer.line(`${attribute.name} = null;`);
      buffer.tabOut();
    }
    buffer.line(`} else {`);buffer.tabIn();
    buffer.line(`${attribute.name} = ${defaultValueLiteral(attribute)};`);
    buffer.tabOut();
    buffer.line(`}`);
  };

  if (attribute.type instanceof StringType) {
    handleSimpleType("string");
  } else if (attribute.type instanceof BooleanType) {
    handleSimpleType("boolean");
  } else if (attribute.type instanceof NumberType) {
    handleSimpleType("number");
  } else if (attribute.type instanceof EntityType) {
    buffer.line(`${attribute.name} = ${attribute.type.entity}.createFromJson(json["${attribute.name}"]);`);
  } else {
    throw new NonExhaustiveError();
  }

  buffer.tabOut();
  buffer.line(`} else {`);buffer.tabIn();
  buffer.line(`${attribute.name} = ${defaultValueLiteral(attribute)};`);
  buffer.tabOut();
  buffer.line(`}`);
}
