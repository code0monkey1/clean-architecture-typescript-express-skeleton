import Customer from './customer';
import FileWriter from './file-writer';
export class BatchedCustomerFileWriter {
  constructor(private readonly customerFileWriter: CustomerFileWriter) {}

  writeBatchedCustomers(
    fileName: string,
    customers: Customer[],
    batchSize: number
  ) {
    let fileIndex = 0;

    while (customers.length) {
      const customersToWrite = customers.splice(0, batchSize);

      const [name, ext] = this.name_ext(fileName);

      const indexed_fileName = name + fileIndex + ext;

      fileIndex++;

      this.customerFileWriter.writeCustomers(
        indexed_fileName,
        customersToWrite
      );
    }
  }

  private name_ext = (file: string) => {
    const name = file.slice(0, file.lastIndexOf('.'));
    const ext = file.slice(file.lastIndexOf('.'));

    return [name, ext];
  };
}
export class CustomerFileWriter {
  constructor(private readonly fileWriter: FileWriter) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    customers.forEach((customer) => {
      this.fileWriter.writeLine(fileName, this.customerToString(customer));
    });
  }

  writeBatchedCustomers(
    fileName: string,
    customers: Customer[],
    batchSize: number
  ) {
    let fileIndex = 0;

    while (customers.length) {
      const customersToWrite = customers.splice(0, batchSize);

      const [name, ext] = this.name_ext(fileName);

      const indexed_fileName = name + fileIndex + ext;

      fileIndex++;

      this.writeCustomers(indexed_fileName, customersToWrite);
    }
  }

  private name_ext = (file: string) => {
    const name = file.slice(0, file.lastIndexOf('.'));
    const ext = file.slice(file.lastIndexOf('.'));

    return [name, ext];
  };

  private customerToString = (customer: Customer) => {
    return `${customer.name},${customer.contactNumber}`;
  };
}
