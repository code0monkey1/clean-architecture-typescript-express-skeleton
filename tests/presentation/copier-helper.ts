export const getSource = (elements: string[]) => {
  const mockCharReader = jest.fn();

  elements.forEach((e) => mockCharReader.mockReturnValueOnce(e));

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
