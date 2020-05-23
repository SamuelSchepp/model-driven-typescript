import { Attribute } from "../../ast/Attribute/Attribute";

export function pathLieral(path: string[], attribute: Attribute): string {
  if (path.length === 0) {
    return attribute.name;
  } else {
    return `${path.join(".")}.${attribute.name}`;
  }
}
