export class TextTable {
  constructor(
    public readonly data: string[][],
  ) {
  }

  public toString(): string[] {
    const lines: string[] = [];

    let topLine: string = "┌─";
    this.data[0].forEach((column, columnIndex) => {
      topLine += "─".repeat(this.columnWidth(columnIndex));
      if(columnIndex == this.data[0].length - 1) {
        topLine += "─┐";
      } else {
        topLine += "─┬─";
      }
    });
    lines.push(topLine);

    for (let row = 0; row < this.data.length; row++) {
      let rowBuffer: string = "│";
      for (let column = 0; column < this.data[row].length; column++) {
        rowBuffer += " ";
        if (column === 0) {
          rowBuffer += this.spacPadding(row, column);
        }
        rowBuffer += this.data[row][column];
        if (column > 0) {
          rowBuffer += this.spacPadding(row, column);
        }
        rowBuffer += " │";
      }
      lines.push(rowBuffer);
    }

    let bottomLine: string = "└─";
    this.data[0].forEach((column, columnIndex) => {
      bottomLine += "─".repeat(this.columnWidth(columnIndex));
      if(columnIndex == this.data[0].length - 1) {
        bottomLine += "─┘";
      } else {
        bottomLine += "─┴─";
      }
    });
    lines.push(bottomLine);

    return lines;
  }

  private columnWidth(index: number): number {
    let maxLength = 0;
    for(let row = 0; row < this.data.length; row++) {
      maxLength = Math.max(maxLength, this.data[row][index].length);
    }
    return maxLength;
  }

  private spacPadding(row: number, column: number): string {
    const content: string = this.data[row][column];
    const targetLength: number = this.columnWidth(column);
    const paddingWidth: number = targetLength - content.length;

    return " ".repeat(paddingWidth);
  }
}
