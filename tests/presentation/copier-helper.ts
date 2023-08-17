export const copiedChars: string[] = [];

export const readChar = jest.fn();

export const getSource = () => {
  return {
    readChar,
  };
};
export const writeChar = jest.fn((c: string) => {
  copiedChars.push(c);
});

export const getDestination = () => {
  return {
    writeChar,
  };
};

export const readMultipleChars = (str: string) => {
  str.split('').forEach((c: string) => {
    readChar.mockReturnValueOnce(c);
  });
};

export const clearCopiedCharsArray = () => {
  while (copiedChars.length) copiedChars.pop();
};
