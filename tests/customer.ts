class Customer {
  constructor(
    public readonly name: string,
    public readonly contactNumber: string
  ) {}

  toString() {
    console.log(`${this.name},${this.contactNumber}`);
  }
}

export default Customer;
