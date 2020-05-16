import { Root } from "../ast/Root";
import { FileWriter } from "./tools/FileWriter";

export interface IGenerator {
  generate(root: Root, fileWriter: FileWriter): void;
}
