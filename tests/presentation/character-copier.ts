export class Copier {
  constructor(
    private readonly src: Source,
    private readonly dest: Destination
  ) {}

  copy() {
    let char = this.src.readChar();

    while (char !== '\n') {
      console.log('char is ', char);
      this.dest.writeChar(char);

      char = this.src.readChar();
      if (char === '\n') {
        console.log('🚫 Newline encountered');
      }
    }
  }
}

export interface Source {
  readChar(): string;
}

export interface Destination {
  writeChar(c: string): void;
}
