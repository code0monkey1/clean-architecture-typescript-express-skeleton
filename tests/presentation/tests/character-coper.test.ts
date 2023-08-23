import { Copier, Source } from '../../character-copier';
import { getDestination, getSource, isIntersection } from '../../copier.helper';

describe.skip('character-copier', () => {
  //[ ] No characters , ending in newline
  //[ ] Once character , ending in newline
  //[ ] Two characters , ending in newline
  //[ ] Many characters, ending in newline
  //[ ] Order of characters copied should be maintained
  //[ ] Characters after newline should not be written

  //[+] No characters , ending in newline
  describe('when no character is read', () => {
    // Given no characters, ending in newline
    // When the copier is run
    // Then no characters should be written to the destination
    it('does not call the destination method if there is no character in the source', () => {
      // Given no characters, ending in newline
      const src: Source = getSource([]);

      const dest = getDestination();

      const sut = new Copier(src, dest);

      //when
      sut.copy();

      //then
      expect(dest.writeChar).toBeCalledTimes(0);
    });
  });

  //[+] Once character , ending in newline

  describe('when 1 character is read', () => {
    it.each([{ char: 'a' }, { char: 'b' }, { char: 'c' }, { char: 'd' }])(
      'reads first char from source',
      ({ char }) => {
        const src: Source = getSource([char]);

        const dest = getDestination();

        const sut = new Copier(src, dest);

        sut.copy();

        expect(dest.writeChar).toHaveBeenCalledWith(char);
      }
    );
  });

  //[+] Two characters , ending in newline
  describe('Two characters , ending in newline', () => {
    it.each([
      { chars: ['a', 'b'] },
      { chars: ['c', 'd'] },
      { chars: ['e', 'f'] },
    ])('reads exactly 2 times before encountering a newline', ({ chars }) => {
      const src: Source = getSource(chars);

      const dest = getDestination();

      const sut = new Copier(src, dest);

      sut.copy();

      expect(dest.writeChar).toHaveBeenCalledWith(chars[0]);
      expect(dest.writeChar).toHaveBeenCalledWith(chars[1]);
      expect(dest.writeChar).toBeCalledTimes(2);
    });
  });

  //[+] Many characters, ending in newline
  describe('Many characters, ending in newline', () => {
    it.each([
      { chars: ['a', 'b', 'c', 'd', 'g', 'c'] },
      { chars: ['c', 'd', 'e', 'f', 'd', 'f', 'd'] },
      { chars: ['e', 'f', 'g', 'd', 'd', ''] },
    ])(
      'reads exactly $chars.length times before encountering a newline',
      ({ chars }) => {
        const src: Source = getSource(chars);

        const dest = getDestination();

        const sut = new Copier(src, dest);

        sut.copy();

        expect(dest.writeChar).toBeCalledTimes(chars.length);

        //multiple characters written (order does not matter)
        chars.forEach((c) => expect(dest.writeChar).toHaveBeenCalledWith(c));

        // confirm last called character
        expect(dest.writeChar).toHaveBeenLastCalledWith(
          chars[chars.length - 1]
        );
      }
    );
  });

  //[+] Order of characters
  describe('Order of characters', () => {
    it.each([
      { chars: ['a', 'b', 'c', 'd', 'g', 'c'] },
      { chars: ['c', 'd', 'e', 'f', 'd', 'f', 'd'] },
      { chars: ['e', 'f', 'g', 'd', 'd', ''] },
    ])('has all characters copied in the same order', ({ chars }) => {
      const src: Source = getSource(chars);

      const dest = getDestination();

      const sut = new Copier(src, dest);

      sut.copy();

      expect(dest.writeChar).toBeCalledTimes(chars.length);

      expect(dest.getWrittenChars()).toEqual(chars);
    });
  });

  //[+] Characters after newline should not be written
  describe('Characters after newline should not be written', () => {
    it.each([
      {
        chars: [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `\n`, `a`, `b`],
        before: [`1`, `2`, `3`, `4`, `5`, `6`, `7`],
        after: [`a`, `b`],
      },
      {
        chars: [`1`, `2`, `7`, `5`, `4`, `\n`, `c`, `d`],
        before: [`1`, `2`, `7`, `5`, `4`],
        after: [`c`, `d`],
      },
    ])(
      'has all characters before : $before , the newline  and none after : $after',
      ({ chars, before, after }) => {
        const src: Source = getSource(chars);

        const dest = getDestination();

        const sut = new Copier(src, dest);

        sut.copy();

        expect(dest.getWrittenChars()).toStrictEqual(before);
        expect(!isIntersection(after, dest.getWrittenChars())).toBe(true);
      }
    );
  });
});
