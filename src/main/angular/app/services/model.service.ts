import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ModelResponse} from "../rest/response/ModelResponse";
import {LocalStorageService} from "angular-web-storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpService, private httpClient: HttpClient, private storage: LocalStorageService) {

  }

  uploadModel(fileContents: any, fileName: string, coverPhoto: any, appliedTags: string[]): Promise<String> {
    let formData: FormData = new FormData();
    formData.append("file", fileContents);
    formData.append("coverPhoto", coverPhoto);
    let tags: string = "";
    for (let element of appliedTags) {
      tags += element.concat(",");
    }
    tags = tags.substr(tags.length - 2);
    let headers = new HttpHeaders()
        .append("tags", tags)
        .append("fileName", fileName);
    return this.http.post(Constants.modelBaseUrl + "models", headers, formData);
  }

  searchModel(fileName: string, tags: Array<string>, modelSearchField: string, ascending: boolean, page: number, pageSize: number): Promise<ModelResponse> {
    let headers = new HttpHeaders()
      .set("tags", tags)
      .set("modelSearchField", modelSearchField)
      .set("ascending", JSON.stringify(ascending));
    return this.http.get(Constants.modelBaseUrl + `models/${fileName}/${page}/${pageSize}`, headers);
  }

  async downloadModel(fileName: string): Promise<any> {
    let headers = new HttpHeaders().set("Authorization", "bearer " + this.storage.get(Constants.oauthTokenName));
    return this.httpClient.head(Constants.modelBaseUrl + `models/${fileName}`,{headers: headers}).toPromise();
  }
}
