import { Root } from "../ast/Root";

export interface IGenerator {
  generate(root: Root, targetDir: string): void;
}
