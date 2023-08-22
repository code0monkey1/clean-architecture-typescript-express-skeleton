import { CustomerFileWriter } from './customer-file-writer';

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

export const getCustomerFileWriter = (
  fileWriter: FileWriter
): CustomerFileWriter => {
  return new CustomerFileWriter(fileWriter);
};

export const assertCustomerHasBeenWritten = (
  fileWriter: FileWriter,
  fileName: string,
  customer: Customer
) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(fileWriter.writeLine).toBeCalledWith(
    fileName,
    customerToString(customer)
  );
};

export const assertCustomersHaveBeenWritten = (
  fileWriter: FileWriter,
  fileName: string,
  customers: Customer[]
) => {
  customers.forEach((customer) => {
    assertCustomerHasBeenWritten(fileWriter, fileName, customer);
  });
};

export const createCustomers = (count: number) => {
  const customers: Customer[] = [];
  for (let i = 1; i <= count; i++) {
    customers.push(new Customer(i + '', i + ''));
  }

  return customers;
};
