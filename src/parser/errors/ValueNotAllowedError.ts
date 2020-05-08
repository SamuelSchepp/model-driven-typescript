export class ValueNotAllowedError {
  constructor(
    public readonly field: string,
    public readonly value: unknown,
    public readonly allowedValues?: unknown[],
  ) {
  }

  get message(): string {
    let akku = `The value ${String(this.value)} is not allowed in field ${this.field}.`;
    if (this.allowedValues != null && this.allowedValues.length > 0) {
      akku += ` Allowed values:\n`;
      this.allowedValues
        .map((allowedValue) => {
          return String(allowedValue);
        })
        .forEach((allowedValue) => {
          akku += `\t${allowedValue}`;
        });
    }
    return akku;
  }
}
