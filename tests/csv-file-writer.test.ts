import {
  assertCustomersHaveBeenWritten,
  createCustomers,
  customerToString,
  getCsvFileWriter,
  getCustomer,
  getFileWriter,
} from './csv-file-writer.helper';

describe('csv-file-writer', () => {
  //'given : no customer object'
  //'when : we try to write the line to file
  //`then : writeLine function is not called

  it('given : no customer object', () => {
    //arrange
    const fileWriter = getFileWriter();

    //act
    const sut = getCsvFileWriter(fileWriter);

    sut.writeCustomers('myfile.pdf', []);

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
    const sut = getCsvFileWriter(fileWriter);
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
    const sut = getCsvFileWriter(fileWriter);

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

    const sut = getCsvFileWriter(fileWriter);

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

    const sut = getCsvFileWriter(fileWriter);

    sut.writeBatchedCustomers(fileName, customers, 12);

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
});
