import Customer from './customer';
import FileWriter from './file-writer';
export class BatchedCustomerFileWriter {
  constructor(
    private readonly customerFileWriter: UniqueCustomerFileWriter,
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


interface ICustomerFileWriter{
  

  writeCustomers(fineName:string:customers:Customers[])
}
export class CustomerFileWriter {
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

export class UniqueCustomerFileWriter {
  constructor(private readonly customerFileWriter: CustomerFileWriter) {}

  writeCustomers(fileName: string, customers: Customer[]) {
    const uniqueNames: Set<string> = new Set();
    const uniqueCustomers: Customer[] = [];
    customers.forEach((c) => {
      if (!uniqueNames.has(c.name)) {
        uniqueNames.add(this.customerToString(c));
        uniqueCustomers.push(c);
      }
    });

    this.customerFileWriter.writeCustomers(fileName, uniqueCustomers);
  }

  private customerToString = (customer: Customer) => {
    return `${customer.name},${customer.contactNumber}`;
  };
}
