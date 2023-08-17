export class Copier {
  constructor(
    private readonly src: Source,
    private readonly dest: Destination
  ) {}

  copy() {
    let char = this.src.readChar();

    while (char !== '\n') {
      this.dest.writeChar(char);
      char = this.src.readChar();
    }
  }
}

export interface Source {
  readChar(): string;
}

export interface Destination {
  writeChar(c: string): void;
}
