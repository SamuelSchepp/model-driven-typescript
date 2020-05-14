import { Root } from "../ast/Root";
import { EntityValidator } from "./EntityValidator";

export class RootValidator {
  public static validate(root: Root): void {
    root.entities.forEach((entity) => {
      EntityValidator.validate(entity, root);
    });
  }
}
