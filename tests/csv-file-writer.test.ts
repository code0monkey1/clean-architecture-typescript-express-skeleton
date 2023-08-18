import CsvFileWriter from './csv-file-writer';
import { getFileSystem } from './csv-file-writer.helper';
import Customer from './customer';

describe('csv-file-writer', () => {
  //'given : no customer object'
  //'when : we try to write the line to file
  //`then : writeLine function is not called

  it('given : no customer object', () => {
    //arrange
    const fs = getFileSystem();

    //act
    const sut = new CsvFileWriter(fs);

    sut.writeCustomers('myfile.pdf', []);

    //assert
    expect(fs.writeLine).toBeCalledTimes(0);
  });

  //given : single customer object is present
  //when : we try to write the object info to file
  // then : only single object with the given info gets written
  it('given : single customer object is present', () => {
    //arrange
    const fs = getFileSystem();
    const customer = new Customer('Glen', '32');
    //act
    const sut = new CsvFileWriter(fs);

    sut.writeCustomers('myfile.pdf', [customer]);

    //assert
    expect(fs.writeLine).toBeCalledTimes(1);
  });

  //given : multiple customer objects are present
  //when : we try to write the objects info to file
  // then :the exact number and the exact order of customers are written to file

  it.todo('given : multiple customers are present');
});
