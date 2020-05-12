import { SafeAny } from "safe-any";
import { Entity } from "../ast/Entity";
import { TypeParser } from "./TypeParser";
import { AttributeParser } from "./AttributeParser";

export class EntityParser {
  public static parse(json: SafeAny): Entity {
    return new Entity(
      json.get("name").stringValue(),
      json.get("attributes").arrayValue().map((json) => {
        return AttributeParser.parse(json);
      }),
    );
  }
}
