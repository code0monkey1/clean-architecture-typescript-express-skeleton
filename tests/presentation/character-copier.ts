export class Copier {
  constructor(
    private readonly src: Source,
    private readonly dest: Destination
  ) {}

  copy() {
    const char = this.src.readChar();
    this.dest.writeChar(char);
  }
}

export interface Source {
  readChar(): string;
}

export interface Destination {
  writeChar(c: string): void;
}
