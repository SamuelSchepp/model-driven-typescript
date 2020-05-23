export abstract class Attribute {
  protected constructor(
    public readonly name: string,
    public readonly type: string,
  ) {
  }
}
