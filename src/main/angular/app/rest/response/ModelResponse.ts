import {Model} from "./Model";

export class ModelResponse {

  private _models: Array<Model>;

  constructor(models: Array<Model>) {
    this._models = models;
  }

  get models(): Array<Model> {
    return this._models;
  }

  set models(value: Array<Model>) {
    this._models = value;
  }
}
