export class StringBuffer {
  private buffer: string;
  private currentTabIndent: number;

  public constructor(
    private tabSize: number = 2,
    private linefeed: string = "\r\n",
  ) {
    this.buffer = "";
    this.currentTabIndent = 0;
  }

  public line(s: string): void {
    this.buffer += `${this.tabs(this.currentTabIndent)}${s}${this.linefeed}`;
  }

  public tabIn(): void {
    this.currentTabIndent += 1;
  }

  public tabOut(): void {
    this.currentTabIndent -= 1;
  }

  public toString(): string {
    return this.buffer;
  }

  private tabs(n: number): string {
    let buffer = "";
    for (let i = 0; i < n * this.tabSize; i++) {
      buffer += " ";
    }
    return buffer;
  }
}
