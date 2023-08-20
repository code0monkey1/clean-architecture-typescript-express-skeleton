import { customerToString } from './csv-file-writer.helper';
import Customer from './customer';
import FileWriter from './file-writer';

class CsvFileWriter {
  constructor(private readonly fileWriter: FileWriter) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    customers.forEach((customer) => {
      this.fileWriter.writeLine(fileName, customerToString(customer));
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
