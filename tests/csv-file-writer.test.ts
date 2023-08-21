import {
  assertCustomersHaveBeenWritten,
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
      customers: [
        getCustomer('a', '123'),
        getCustomer('b', '456'),
        getCustomer('c', '789'),
      ],
    },
    {
      customers: [
        getCustomer('d', '874'),
        getCustomer('e', '764'),
        getCustomer('f', '796'),
      ],
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
  it('batches customers in 12`s', () => {
    //arrange

    const customers = [
      getCustomer('0', '123'),
      getCustomer('1', '123'),

      getCustomer('2', '123'),

      getCustomer('3', '123'),
      getCustomer('4', '123'),

      getCustomer('5', '123'),

      getCustomer('6', '123'),
      getCustomer('7', '123'),

      getCustomer('8', '123'),

      getCustomer('9', '123'),
      getCustomer('10', '123'),

      getCustomer('11', '123'),

      getCustomer('12', '123'),
      getCustomer('13', '123'),

      getCustomer('14', '123'),

      getCustomer('15', '123'),
    ];

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

describe('functional testings', () => {
  it('will splice till drop', () => {
    const customers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const first_4 = customers.slice(0, 4);
    expect(first_4).toStrictEqual([1, 2, 3, 4]);
    const next_4 = customers.slice(4, 8);
    expect(next_4).toStrictEqual([5, 6, 7, 8]);

    const rest = customers.slice(8, 12);
    expect(rest).toStrictEqual([9]);
  });
});
