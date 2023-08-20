import CsvFileWriter from './csv-file-writer';
import { customerToString, getFileWriter } from './csv-file-writer.helper';
import Customer from './customer';

describe('csv-file-writer', () => {
  //'given : no customer object'
  //'when : we try to write the line to file
  //`then : writeLine function is not called

  it('given : no customer object', () => {
    //arrange
    const fileWriter = getFileWriter();

    //act
    const sut = new CsvFileWriter(fileWriter);

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
    const customer = new Customer('Glen', '32');
    const fileName = 'myfile.pdf';

    //act
    const sut = new CsvFileWriter(fileWriter);
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
        new Customer('a', '123'),
        new Customer('b', '456'),
        new Customer('c', '789'),
      ],
      fileName: 'a.pdf',
    },
    {
      customers: [
        new Customer('d', '874'),
        new Customer('e', '764'),
        new Customer('f', '796'),
      ],
      fileName: 'b.pdf',
    },
  ])('given : multiple customers are present', ({ customers, fileName }) => {
    //arrange
    const fileWriter = getFileWriter();

    //act
    const sut = new CsvFileWriter(fileWriter);
    sut.writeCustomers(fileName, customers);

    //assert
    expect(fileWriter.writeLine).toBeCalledTimes(customers.length);

    expect(fileWriter.getLines()).toStrictEqual(
      customers.map((c) => customerToString(c))
    );

    //has same number of items as the number of customers

    expect(fileWriter.getLines().length).toBe(customers.length);
  });
});
