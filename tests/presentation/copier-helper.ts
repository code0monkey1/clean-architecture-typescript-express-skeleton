export const chars: string[] = [];

export const readChar = jest.fn();

export const writeChar = jest.fn((c: string) => {
  chars.push(c);
});

export const getSource = () => {
  return {
    readChar,
  };
};

export const getDestination = () => {
  return {
    writeChar,
  };
};
