import CsvFileWriter from './csv-file-writer';
import Customer from './customer';
import FileWriter from './file-writer';

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

export const getCustomer = (name: string, contactNumber: string): Customer => {
  return new Customer(name, contactNumber);
};

export const getCsvFileWriter = (fileWriter: FileWriter): CsvFileWriter => {
  return new CsvFileWriter(fileWriter);
};
