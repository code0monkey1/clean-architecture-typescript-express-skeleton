import Customer from './customer';

export const customerToString = (customer: Customer) => {
  return `${customer.name},${customer.contactNumber}`;
};

export const getFileSystem = () => {
  let fn: string = '';
  const lines: string[] = [];

  return {
    writeLine: jest.fn((fileName: string, line: string) => {
      if (!fn) fn = fileName;

      lines.push(line);
    }),
    getFileName: (): string => {
      return fn;
    },

    getLines: (): string[] => {
      return lines;
    },
  };
};
