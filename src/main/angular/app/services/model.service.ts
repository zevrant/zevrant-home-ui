import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Constants} from "../constants/Constants";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpService) {

  }

  uploadModel(fileContents: ArrayBuffer, fileName: string, coverPhoto: ArrayBuffer, appliedTags: string[]): Promise<String> {
    let formData: FormData = new FormData();
    formData.append("file", new Blob([new Uint8Array(fileContents, 0, fileContents.byteLength)]), 'file');
    formData.append("coverPhoto", new Blob([new Uint8Array(coverPhoto, 0, fileContents.byteLength)]), 'coverPhoto');
    let tags: string = "";
    for (let element of appliedTags) {
      tags += element.concat(",");
    }
    tags = tags.substr(tags.length - 2);
    let headers = new HttpHeaders()
        .append("tags", tags)
        .append("fileName", fileName);
    return this.http.post(Constants.modelBaseUrl + "model", headers, formData);
  }
}
