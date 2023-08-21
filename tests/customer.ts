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

  public toString() {
    return `${this._name},${this._contactNumber}`;
  }
}

export default Customer;
