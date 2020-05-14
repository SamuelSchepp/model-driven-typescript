import { RootParser } from "../../src/parser/RootParser";
import { SafeAny } from "safe-any";
import { expect } from "chai";
import { Root } from "../../src/ast/Root";
import { Entity } from "../../src/ast/Entity";
import { Attribute } from "../../src/ast/Attribute";
import fs from "fs";
import * as path from "path";
import { NullValue } from "../../src/ast/value/NullValue";
import { BooleanValue } from "../../src/ast/value/BooleanValue";
import { StringType } from "../../src/ast/type/StringType";
import { BooleanType } from "../../src/ast/type/BooleanType";
import { EntityType } from "../../src/ast/type/EntityType";
import { RootValidator } from "../../src/validator/RootValidator";

describe("Root", () => {
  it("should parse an root object", () => {
    const fileContents = fs.readFileSync(path.join("playground", "UserManagement-Model.json"), {encoding: "utf8"});
    const json = JSON.parse(fileContents);
    const object = RootParser.parse(new SafeAny(json));
  });
});
