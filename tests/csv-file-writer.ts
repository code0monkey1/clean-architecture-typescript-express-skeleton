import Customer from './customer';
import FileWriter from './file-writer';

class CsvFileWriter {
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

    for (let i = 0; i < customers.length; i += batchSize) {
      const customersToWrite = customers.slice(i, i + batchSize);

      const [name, ext] = this.name_ext(fileName);

      const indexed_fileName = name + fileIndex++ + ext;

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

export default CsvFileWriter;
