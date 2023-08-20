import Customer from './customer';

export const customerToString = (customer: Customer) => {
  return `${customer.name},${customer.contactNumber}`;
};

export const getFileSystem = () => {
  const lines: string[] = [];

  return {
    writeLine: jest.fn((_fileName: string, line: string) => {
      lines.push(line);
    }),

    getLines: (): string[] => {
      return lines;
    },
  };
};
