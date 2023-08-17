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

  //[ ] No characters , ending in newline
  //[ ] Once character , ending in newline
  //[ ] Two characters , ending in newline
  //[ ] Many characters, ending in newline
  //[ ] Order of characters

  describe('reads character from source', () => {
    it('does not call the destination method if there is no char is source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readChar.mockReturnValueOnce('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(0);
    });

    it.each([{ char: 'a' }, { char: 'b' }, { char: 'c' }, { char: 'd' }])(
      'reads first char from source',
      ({ char }) => {
        const src: Source = getSource();

        const dest: Destination = getDestination();

        readChar.mockReturnValue('\n');

        readChar.mockReturnValueOnce(char);
        readChar.mockReturnValue('\n');

        const sut = new Copier(src, dest);

        sut.copy();

        expect(writeChar).toHaveBeenCalledWith(char);
      }
    );

    it.each([{ chars: 'ab' }, { chars: 'cd' }, { chars: 'ef' }])(
      'reads exactly 2 times before encountering a newline',
      ({ chars }) => {
        const src: Source = getSource();

        const dest: Destination = getDestination();

        readChar.mockReturnValueOnce(chars[0]);
        readChar.mockReturnValueOnce(chars[1]);
        readChar.mockReturnValue('\n');

        const sut = new Copier(src, dest);

        sut.copy();

        expect(writeChar).toBeCalledTimes(2);
      }
    );

    it.each([{ chars: 'abcdgc' }, { chars: 'cdedfd' }, { chars: 'efgdds' }])(
      'reads exactly 2 times before encountering a newline',
      ({ chars }) => {
        const src: Source = getSource();

        const dest: Destination = getDestination();

        readChar.mockReturnValueOnce(chars[0]);
        readChar.mockReturnValueOnce(chars[1]);
        readChar.mockReturnValue('\n');

        const sut = new Copier(src, dest);

        sut.copy();

        expect(writeChar).toBeCalledTimes(2);
      }
    );
  });
});
