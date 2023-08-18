import { Source } from './character-copier';

/* The `export const getSource` function is exporting a function named `getSource` that takes an array
of strings as a parameter. This function creates a mock character reader object that can be used to
read characters from a source. The `elements` array is used to define the characters that will be
returned by the mock character reader when `readChar` is called. The function returns an object with
a `readChar` method that can be used to read characters from the source. */
export const getSource = (elements: string[]): Source => {
  /* The code is creating a mock function `mockCharReader` using `jest.fn()`. This mock function will be
used to simulate the behavior of a character reader object. */
  const mockCharReader = jest.fn();

  elements.forEach((e) => mockCharReader.mockReturnValueOnce(e));

  /* The line `mockCharReader.mockReturnValue('\n');` is setting the return value of the `mockCharReader`
function to be the newline character (`'\n'`). This means that when `readChar` is called on the mock
character reader object, it will return `'\n'` as the next character from the source. */
  mockCharReader.mockReturnValue('\n');
  /* The `return` statement is creating an object with a property `readChar` that is assigned the value
  of the `mockCharReader` function. This object is then returned by the `getSource` function. */
  return {
    readChar: mockCharReader,
  };
};

export const getDestination = () => {
  const copiedChars: string[] = [];

  return {
    writeChar: jest.fn((c: string) => {
      copiedChars.push(c);
    }),
    getWrittenChars: () => copiedChars,
  };
};

export const isIntersection = (a: string[], b: string[]) =>
  a.some((e) => b.includes(e));
