
export class Model {

  constructor(private _fileName: string, private _coverPhoto: ArrayBuffer, private _tags: Array<string>) {
  }


  get fileName(): string {
    return this._fileName;
  }

  set fileName(value: string) {
    this._fileName = value;
  }

  get coverPhoto(): ArrayBuffer {
    return this._coverPhoto;
  }

  set coverPhoto(value: ArrayBuffer) {
    this._coverPhoto = value;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }
}
