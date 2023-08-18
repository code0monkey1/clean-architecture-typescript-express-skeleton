import { customerToString } from './csv-file-writer.helper';
import Customer from './customer';
import FS from './file-system';

class CsvFileWriter {
  constructor(private readonly fileSystem: FS) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    customers.forEach((customer) => {
      this.fileSystem.writeLine(fileName, customerToString(customer));
    });
  }

  writeBatchedCustomers(
    fileName: string,
    customers: Customer[],
    batchSize: number
  ) {
    while (customers.length) {
      const customersToWrite = customers.splice(batchSize);

      this.writeCustomers(fileName, customersToWrite);
    }
  }
}

export default CsvFileWriter;
