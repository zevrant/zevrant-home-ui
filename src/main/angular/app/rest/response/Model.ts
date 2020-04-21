
export class Model {

  constructor(private _fileName: string, private _coverPhoto: any, private _fileExtension: string, private _tags: Array<string>) {
  }

  get fileName(): string {
    return this._fileName;
  }

  set fileName(value: string) {
    this._fileName = value;
  }

  get coverPhoto(): any {
    return this._coverPhoto;
  }

  set coverPhoto(value: any) {
    this._coverPhoto = value;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }

  get fileExtension(): string {
    return this._fileExtension;
  }

  set fileExtension(value: string) {
    this._fileExtension = value;
  }
}
