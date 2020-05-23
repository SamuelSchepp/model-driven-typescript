import * as os from "os";

export class StringBuffer {
  private buffer: string;
  private currentTabIndent: number;

  private readonly linefeed: string;

  public constructor(
    private tabSize: number = 2,
  ) {
    this.buffer = "";
    this.currentTabIndent = 0;
    this.linefeed = os.EOL;
  }

  public line(s: string): void {
    this.buffer += `${this.tabs(this.currentTabIndent)}${s}${this.linefeed}`;
  }

  public tab(): void {
    this.buffer += `${this.tabs(this.currentTabIndent)}`;
  }

  public linePart(s: string): void {
    this.buffer += `${s}`;
  }

  public newline(): void {
    this.buffer += `${this.linefeed}`;
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
