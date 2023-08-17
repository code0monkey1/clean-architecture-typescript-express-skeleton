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
  //[ ] Characters after newline should not be written

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

        //multiple characters written (order does not matter)
        chars
          .split('')
          .forEach((c) => expect(writeChar).toHaveBeenCalledWith(c));

        // confirm last called character
        expect(writeChar).toHaveBeenLastCalledWith(chars[chars.length - 1]);
      }
    );
    //[+] Order of characters
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
  //[+] Characters after newline should not be written
  it.each([
    { chars: '1234\n567', before: '1234', after: '567' },
    { chars: 'cde\nf', before: 'cde', after: 'f' },
    { chars: 'e\nfgdds', before: 'e', after: 'fgdds' },
  ])(
    'has all characters before ($before)the newline  and none after($after) it ',
    ({ chars, before, after }) => {
      const src: Source = getSource();

      const dest: Destination = getDestination();

      readMultipleChars(chars);
      readChar.mockReturnValue('\n');

      const sut = new Copier(src, dest);

      sut.copy();

      expect(writeChar).toBeCalledTimes(before.length);

      expect(copiedChars).toEqual(before.split(''));
      expect(copiedChars).not.toContainEqual(after.split(''));
    }
  );
});
