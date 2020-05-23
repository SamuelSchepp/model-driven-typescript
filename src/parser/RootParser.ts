import { Root } from "../ast/Root";
import { SafeAny } from "safe-any";
import { EntityParser } from "./EntityParser";

export class RootParser {
  public static parse(json: SafeAny): Root {
    return new Root(
      json.get("name").stringValue(),
      json.get("entities").arrayValue().map((entity: SafeAny) => {
        return EntityParser.parse(entity);
      }),
    );
  }
}
