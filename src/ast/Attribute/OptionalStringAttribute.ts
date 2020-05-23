import { Attribute } from "./Attribute";
import { SimpleTypeAttribute } from "./SimpleTypeAttribute";

export class OptionalStringAttribute extends SimpleTypeAttribute<string | null> {
}
