import { Copier, Destination, Source } from './presentation/character-copier';
import {
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

      readChar.mockReturnValue('\n');
      readChar.mockReturnValueOnce('c');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toHaveBeenCalledWith('c');
    });

    it('reads exactly 2 times before encountering a newline', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readChar.mockReturnValueOnce('c');
      readChar.mockReturnValueOnce('d');
      readChar.mockReturnValue('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(2);
    });
  });
});
