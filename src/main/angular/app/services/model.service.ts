import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {HttpHeaders} from "@angular/common/http";
import {ModelResponse} from "../rest/response/ModelResponse";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpService) {

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

  downloadModel(fileName: string): Promise<any> {
    return this.http.get(Constants.modelBaseUrl + `models/${fileName}`, null);
  }
}
