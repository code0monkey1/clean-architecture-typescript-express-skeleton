import { Copier, Destination, Source } from './presentation/character-copier';

describe('character-copier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reads character from source', () => {
    test('reads first char from source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      const sut = new Copier(src, dest);

      sut.copy();

      expect(chars).toContainEqual('c');
    });

    it('reads exactly 2 times before encountering a newline', () => {});
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

const chars: string[] = [];

const getSource = () => {
  return {
    readChar: function (): string {
      return 'c';
    },
  };
};

const getDestination = () => {
  return {
    writeChar: function (c: string): void {
      chars.push(c);
    },
  };
};
