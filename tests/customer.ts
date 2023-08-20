class Customer {
  constructor(private _name: string, private _contactNumber: string) {}

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get contactNumber(): string {
    return this._contactNumber;
  }

  public set contactNumber(value: string) {
    this._contactNumber = value;
  }

  toString() {
    console.log(`${this.name},${this.contactNumber}`);
  }
}

export default Customer;
