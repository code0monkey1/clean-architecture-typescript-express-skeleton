describe('character-copier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reads character from source', () => {
    test('reads first char from source', () => {
      const chars: string[] = [];

      const src: Source = {
        readChar: function (): string {
          return 'c';
        },
      };

      const dest: Destination = {
        writeChar: function (c: string): void {
          chars.push(c);
        },
      };

      const sut = new Copier(src, dest);

      sut.copy();

      expect(chars).toContainEqual('c');
    });
  });
});

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
