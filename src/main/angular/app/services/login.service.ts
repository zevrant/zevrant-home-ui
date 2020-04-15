import {EventEmitter, Injectable} from '@angular/core';
import {Constants} from "../constants/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginEmitter: EventEmitter<string> = new EventEmitter<string>()

  constructor(private local: LocalStorageService, private http: HttpClient) {
  }

  getLoginEmitter(): EventEmitter<String> {
    return this.loginEmitter;
  }

  login(username: string, password: string): Promise<any> {

    let headers = new HttpHeaders().set("client_id", username);
    headers = headers.set("client_secret", password);

    return this.http.post(Constants.oauthBaseUrl + "token", null, {headers: headers}).toPromise().then((data) => {
      let response: any = JSON.parse(JSON.stringify(data));
      this.local.set(Constants.oauthTokenName, response.accessToken);
      this.loginEmitter.emit("loggedIn");
    });

  }
}
