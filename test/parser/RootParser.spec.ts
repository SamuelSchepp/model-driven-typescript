import { RootParser } from "../../src/parser/RootParser";
import { SafeAny } from "safe-any";
import { expect } from "chai";
import { Root } from "../../src/ast/Root";
import { Entity } from "../../src/ast/Entity";
import { Attribute } from "../../src/ast/Attribute";
import { SimpleType } from "../../src/ast/SimpleType";
import { DefaultValue } from "../../src/ast/DefaultValue";
import fs from "fs";
import * as path from "path";

describe("Root", () => {
  it("should parse an root object", () => {
    const fileContents = fs.readFileSync(path.join("playground", "UserManagement-Model.json"), {encoding: "utf8"});
    const json = JSON.parse(fileContents);
    const object = RootParser.parse(new SafeAny(json));

    expect(object).to.deep.equal(
      new Root(
        [
          new Entity(
            "Person",
            [
              new Attribute(
                "givenName",
                SimpleType.stringType,
                false,
                null,
              ),
              new Attribute(
                "familyName",
                SimpleType.stringType,
                false,
                null,
              ),
              new Attribute(
                "enrolled",
                SimpleType.booleanType,
                false,
                new DefaultValue(true),
              ),
              new Attribute(
                "deleted",
                SimpleType.booleanType,
                false,
                null,
              ),
              new Attribute(
                "hidden",
                SimpleType.booleanType,
                false,
                null,
              ),
              new Attribute(
                "accountId",
                SimpleType.stringType,
                true,
                null,
              ),
            ],
          ),
        ],
      ),
    );
  });
});
