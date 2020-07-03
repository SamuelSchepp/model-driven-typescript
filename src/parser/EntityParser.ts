import { Entity } from "../ast/Entity";
import { AttributeParser } from "./AttributeParser";
import { Any } from "typed-any-access";

export class EntityParser {
  public static parse(json: Any): Entity {
    return new Entity(
      json.get("name").stringValue(),
      json.get("attributes").arrayValue().map((json) => {
        return AttributeParser.parse(json);
      }),
    );
  }
}
