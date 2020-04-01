import {Inject, Injectable} from "@angular/core";
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../constants/Constants";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  get(url: string, headers: HttpHeaders): Promise<any> {
    if (!headers) {
      headers = new HttpHeaders()
    }
    headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
    return this.http.get(url, {headers: headers}).toPromise();
  }

  post(url: string, headers: HttpHeaders, body: any): Promise<any> {
    if (!headers) {
      headers = new HttpHeaders()
    }
    headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
    return this.http.post(url, body, {headers: headers}).toPromise();
  }

  put(url: string, headers: HttpHeaders, body: any): Promise<any> {
    if (!headers) {
      headers = new HttpHeaders()
    }
    headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
    return this.http.put(url, body, {headers: headers}).toPromise();
  }

  delete(url: string, headers: HttpHeaders): Promise<any> {
    if (!headers) {
      headers = new HttpHeaders()
    }
    headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
    return this.http.delete(url, {headers: headers}).toPromise();
  }

}
