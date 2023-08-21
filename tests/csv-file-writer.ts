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
    let fileIndex = 0;
    for (let i = 0; i < customers.length; i += batchSize) {
      const customersToWrite = customers.slice(i, i + batchSize);

      const [name, ext] = name_ext(fileName);

      const indexed_fileName = name + fileIndex++ + ext;

      this.writeCustomers(indexed_fileName, customersToWrite);
    }
  }
}

export default CsvFileWriter;

const name_ext = (file: string) => {
  const name = file.slice(0, file.lastIndexOf('.'));
  const ext = file.slice(file.lastIndexOf('.'));

  return [name, ext];
};
