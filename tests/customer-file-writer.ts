import Customer from './customer';
import FileWriter from './file-writer';

export class BatchedCustomerFileWriter implements ICustomerFileWriter {
  constructor(
    private readonly customerFileWriter: ICustomerFileWriter,
    private readonly batchSize: number
  ) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    let fileIndex = 0;

    for (let i = 0; i < customers.length; i += this.batchSize) {
      const customersToWrite = customers.slice(i, i + this.batchSize);

      const [name, ext] = this.name_ext(fileName);

      const indexed_fileName = name + fileIndex + ext;

      ++fileIndex;

      this.customerFileWriter.writeCustomers(
        indexed_fileName,
        customersToWrite
      );
    }
  }

  private name_ext = (file: string): [name: string, extension: string] => {
    const extn_index = file.lastIndexOf('.');

    // in case the file has no extension
    if (extn_index === -1) {
      return [file, ''];
    }

    const name = file.slice(0, extn_index);
    const ext = file.slice(extn_index);

    return [name, ext];
  };
}

export interface ICustomerFileWriter {
  writeCustomers(fineName: string, customers: Customer[]): void;
}
export class CustomerFileWriter implements ICustomerFileWriter {
  constructor(private readonly fileWriter: FileWriter) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    customers.forEach((customer) => {
      this.fileWriter.writeLine(fileName, this.customerToString(customer));
    });
  }

  private customerToString = (customer: Customer) => {
    return `${customer.name},${customer.contactNumber}`;
  };
}

export class UniqueCustomerFileWriter implements ICustomerFileWriter {
  constructor(private readonly customerFileWriter: ICustomerFileWriter) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    const uniqueNames: Set<string> = new Set();
    const uniqueCustomers: Customer[] = [];
    customers.forEach((c) => {
      if (!uniqueNames.has(c.name)) {
        uniqueNames.add(c.name);
        uniqueCustomers.push(c);
      }
    });

    console.log('unique customers', uniqueCustomers);
    this.customerFileWriter.writeCustomers(fileName, uniqueCustomers);
  }
}
