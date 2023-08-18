class Customer {
  constructor(private name: string, private contactNumber: string) {}

  toString() {
    console.log(`${this.name},${this.contactNumber}`);
  }
}

export default Customer;
