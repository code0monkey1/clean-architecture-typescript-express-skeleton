import { Copier, Destination, Source } from './presentation/character-copier';
import {
  chars,
  getDestination,
  getSource,
  readChar,
  writeChar,
} from './presentation/copier-helper';

describe('character-copier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('reads character from source', () => {
    it('does not call the destination method if there is no char is source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readChar.mockReturnValueOnce('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(0);
    });
    it('reads first char from source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();
      readChar.mockReturnValue('c');
      readChar.mockReturnValueOnce('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(chars).toContainEqual('c');
    });

    it('reads exactly 2 times before encountering a newline', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readChar.mockReturnValue('c');
      readChar.mockReturnValue('d');
      readChar.mockReturnValueOnce('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(2);
    });
  });
});
