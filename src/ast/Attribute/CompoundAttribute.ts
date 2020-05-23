import { Attribute } from "./Attribute";

export class CompoundAttribute extends Attribute {
  constructor(
    name: string,
    public readonly attributes: Attribute[],
  ) {
    super(
      name,
      "compound",
    );
  }
}
