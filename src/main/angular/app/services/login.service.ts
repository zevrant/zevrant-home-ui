import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Constants} from "../constants/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginEmitter: EventEmitter<string> = new EventEmitter<string>()

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient) {
  }

  getLoginEmitter(): EventEmitter<String> {
    return this.loginEmitter;
  }

  async login(username: string, password: string) {

    let headers = new HttpHeaders().set("client_id", username);
    headers = headers.set("client_secret", password);

    this.http.post(Constants.oauthBaseUrl + "token", null, {headers: headers}).toPromise().then((data) => {
      let response: any = JSON.parse(JSON.stringify(data));
      this.storage.set(Constants.oauthTokenName, response.accessToken);
      console.log("here");
      this.loginEmitter.emit("loggedIn");
    });

  }
}
