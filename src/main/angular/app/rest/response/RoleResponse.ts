export class RoleResponse {

  constructor(private _totalElements: number, private _roles: Array<string>){

  }

  get totalElements(): number {
    return this._totalElements;
  }

  set totalElements(value: number) {
    this._totalElements = value;
  }

  get roles(): Array<string> {
    return this._roles;
  }

  set roles(value: Array<string>) {
    this._roles = value;
  }
}
