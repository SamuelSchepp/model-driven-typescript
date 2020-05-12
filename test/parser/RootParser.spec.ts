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
import { ObjectType } from "../../src/ast/type/ObjectType";
import { RootValidator } from "../../src/validator/RootValidator";

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
                "name",
                new ObjectType(),
                false,
                new NullValue(),
                [
                  new Attribute(
                    "given",
                    new StringType(),
                    false,
                    new NullValue(),
                    [],
                  ),
                  new Attribute(
                    "family",
                    new StringType(),
                    false,
                    new NullValue(),
                    [],
                  ),
                ],
              ),
              new Attribute(
                "enrolled",
                new BooleanType(),
                false,
                new BooleanValue(true),
                [],
              ),
              new Attribute(
                "meta",
                new ObjectType(),
                false,
                new NullValue(),
                [
                  new Attribute(
                    "deleted",
                    new BooleanType(),
                    false,
                    new NullValue(),
                    [],
                  ),
                  new Attribute(
                    "hidden",
                    new BooleanType(),
                    false,
                    new NullValue(),
                    [],
                  ),
                ],
              ),
              new Attribute(
                "accountId",
                new StringType(),
                true,
                new NullValue(),
                [],
              ),
            ],
          ),
        ],
      ),
    );

    RootValidator.validate(object);
  });
});
