import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../../constants/Constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', "client_credentials");
    body.set('scope', "DEFAULT");
    body.set('client_id', username);
    body.set('client_secret', password)

    let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post("zevrant-oauth2-service/oauth/token", body.toString(), { headers: headers });
  }
}
