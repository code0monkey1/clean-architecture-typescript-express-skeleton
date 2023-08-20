import Customer from './customer';

export const customerToString = (customer: Customer) => {
  return `${customer.name},${customer.contactNumber}`;
};

export const getFileWriter = () => {
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
