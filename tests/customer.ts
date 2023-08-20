class Customer {
  constructor(
    private readonly name: string,
    private readonly contactNumber: string
  ) {}

  public getName() {
    this.name;
  }

  public setName(name: string) {
    this.name = name;
  }
  toString() {
    console.log(`${this.name},${this.contactNumber}`);
  }
}

export default Customer;
