import Customer from './customer';

export const customerToString = (customer: Customer) => {
  return `${customer.name},${customer.contactNumber}`;
};

export const getFileSystem = () => {
  let fileNames: string[];
  let lines: string[];
  return {
    writeLine: jest.fn((fileName: string, line: string) => {
      fileNames.push(fileName);
      lines.push(line);
    }),
    getFileNames: (): string[] => {
      return fileNames;
    },

    getLines: (): string[] => {
      return lines;
    },
  };
};
