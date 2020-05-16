import fs from "fs";
import path from "path";
import { RootParser } from "../src/parser/RootParser";
import { SafeAny } from "safe-any";
import { Generator } from "../src/generator/simple";
import { RootValidator } from "../src/validator/RootValidator";
import { FileWriter } from "../src/generator/tools/FileWriter";

const fileContents = fs.readFileSync(path.join(__dirname, "UserManagement-Model.json"), { encoding: "utf8" });
const json = JSON.parse(fileContents);
const object = RootParser.parse(new SafeAny(json));

RootValidator.validate(object);

new Generator().generate(object, new FileWriter(path.join(__dirname, "src-gen")));

