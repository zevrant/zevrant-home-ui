
export class LoginResponse {

  private _accessToken: string;
  private _expiresIn: number;


  constructor(accessToken: string, expiresIn: number) {
    this._accessToken = accessToken;
    this._expiresIn = expiresIn;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }

  set expiresIn(value: number) {
    this._expiresIn = value;
  }
}
