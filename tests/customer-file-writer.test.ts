/* eslint-disable @typescript-eslint/unbound-method */
import Customer from './customer';
import {
  assertCustomersHaveBeenWritten,
  batchedCustomersHaveBeenWritten,
  createCustomers,
  customerToString,
  getBatchedCustomerWriter,
  getCustomer,
  getCustomerFileWriter,
  getFileWriter,
  getUniqueCustomerFileWriter,
} from './customer-file-writer.helper';

describe('customer file writer', () => {
  //'given : no customer object'
  //'when : we try to write the line to file
  //`then : writeLine function is not called

  it('will not write to file , when there is no customer', () => {
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

  it('single customer object is present', () => {
    //arrange
    const fileWriter = getFileWriter();
    const customer = getCustomer('Glen', '32');
    const fileName = 'myfile.pdf';

    //act
    const sut = getCustomerFileWriter(fileWriter);
    sut.writeCustomers(fileName, [customer]);

    //assert

    expect(fileWriter.writeLine).toBeCalledTimes(1);
    expect(fileWriter.writeLine).toHaveBeenLastCalledWith(
      fileName,
      customerToString(customer)
    );
  });

  //given : multiple customer objects are present
  //when : we try to write the objects info to file
  // then :the exact number and the exact order of customers are written to file

  it.only.each([
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

    expect(fileWriter.writeLine).toHaveBeenCalledTimes(customers.length);
  });
});

describe('batched customers', () => {
  it('creates only 1 file, when customers are 12 ', () => {
    const customers = createCustomers(12);
    const fileName = 'myfile.csv';

    const fileWriter = getFileWriter();

    const cfw = getCustomerFileWriter(fileWriter);

    const sut = getBatchedCustomerWriter(cfw, 12);

    sut.writeCustomers(fileName, customers);

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

    const cfw = getCustomerFileWriter(fileWriter);

    const bfr = getBatchedCustomerWriter(cfw, 12);

    bfr.writeCustomers(fileName, customers);

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
    const cfw = getCustomerFileWriter(fileWriter);

    //assert

    const sut = getBatchedCustomerWriter(cfw, 5);
    sut.writeCustomers(fileName, customers);

    assertCustomersHaveBeenWritten(fileWriter, 'file0', customers.slice(0, 5));
    assertCustomersHaveBeenWritten(fileWriter, 'file1', customers.slice(5));
  });
});

describe('Batch processing 15,000 files at once', () => {
  it('produces 2 files when the customers are 30,000', () => {
    //arrange
    const fileName = 'file';
    const fileWriter = getFileWriter();

    console.time('createCustomers');

    const customers = createCustomers(10);
    console.timeEnd('createCustomers');

    //act
    const cfw = getCustomerFileWriter(fileWriter);

    //assert
    console.time('write customers');
    const sut = getBatchedCustomerWriter(cfw, 1);

    sut.writeCustomers(fileName, customers);

    console.timeEnd('write customers');

    //assert

    console.time('assert customers written');
    batchedCustomersHaveBeenWritten(fileWriter, customers, 1);
    console.timeEnd('assert customers written');
  });
});

describe('Duplicate customers are removed', () => {
  describe('duplicates', () => {
    it('writes only 2 unique customers , when 5 customers are given', () => {
      //arrange
      const fileName = 'file';
      const fileWriter = getFileWriter();

      const customers: Customer[] = [
        ...createCustomers(3),
        ...createCustomers(2),
      ];

      //act

      const cfw = getCustomerFileWriter(fileWriter);

      const bcw = getBatchedCustomerWriter(cfw, 10);

      const sut = getUniqueCustomerFileWriter(bcw); // last  gets called first

      sut.writeCustomers(fileName, customers);

      //assert

      expect(fileWriter.writeLine).toBeCalledTimes(3);
    });
  });

  describe('no-duplicates', () => {
    it('writes  5 unique customers , when 5 customers are given', () => {
      //arrange
      const fileName = 'file';
      const fileWriter = getFileWriter();

      const customers: Customer[] = createCustomers(5);

      //act

      const cfw = getCustomerFileWriter(fileWriter);

      const bcw = getBatchedCustomerWriter(cfw, 10);

      const sut = getUniqueCustomerFileWriter(bcw); // last  gets called first

      sut.writeCustomers(fileName, customers);

      //assert

      expect(fileWriter.writeLine).toBeCalledTimes(5);
    });
  });
});
