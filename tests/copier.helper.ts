import { Source } from './character-copier';

/* The code is creating a mock function `mockCharReader` using `jest.fn()`. This mock function will be
used to simulate the behavior of a character reader object. */
export const getSource = (elements: string[]): Source => {
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

/* The code is defining a function named `getDestination` that returns an object with two properties:
`writeChar` and `getWrittenChars`. */
export const getDestination = () => {
  const copiedChars: string[] = [];

  return {
    /* The `writeChar` property is a function that is defined using `jest.fn()`. This creates a mock
   function that can be used to simulate the behavior of a `writeChar` function. */
    writeChar: jest.fn((c: string) => {
      copiedChars.push(c);
    }),
    /* The `getWrittenChars` property is a function that returns the `copiedChars` array. This function can
be used to retrieve the characters that have been written to the destination. */
    getWrittenChars: () => copiedChars,
  };
};

/* The `isIntersection` function takes in two arrays `a` and `b` as parameters. It checks
if there is any element in array `a` that is also present in array `b`. It does this by
using the `some` method on array `a`, which returns `true` if at least one element
satisfies the provided condition. The condition being checked is whether `b` includes
the current element `e` from array `a`. If there is at least one element that satisfies
this condition, the function returns `true`, indicating that there is an intersection
between the two arrays. Otherwise, it returns `false`, indicating that there is no
intersection. */
export const isIntersection = (a: string[], b: string[]) =>
  a.some((e) => b.includes(e));
