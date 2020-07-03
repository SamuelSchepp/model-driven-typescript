import { RootParser } from "../../src/parser/RootParser";
import { Root } from "../../src/ast/Root";
import fs from "fs";
import * as path from "path";
import { Any } from "typed-any-access";

describe("Root", () => {
  it("should parse an root object", () => {
    const fileContents = fs.readFileSync(path.join("playground", "UserManagement-Model.json"), {encoding: "utf8"});
    const json = JSON.parse(fileContents);
    const object = RootParser.parse(new Any(json));
  });
});
