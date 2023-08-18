export class Copier {
  constructor(
    private readonly src: Source,
    private readonly dest: Destination
  ) {}

  /* The `copy()` method in the `Copier` class is responsible for copying characters from the source
  (`src`) to the destination (`dest`). */
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
