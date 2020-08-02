export class Timezone {

  constructor(private _timezoneName: string, private _offset: number) {
  }

  get timezoneName(): string {
    return this._timezoneName;
  }

  set timezoneName(value: string) {
    this._timezoneName = value;
  }

  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }
}
