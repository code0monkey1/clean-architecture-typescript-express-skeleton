import { Copier, Destination, Source } from './presentation/character-copier';

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

  afterAll(() => {
    jest.clearAllMocks();
  });
});
