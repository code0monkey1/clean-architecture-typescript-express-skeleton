import { BatchedCustomerFileWriter } from './customer-file-writer';
import {
  assertCustomersHaveBeenWritten,
  createCustomers,
  customerToString,
  getCustomer,
  getCustomerFileWriter,
  getFileWriter,
} from './customer-file-writer.helper';

describe('customer file writer', () => {
  //'given : no customer object'
  //'when : we try to write the line to file
  //`then : writeLine function is not called

  it('no customer object will result in writeLine not being called', () => {
    //arrange
    const fileWriter = getFileWriter();
    const fileName = 'myfile.pdf';

    //act
    const sut = getCustomerFileWriter(fileWriter);

    sut.writeCustomers(fileName, []);

    //assert
    expect(fileWriter.writeLine).toBeCalledTimes(0);
  });

  //given : single customer object is present
  //when : we try to write the object info to file
  // then : only single object with the given info gets written
  it('given : single customer object is present', () => {
    //arrange
    const fileWriter = getFileWriter();
    const customer = getCustomer('Glen', '32');
    const fileName = 'myfile.pdf';

    //act
    const sut = getCustomerFileWriter(fileWriter);
    sut.writeCustomers(fileName, [customer]);

    //assert
    expect(fileWriter.writeLine).toBeCalledTimes(1);
    expect(fileWriter.writeLine).toHaveBeenCalledWith(
      fileName,
      customerToString(customer)
    );
    expect(fileWriter.getLines()).toStrictEqual([customerToString(customer)]);
    // expect(fs.getFileNames().length).toBe(1);
    // expect(fs.getLines().length).toBe(1);
  });

  //given : multiple customer objects are present
  //when : we try to write the objects info to file
  // then :the exact number and the exact order of customers are written to file

  it.each([
    {
      customers: createCustomers(3),
    },
    {
      customers: createCustomers(12),
    },
  ])('given : multiple customers are present', ({ customers }) => {
    //arrange
    const fileWriter = getFileWriter();
    const fileName = 'narnia.ts';

    //act
    const sut = getCustomerFileWriter(fileWriter);

    sut.writeCustomers(fileName, customers);

    //assert
    assertCustomersHaveBeenWritten(fileWriter, fileName, customers);
    //has same number of items as the number of customers

    expect(fileWriter.getLines().length).toBe(customers.length);
  });
});

describe('batched customers', () => {
  it('creates only 1 file, when customers are 12 ', () => {
    const customers = createCustomers(12);
    const fileName = 'myfile.csv';

    const fileWriter = getFileWriter();

    const customerFileWriter = getCustomerFileWriter(fileWriter);

    const sut = new BatchedCustomerFileWriter(customerFileWriter);

    sut.writeBatchedCustomers(fileName, customers, 12);

    expect(fileWriter.writeLine).toHaveBeenLastCalledWith(
      'myfile0.csv',
      getCustomer('12', '12').toString()
    );

    assertCustomersHaveBeenWritten(
      fileWriter,
      'myfile0.csv',
      customers.slice(0, 12)
    );
  });
  it('creates only 2 files , when the customers are more than 12 , but less than 24', () => {
    //arrange

    const customers = createCustomers(15);

    const fileName = 'myfile.csv';

    const fileWriter = getFileWriter();

    const sut = getCustomerFileWriter(fileWriter);

    const bfr = new BatchedCustomerFileWriter(sut);

    bfr.writeBatchedCustomers(fileName, customers, 12);

    assertCustomersHaveBeenWritten(
      fileWriter,
      'myfile0.csv',
      customers.slice(0, 12)
    );
    assertCustomersHaveBeenWritten(
      fileWriter,
      'myfile1.csv',
      customers.slice(12)
    );
  });

  it('given file with no extension, the numbering will still be chronological', () => {
    //arrange
    const fileName = 'file';
    const fileWriter = getFileWriter();
    const customers = createCustomers(10);

    //act
    const customerFileWriter = getCustomerFileWriter(fileWriter);

    //assert

    const sut = new BatchedCustomerFileWriter(customerFileWriter);
    sut.writeBatchedCustomers(fileName, customers, 5);

    assertCustomersHaveBeenWritten(fileWriter, 'file0', customers.slice(0, 5));
    assertCustomersHaveBeenWritten(fileWriter, 'file1', customers.slice(5));
  });
});

describe('Batch processing 15,000 files at once', () => {
  it.only('produces 2 files when the customers are 30,000', () => {
    //arrange
    const fileName = 'file';
    const fileWriter = getFileWriter();

    console.time('createCustomers');

    const customers = createCustomers(30000);
    console.timeEnd('createCustomers');

    //act
    const customerFileWriter = getCustomerFileWriter(fileWriter);

    //assert
    console.time('write customers');
    const sut = new BatchedCustomerFileWriter(customerFileWriter);
    sut.writeBatchedCustomers(fileName, customers, 50);

    console.timeEnd('write customers');
    let fileIndex = 0;

    for (let i = 0; i < customers.length; i += 50) {
      assertCustomersHaveBeenWritten(
        fileWriter,
        'file' + fileIndex,
        customers.slice(i, i + 50)
      );
      fileIndex++;
    }
  });
});
