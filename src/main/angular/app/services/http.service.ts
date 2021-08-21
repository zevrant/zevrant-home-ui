import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../constants/Constants";
import {LocalStorageService} from "angular-web-storage";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient, private storage: LocalStorageService) {
    }

    async get(url: string, headers: HttpHeaders): Promise<any> {
        if (!headers) {
            headers = new HttpHeaders()
        }
        headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
        return this.http.get(url, {headers: headers}).toPromise();
    }

    async getBlob(url: string, headers: HttpHeaders): Promise<ArrayBuffer> {
        if (!headers) {
            headers = new HttpHeaders()
        }
        headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
        return this.http.get(url, {headers: headers, responseType: "arraybuffer"}).toPromise();
    }

    async post(url: string, headers: HttpHeaders, body: any): Promise<any> {
        if (!headers) {
            headers = new HttpHeaders()
        }
        headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
        return this.http.post(url, body, {headers: headers}).toPromise();
    }

    async put(url: string, headers: HttpHeaders, body: any): Promise<any> {
        if (!headers) {
            headers = new HttpHeaders()
        }
        headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
        return this.http.put(url, body, {headers: headers}).toPromise();
    }

    async delete(url: string, headers: HttpHeaders): Promise<any> {
        if (!headers) {
            headers = new HttpHeaders()
        }
        headers = headers.set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
        return this.http.delete(url, {headers: headers}).toPromise();
    }

}
