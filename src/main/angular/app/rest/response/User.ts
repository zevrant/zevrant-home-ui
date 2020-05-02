
export class User {

  constructor(private _username: string, private _emailAddress: string, private _roles: Array<string>) {
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(value: string) {
    this._emailAddress = value;
  }

  get roles(): Array<string> {
    return this._roles;
  }

  set roles(value: Array<string>) {
    this._roles = value;
  }
}
