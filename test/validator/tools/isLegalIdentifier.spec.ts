import { isLegalIdentifier } from "../../../src/validator/tools/islegalIdentifier";
import { expect } from "chai";

describe("isLegalIdentifier", () => {
  it("legal: helloWorld", () => {
    expect(isLegalIdentifier("helloWorld")).to.equal(true);
  });
  it("legal: Person", () => {
    expect(isLegalIdentifier("Person")).to.equal(true);
  });
  it("legal: Person5", () => {
    expect(isLegalIdentifier("Person5")).to.equal(true);
  });
  it("legal: Person_5", () => {
    expect(isLegalIdentifier("Person_5")).to.equal(true);
  });
  it("illegal: Person 5", () => {
    expect(isLegalIdentifier("Person 5")).to.equal(false);
  });
  it("illegal: 3Person", () => {
    expect(isLegalIdentifier("3Person")).to.equal(false);
  });
  it("illegal: class", () => {
    expect(isLegalIdentifier("class")).to.equal(false);
  });
});
