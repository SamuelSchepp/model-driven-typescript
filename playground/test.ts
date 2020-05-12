import fs from "fs";
import path from "path";
import { RootParser } from "../src/parser/RootParser";
import { SafeAny } from "safe-any";
import { Generator } from "../src/generator/simple";

const fileContents = fs.readFileSync(path.join(__dirname, "UserManagement-Model.json"), { encoding: "utf8" });
const json = JSON.parse(fileContents);
const object = RootParser.parse(new SafeAny(json));

new Generator().generate(object, path.join(__dirname, "src-gen"));
