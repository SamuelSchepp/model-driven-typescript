import { Root } from "../ast/Root";
import { EntityParser } from "./EntityParser";
import { Any } from "typed-any-access";

export class RootParser {
  public static parse(json: Any): Root {
    return new Root(
      json.get("name").stringValue(),
      json.get("entities").arrayValue().map((entity: Any) => {
        return EntityParser.parse(entity);
      }),
    );
  }
}
