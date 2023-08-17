import { Copier, Destination, Source } from './presentation/character-copier';

describe('character-copier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reads character from source', () => {
    it('does not call the destination method if there is no char is source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readChar.mockReturnValue('');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(0);
    });
    it('reads first char from source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();
      readChar.mockReturnValue('c');

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

const readChar = jest.fn();
const writeChar = jest.fn((c: string) => {
  chars.push(c);
});

const getSource = () => {
  return {
    readChar,
  };
};

const getDestination = () => {
  return {
    writeChar,
  };
};
