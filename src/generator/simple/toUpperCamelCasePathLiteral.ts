import { Attribute } from "../../ast/Attribute/Attribute";
import { toUpperCamelCase } from "./toUpperCamelCase";

export function toUpperCamelCasePathLiteral(path: string[], attribute: Attribute): string {
  return `${path.map(toUpperCamelCase).join()}${toUpperCamelCase(attribute.name)}`;
}
