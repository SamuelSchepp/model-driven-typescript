export class ValidationError {
  constructor(
    public description: string,
    public values?: {[name: string]: unknown},
  ) {
  }

  get message(): string {
    if (this.values == null) {
      return this.description.trim();
    } else {
      let akku = `${this.description}`;
      for (const key of Object.keys(this.values)) {
        akku += ` ${key}=${String(this.values[key])}`;
      }
      return akku;
    }
  }
}
