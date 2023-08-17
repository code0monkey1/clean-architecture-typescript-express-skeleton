import { Copier, Destination, Source } from './presentation/character-copier';
import {
  clearCopiedCharsArray,
  copiedChars,
  getDestination,
  getSource,
  readChar,
  readMultipleChars,
  writeChar,
} from './presentation/copier-helper';

describe('character-copier', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearCopiedCharsArray();
  });

  //[ ] No characters , ending in newline
  //[ ] Once character , ending in newline
  //[ ] Two characters , ending in newline
  //[ ] Many characters, ending in newline
  //[ ] Order of characters

  describe('reads character from source', () => {
    //[+] No characters , ending in newline
    it('does not call the destination method if there is no char is source', () => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readChar.mockReturnValueOnce('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(0);
    });

    //[+] Once character , ending in newline
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
    //[+] Two characters , ending in newline
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
    //[+] Many characters, ending in newline
    it.each([{ chars: 'abcdgc' }, { chars: 'cdedfd' }, { chars: 'efgdds' }])(
      'reads exactly $chars.length times before encountering a newline',
      ({ chars }) => {
        const src: Source = getSource();

        const dest: Destination = getDestination();

        readMultipleChars(chars);
        readChar.mockReturnValue('\n');

        const sut = new Copier(src, dest);

        sut.copy();

        expect(writeChar).toBeCalledTimes(chars.length);
        chars
          .split('')
          .forEach((c) => expect(writeChar).toHaveBeenCalledWith(c));
      }
    );

    it.each([{ chars: 'abcdgc' }, { chars: 'cdedfd' }, { chars: 'efgdds' }])(
      'has all characters copied in teh same order',
      ({ chars }) => {
        const src: Source = getSource();

        const dest: Destination = getDestination();

        readMultipleChars(chars);
        readChar.mockReturnValue('\n');

        const sut = new Copier(src, dest);

        sut.copy();

        expect(writeChar).toBeCalledTimes(chars.length);

        expect(copiedChars).toEqual(chars.split(''));
      }
    );
  });
});
