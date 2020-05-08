import { SimpleTypeParser } from "../../src/parser/SimpleTypeParser";
import { SafeAny } from "safe-any";
import { SimpleType } from "../../src/ast/SimpleType";
import { expect, assert } from "chai";
import { ValueNotAllowedError } from "../../src/parser/errors/ValueNotAllowedError";

describe("SimpleTypeParser", () => {
  it("should parse number", () => {
    const simpleType = SimpleTypeParser.parse(new SafeAny("number"));
    expect(simpleType).to.equal(SimpleType.numberType);
  });
  it("should fail parsing decimal", () => {
    try {
      SimpleTypeParser.parse(new SafeAny("decimal"));
      assert.fail();
    } catch (error) {
      expect(error).to.be.instanceOf(ValueNotAllowedError);
      expect((error as ValueNotAllowedError).message).to.equal("The value decimal is not allowed in field Type. Allowed values:\n\tstring\tnumber\tboolean");
    }
  });
});
