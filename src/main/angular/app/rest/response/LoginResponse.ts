
export class LoginResponse {

  private _access_token: string;
  private _expires_in: number;


  constructor(access_Token: string, expiresIn: number) {
    this._access_token = access_Token;
    this._expires_in = expiresIn;
  }

  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get expires_in(): number {
    return this._expires_in;
  }

  set expires_in(value: number) {
    this._expires_in = value;
  }
}
