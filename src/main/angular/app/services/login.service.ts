import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Constants} from "../constants/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "angular-web-storage";
import {timeout} from "rxjs/operators";
import {LoginResponse} from "../rest/response/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginEmitter: EventEmitter<string> = new EventEmitter<string>();
  private _logoutEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor(private local: LocalStorageService, private http: HttpClient) {

  }

  getLoginEmitter(): EventEmitter<String> {
    return this.loginEmitter;
  }

  get logoutEmitter(): EventEmitter<string> {
    return this._logoutEmitter;
  }


  login(username: string, password: string): Promise<any> {

    let headers = new HttpHeaders().set("client_id", username);
    headers = headers.set("client_secret", password);

    return this.http.post(Constants.oauthBaseUrl + "token", null, {headers: headers}).toPromise().then((data) => {
      let response: LoginResponse = JSON.parse(JSON.stringify(data));
      this.local.set(Constants.oauthTokenName, response.accessToken);
      let date = new Date();
      date.setTime(date.getTime() + response.expiresIn * 1000)
      this.local.set(Constants.expiresInName, date.getTime());
      let local = this.local;
      let logoutEmitter = this.logoutEmitter;
      new Promise((res) => {
        setTimeout(function() {
          local.clear();
          logoutEmitter.emit("loggedOut");
        }, response.expiresIn * 1000);
      });
      this.loginEmitter.emit("loggedIn");
    });

  }



}
